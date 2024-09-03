const express = require('express');
const fs = require('fs');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Load data from JSON file
let data = {};
try {
  data = JSON.parse(fs.readFileSync('data.json'));
} catch (err) {
  console.log('No data file found, starting fresh.');
}

// Save data to JSON file
const saveData = () => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
