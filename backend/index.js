const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");
const path = require("path");
const multer = require("multer");
const authRouter = require("../backend/routes/auth");
const userRouter = require("../backend/routes/users");
const postRouter = require("../backend/routes/post");
const storyRouter = require("../backend/routes/story");

dotenv.config();

const app = express();
// const port = process.env.PORT;
// if (port == null || port == "") {
//   port = 5000;
// }

// connecting database
mongoose.connect(
  process.env.MONGOOSE_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("MongoDB database is connected!");
  }
);

app.use("/images", express.static(path.join(__dirname, "public/images")));

// middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// upload files
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/images");
  },
  filename: (req, file, cb) => {
    console.log(req.body.name);
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });
app.post("/api/upload/", upload.single("file"), (req, res) => {
  try {
    return res.status(200).json("file uploaded successfully");
  } catch (err) {
    console.log(err);
  }
});

// setting up routes
app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/post", postRouter);
app.use("/api/story", storyRouter);

// setting up port
app.listen(6000, () => {
  console.log("Server is started successfully.");
});
