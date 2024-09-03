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

// User Authentication
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = data.users.find(user => user.username === username && user.password === password);
    if (user) {
      res.status(200).json({ message: 'Login successful', user });
    } else {
      res.status(401).json({ message: 'Invalid username or password' });
    }
  });
  
  app.post('/logout', (req, res) => {
    res.status(200).json({ message: 'Logout successful' });
  });
  
  // Super Admin can create users
  app.post('/users', (req, res) => {
    const { username, email, password } = req.body;
    if (data.users.find(user => user.username === username)) {
      return res.status(400).json({ message: 'Username already exists' });
    }
    const newUser = { username, email, password, role: 'user' };
    data.users.push(newUser);
    saveData();
    res.status(201).json({ message: 'User created', user: newUser });
  });
  