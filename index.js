const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs').promises;
const path = require('path');
const app = express();
const PORT = 3000;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const dest = `C:\\Users\\pavel\\repositories\\Telegram Mini App\\crop-image\\backend\\uploads`
    const dest = '/root/crop-image/uploads';
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const [, ext] = file.mimetype.split('/')
    cb(null, `${Date.now()}-${file.originalname}.${ext}`);
  }
})
const upload = multer({ storage: storage });

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.post('/submit', upload.single('image'), async (req, res) => {
  try {
    const { filename } = req.file;
    const filepath = path.join(__dirname, `uploads/${filename}`);
    const file = await fs.readFile(filepath);
    res.status(200).send({ message: 'Upload succeed!' })
  } catch(err) {
    res.status(500).send({ message: 'Oops! Something went wrong!' })
  }
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})