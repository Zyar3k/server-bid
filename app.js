require("dotenv").config();
require("express-async-errors");

const express = require("express");
const app = express();
const PORT = process.env.PORT || 5000;

const authRouter = require("./routes/auth");
const booksRouter = require("./routes/books");

// error handling middleware
const notFoundMiddleware = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");
const res = require("express/lib/response");

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/books", booksRouter);

// checkout
app.use("/", booksRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    app.listen(PORT, () =>
      console.log(`Server started on port http://localhost:${PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
};

start();
