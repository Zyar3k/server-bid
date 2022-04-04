require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const connectDB = require("./db/connect");
const PORT = process.env.PORT || 8888;
const mongoUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.6tpkm.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;
const authRouter = require("./routes/auth");
const booksRouter = require("./routes/books");

// error handling middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);

// checkout
app.use("/", booksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(mongoUri);
    app.listen(PORT, () =>
      console.log(`Server started on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
