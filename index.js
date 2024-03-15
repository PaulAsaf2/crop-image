const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.post('/submit', (req, res) => {
  const { image, filename } = req.body;
  
  // Decode base64 image data back to binary
  const imageBuffer = Buffer.from(image, 'base64');
  
  // Define path to save the image file
  const imagePath = path.join(__dirname, `uploads/${filename}`);
  
  // Write the image buffer to the file system
  fs.writeFile(imagePath, imageBuffer, 'binary', (err) => {
    if (err) {
      console.error('Error saving image:', err);
      res.status(500).send('Error saving image');
    } else {
      console.log('Image saved successfully');
      res.status(200).send('Image saved successfully');
    }
  });
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})