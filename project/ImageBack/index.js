const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const cors = require('cors');
const port = 5000;
const fs = require('fs');
const { ImageModel} = require('./models');

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
app.listen(port, () => {
  console.log('server running successfully');
});
