const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const port = 5000;
const fs = require('fs');
const { ImageModel} = require('./models');

require("./userDetails");

app.use(express.json());

app.use(cors());
const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

const JWT_SECRET =
  "hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";


app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect('mongodb://localhost:27017/RSquare', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('connected successfully'))
  .catch((err) => console.log('it has an error', err));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });



app.post('/', upload.single('testImage'), (req, res) => {
  console.log(req.body)
  const saveImage = ImageModel({
    name:req.file.filename,
    img: {
      data: fs.readFileSync('uploads/' + req.file.filename),
      contentType: 'image/png',
    },
  });
  saveImage
    .save()
    .then((res) => {
      console.log('image is saved');
    })
    .catch((err) => {
      console.log(err, 'error has occur');
    });
    {/*
    fs.unlink('uploads/' + req.file.filename, function (err) {
      if (err) throw err;
      // if no error, file has been deleted successfully
      console.log('File deleted!');
    });
  */}
  
    
    res.send('image is saved');
});





app.get('/', async (req, res) => {
  const allData = await ImageModel.find();
  
  res.json(allData);
});



app.delete('/del:id', async (req, res) => {
  let delete_item = req.params.id;
  //
  delete_item = delete_item.substring(1);
  console.log(delete_item);
  try {
    ImageModel.deleteMany({ _id: delete_item }, function (err, result) {
      if (err) {
        console.log(err);
        res.json({ Error: err });
      } else {
  
        console.log('Result :', result);
        res.json({ Result: result });
      }
    });
  } catch (error) {
    res.json(error);
  }
});


//register
const User = mongoose.model("UserInfo");
app.post("/register", async (req, res) => {
  const { fname, lname, email, password } = req.body;

  const encryptedPassword = await bcrypt.hash(password, 10);
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.json({ error: "User Exists" });
    }
    await User.create({
      fname,
      lname,
      email,
      password: encryptedPassword,
    });
    res.send({ status: "ok" });
  } catch (error) {
    res.send({ status: "error" });
  }
});


//login
app.post("/login-user", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.json({ error: "User Not found" });
  }
  if (await bcrypt.compare(password, user.password)) {
    const token = jwt.sign({ email: user.email }, JWT_SECRET);

    if (res.status(201)) {
      return res.json({ status: "ok", data: token });
    } else {
      return res.json({ error: "error" });
    }
  }
  res.json({ status: "error", error: "InvAlid Password" });
});

app.post("/userData", async (req, res) => {
  const { token } = req.body;
  try {
    const user = jwt.verify(token, JWT_SECRET);
    console.log(user);

    const useremail = user.email;
    User.findOne({ email: useremail })
      .then((data) => {
        res.send({ status: "ok", data: data });
      })
      .catch((error) => {
        res.send({ status: "error", data: error });
      });
  } catch (error) {}
});

app.listen(port, () => {
  console.log('server running successfully');
});
