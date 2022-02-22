const express = require("express");
var cors = require('cors')
const app = express();
const fs = require('fs')
const util = require('util')
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoute = require("./routes/auth");
const userRoute = require("./routes/users");
const postRoute = require("./routes/posts");
const recipeRoute = require("./routes/recipes")
const categoryRoute = require("./routes/categories");
const { uploadFile, getFileStream } = require('./s3')
const multer = require("multer");
const path = require("path");

dotenv.config();
app.use(express.json());
app.use(cors())
app.use("/images", express.static(path.join(__dirname, "/images")));

mongoose
  .connect(process.env.MONGO_URL)
  .then(console.log("Connected to MongoDB"))
  .catch((err) => console.log(err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.get('/image/:key', (req, res) => {
  const key = req.params.key
  const readStream = getFileStream(key)
  readStream.pipe(res)
})

const unlinkFile = util.promisify(fs.unlink)
app.post("/upload", upload.single("file"), async (req, res) => {
  const file = req.file
  console.log(file)
  const result = await uploadFile(file);
  await unlinkFile(file.path)
  console.log(result)
  res.status(200).json("File has been uploaded");
});

app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/post", postRoute);
app.use("/recipe", recipeRoute)
app.use("/category", categoryRoute);

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// Check
let port = process.env.PORT;
if (port == null || port == "") {
  port = 8000;
}

app.listen(port, () => {
  console.log('Backend is running on port ' + port);
});