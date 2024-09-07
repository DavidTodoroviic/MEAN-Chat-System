const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const http = require('http');
const server = http.createServer(app);
const sockets = require('./sockets');

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
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  
  const user = data.users.find(user => user.username === username && user.password === password);
  if (user) {
    res.status(200).json({ message: 'Login successful', user });
  } else {
    res.status(401).json({ message: 'Invalid username or password' });
  }
});

// Create a new user
app.post('/api/users', (req, res) => {
  const { username, email, password, roles, groups } = req.body;

  if (data.users.find(user => user.username === username)) {
    return res.status(400).json({ message: 'Username already exists' });
  }

  const newUser = { id: Date.now().toString(), username, email, password, roles, groups };
  console.table(newUser)
  data.users.push(newUser);
  saveData();
  res.status(201).json(newUser);
});

// Get all users
app.get('/api/users', (req, res) => {
  res.json(data.users);
});

// Create a new group
app.post('/api/groups', (req, res) => {
  const { name, adminId } = req.body;

  const admin = data.users.find(user => user.id === adminId);
  if (!admin) {
    return res.status(400).json({ message: 'Admin not found' });
  }

  const newGroup = { id: Date.now().toString(), name, admin: adminId, members: [adminId], channels: [] };
  data.groups.push(newGroup);
  admin.groups.push(newGroup.id);
  // console.table(newGroup)
  saveData();
  res.status(201).json(newGroup);
});

// Add user to group
app.post('/api/groups/:groupId/users', (req, res) => {
  const { groupId } = req.params;
  const { userId } = req.body;

  const group = data.groups.find(group => group.id === groupId);
  const user = data.users.find(user => user.id === userId);

  if (!group || !user) {
    return res.status(404).json({ message: 'Group or User not found' });
  }

  if (!group.members.includes(userId)) {
    group.members.push(userId);
    user.groups.push(groupId);
    saveData();
    res.status(200).json({ message: 'User added to group' });
  } else {
    res.status(400).json({ message: 'User is already in the group' });
  }
});

// Create a new channel
app.post('/api/channels', (req, res) => {
  const { name, groupId } = req.body;

  const group = data.groups.find(group => group.id === groupId);
  if (!group) {
    return res.status(400).json({ message: 'Group not found' });
  }

  const newChannel = { id: Date.now().toString(), name, group: groupId, users: [] };
  data.channels.push(newChannel);
  group.channels.push(newChannel.id);
  saveData();
  res.status(201).json(newChannel);
});

// Add user to channel
app.post('/api/channels/:channelId/users', (req, res) => {
  const { channelId } = req.params;
  const { userId } = req.body;

  const channel = data.channels.find(channel => channel.id === channelId);
  const user = data.users.find(user => user.id === userId);

  if (!channel || !user) {
    return res.status(404).json({ message: 'Channel or User not found' });
  }

  if (!channel.users.includes(userId)) {
    channel.users.push(userId);
    saveData();
    res.status(200).json({ message: 'User added to channel' });
  } else {
    res.status(400).json({ message: 'User is already in the channel' });
  }
});

// Get all groups
app.get('/api/groups', (req, res) => {
  res.json(data.groups);
});

// Get all channels
app.get('/api/channels', (req, res) => {
  res.json(data.channels);
});

// Middleware for role-based access control
const checkRole = roles => (req, res, next) => {
  const { userId } = req.body;
  
  const user = data.users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!roles.some(role => user.roles.includes(role))) {
    return res.status(403).json({ message: 'Access denied' });
  }

  next();
};

// Promote a user to Group Admin
app.post('/api/promote', checkRole(['Super Admin']), (req, res) => {
  const { userId } = req.body;
  
  const user = data.users.find(user => user.id === userId);
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  if (!user.roles.includes('Group Admin')) {
    user.roles.push('Group Admin');
    saveData();
    res.status(200).json({ message: 'User promoted to Group Admin', user });
  } else {
    res.status(400).json({ message: 'User is already a Group Admin' });
  }
});

// Remove a user
app.delete('/api/users/:id', checkRole(['Super Admin']), (req, res) => {
  const userId = req.params.id;
  
  const userIndex = data.users.findIndex(user => user.id === userId);
  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  data.users.splice(userIndex, 1);
  saveData();
  res.status(200).json({ message: 'User removed' });
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});