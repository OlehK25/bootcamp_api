const path = require("path");
const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const fileupload = require("express-fileupload");
const cookieParser = require("cookie-parser");
const mongoSanitize = require("express-mongo-sanitize");
const helmet = require("helmet");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");
const hpp = require("hpp");
const cors = require("cors");
const errorHandler = require("./middleware/error");

const mongoose = require("mongoose");

// Load env vars
dotenv.config({ path: "./config/config.env" });

// Connect to DB
mongoose
  // .connect(process.env.DATABASE_LOCAL, {
  .connect(process.env.DATABASE_URL)
  .then(() => console.log(`MongoDB connected: ${mongoose.connection.host}`));

// Route filer
const bootcamps = require("./router/bootcampsRouter");
const courses = require("./router/coursesRouter");
const auth = require("./router/authRouter");
const users = require("./router/usersRouter");
const reviews = require("./router/reviewsRouter");
const http = require("http");

const app = express();

// Body parser
app.use(express.json());

// Cookie parser
app.use(cookieParser());

// Dev logging middleware
if (process.env.NODE_ENV === "development") app.use(morgan("dev"));

// File uploading
app.use(fileupload());

// Sanitize data
app.use(mongoSanitize());

// Set security headers
app.use(helmet());

// prevent XSS atack
app.use(xss());

// Rate limiting (1000 request for 10min)
const limiter = rateLimit({
  windowMs: 10 * 60 * 1000, // 10 min
  max: 1000,
});

app.use(limiter);

// Prevent http param pollution
app.use(hpp());

// Enable CORS
app.use(cors());

// Set static folder
app.use(express.static(path.join(__dirname, "public")));

// Mount routers
app.use("/api/v1/bootcamps", bootcamps);
app.use("/api/v1/courses", courses);
app.use("/api/v1/auth", auth);
app.use("/api/v1/users", users);
app.use("/api/v1/reviews", reviews);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

const server = app.listen(
  PORT,
  console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

// Handle unhandled promise rejections
process.on("unhandledRejection", (err, promise) => {
  console.log(`Error: ${err.message}`);
  // Close server and exit process
  server.close(() => process.exit(1));
});
