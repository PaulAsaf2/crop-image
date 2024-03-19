const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'))

app.post('/submit', (req, res) => {
  res.status(200).send({message: 'Everything okay!'})
})

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
})