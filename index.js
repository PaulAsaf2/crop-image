const express = require('express');
const https = require('https');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
// -------------------------------------
const app = express();
const PORT = 3000;
// const PORT = 443;
// const options = {
  // key: fs.readFileSync('./127.0.0.1-key.pem'),
  // cert: fs.readFileSync('./127.0.0.1.pem'),
  // key: fs.readFileSync('./localhost-key.pem'),
  // cert: fs.readFileSync('./localhost.pem'),
// };
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // const dest = 'C:\\Users\\pavel\\repositories\\magnetto\\telegram-mini-app\\wallstring\\crop-image\\uploads';
    const dest = '/var/www/wallstring/webapp1/uploads';
    // const dest = '/root/crop-image/uploads';
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    const [, ext] = file.mimetype.split('/')
    cb(null, `${Date.now()}-${file.originalname}.${ext}`);
  }
})
const upload = multer({ storage: storage });
let codeId;
// -------------------------------------
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
// -------------------------------------
app.get('/', (req, res) => {
  const { code } = req.query;
  if (code) {
    codeId = code;
    res.send({ message: 'code saved in codeId' })
  }

  res.status(204).send({message: 'code not found.'})
})

app.get('/get-code', (req, res) => {
  if (codeId) res.send({ code: codeId });
  
  res.send({message: 'codeId not found.'})
})

app.post('/submit', upload.single('image'), (req, res) => {
  try {
    const { filename } = req.file;
    const filepath = path.join(__dirname, `uploads/${filename}`);
    const file = fs.readFile(filepath, (err, data) => {
      if (err) throw err;
      res.status(200).send({ message: 'Upload succeed!' })
    });
  } catch (err) {
    res.status(500).send({ message: 'Oops! Something went wrong!' })
  }
})
// -------------------------------------
// const server = https.createServer(options, app);
// server.listen(PORT, '127.0.0.1', () => {
//   console.log(`Server is running on ${PORT}`);
// })

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
})