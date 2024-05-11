const express = require('express');
const mongoose = require('mongoose');
// cors
const cors = require('cors');
// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/Geocoder', {useNewUrlParser: true, useUnifiedTopology: true});

// Define a schema for our data
const Schema = mongoose.Schema;
const DataSchema = new Schema({
  _id: Schema.Types.ObjectId,
  Situation: String,
  Address: String,
  Latitude: Number,
  Longitude: Number
});

// Create a model using the schema and specify the collection name
const Data = mongoose.model('Data', DataSchema, 'Location');

// Create an Express app
const app = express();
app.use(cors(), express.static('public'));
// Define a route to fetch data from MongoDB and send it as JSON
app.get('/data', async (req, res) => {
  const data = await Data.find();
  res.json(data);
});

// Define a route to serve an HTML page that fetches and displays the data
app.get('/', (req, res) => {
  res.send(`
    <html>
      <body>
        <h1>Data</h1>
        <div id="data"></div>
        <script>
          fetch('/data')
            .then(response => response.json())
            .then(data => {
              let dataString = '';
              data.forEach(item => {
                dataString += 'Situation: ' + item.Situation + ', ';
                dataString += 'Address: ' + item.Address + ', ';
                dataString += 'Latitude: ' + item.Latitude + ', ';
                dataString += 'Longitude: ' + item.Longitude + '<br>';
              });
              document.getElementById('data').innerHTML = dataString;
            });
        </script>
      </body>
    </html>
  `);
});

// Start the server
app.listen(3000, () => console.log('Server listening on port 3000'));
