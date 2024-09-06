const express = require('express');
const fs = require('fs');
const cors = require('cors'); // Enable CORS
const app = express();
const http = require('http');  // Required for Socket.io
const server = http.createServer(app);
const sockets = require('./sockets');  // Import sockets module

// Initialize Socket.io
sockets.init(server);

const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(cors());  // Enable CORS for all routes

// Load data from JSON file
let data = {};
try {
  data = JSON.parse(fs.readFileSync('data.json'));
} catch (err) {
  console.log('No data file found, starting fresh.');
}

// Initialise empty data structure
data.users = data.users || [];
data.groups = data.groups || [];
data.channels = data.channels || [];

// Save data to JSON file
const saveData = () => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

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

// Create a new user
app.post('/users', (req, res) => {
  const { username, email, password } = req.body;
  if (data.users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }
  const newUser = { id: Date.now().toString(), username, email, password, roles: ['User'], groups: [] };
  data.users.push(newUser);
  saveData();
  res.status(201).json(newUser);
});

// Get all users
app.get('/users', (req, res) => {
  res.json(data.users);
});

// Create a new group
app.post('/groups', (req, res) => {
  const { name, adminId } = req.body;
  const admin = data.users.find(user => user.id === adminId);
  if (!admin) {
    return res.status(400).json({ message: 'Admin not found' });
  }
  const newGroup = { id: Date.now().toString(), name, admin: adminId, members: [adminId], channels: [] };
  data.groups.push(newGroup);
  admin.groups.push(newGroup.id);
  saveData();
  res.status(201).json(newGroup);
});

// Get all groups
app.get('/groups', (req, res) => {
  res.json(data.groups);
});

// Create a new channel
app.post('/channels', (req, res) => {
  const { name, groupId } = req.body;
  const group = data.groups.find(group => group.id === groupId);
  if (!group) {
    return res.status(400).json({ message: 'Group not found' });
  }
  const newChannel = { id: Date.now().toString(), name, group: groupId };
  data.channels.push(newChannel);
  group.channels.push(newChannel.id);
  saveData();
  res.status(201).json(newChannel);
});

// Get all channels
app.get('/channels', (req, res) => {
  res.json(data.channels);
});

// Middleware for role-based access control
const checkRole = (roles) => (req, res, next) => {
  const { userId } = req.body;
  const user = data.users.find(user => user.id === userId);
  if (!user || !roles.some(role => user.roles.includes(role))) {
    return res.status(403).json({ message: 'Access denied' });
  }
  next();
};

// Promote a user to Group Admin
app.post('/promote', checkRole(['Super Admin']), (req, res) => {
  const { userId } = req.body;
  const user = data.users.find(user => user.id === userId);
  if (user) {
    user.roles.push('Group Admin');
    saveData();
    res.status(200).json({ message: 'User promoted to Group Admin', user });
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

// Remove a user
app.delete('/users/:id', checkRole(['Super Admin']), (req, res) => {
  const userId = req.params.id;
  data.users = data.users.filter(user => user.id !== userId);
  saveData();
  res.status(200).json({ message: 'User removed' });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
