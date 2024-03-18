const express = require('express');
const bodyParser = require('body-parser');
// const fs = require('fs');
// const path = require('path');
const cors = require('cors');
const multer = require('multer');
const app = express();
const PORT = 3000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const localDest = `C:\\Users\\pavel\\repositories\\Telegram Mini App\\crop-image\\backend\\uploads`
    // const dest = '/root/crop-image/uploads'
    const dest = '/var/www/domains/webapp.monitour.ru/wallstring/crop-image/uploads'
    cb(null, dest) // заменить на соответствующий адрес
  },
  filename: function (req, file, cb) {
    const [, ext] = file.mimetype.split('/')
    cb(null, `${Date.now()}-${file.originalname}.${ext}`);
  }
})
const upload = multer({storage: storage});

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.post('/submit', upload.single('image'), (req, res) => {
  res.status(200).send({message: 'Upload succeed!'})
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})