const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path')
const app = express();

// dotenv.config({ path: './config.env' })
require('./db/conn')
app.use(express.json());
app.use(bodyParser.urlencoded(
  { extended: false }
))

app.use(cors());
app.use(express.json());

app.use('/api/api',require('./router/api'));

if (process.env.NODE_ENV === 'production') {
  //*Set static folder up in production
  app.use(express.static('client/build'));

  app.get('*', (req, res) => res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html')));
}

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});