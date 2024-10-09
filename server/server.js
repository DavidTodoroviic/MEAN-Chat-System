const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const server = http.createServer(app);
const sockets = require('./sockets');

// Initialize Socket.io
sockets.init(server);

const PORT = process.env.PORT || 3000;
const MONGO_URI = 'mongodb://localhost:27017/mean-chat'; // Directly set the MongoDB URI

// Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:4200' }));  // Enable CORS for the frontend origin

// Connect to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Define Mongoose schemas and models
const channelSchema = new mongoose.Schema({
  id: String,
  name: String,
  groupId: String,
  users: [String]
});

const Channel = mongoose.model('Channel', channelSchema);

// Load data from JSON file
let data = {};
try {
  data = JSON.parse(fs.readFileSync('data.json'));
} catch (err) {
  console.log('No data file found, starting fresh.');
}

// Multer setup for file uploads
const upload = multer({ dest: 'uploads/' });

// Endpoint to handle image uploads
app.post('/upload/chat', upload.single('chatImage'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  const filePath = path.join('uploads', req.file.filename);
  res.send({ filePath });
});

// Serve static files from the uploads directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Initialise empty data structure
data.users = data.users || [];
data.groups = data.groups || [];

// Save data to JSON file
const saveData = () => {
  fs.writeFileSync('data.json', JSON.stringify(data, null, 2));
};

// User Authentication
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  console.log('Login request received');
  console.table(req.body);
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
  console.table(newUser);
  data.users.push(newUser);
  saveData();
  res.status(201).json(newUser);
});

// Check if a user exists
app.get('/api/users/exists/:username', (req, res) => {
  const { username } = req.params;
  const userExists = data.users.some(user => user.username === username);
  res.status(200).json(userExists);
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
app.post('/api/channels', async (req, res) => {
  const { name, groupId } = req.body;

  const group = data.groups.find(group => group.id === groupId);
  if (!group) {
    return res.status(400).json({ message: 'Group not found' });
  }

  const newChannel = new Channel({ id: Date.now().toString(), name, groupId, users: [] });
  await newChannel.save();
  group.channels.push(newChannel.id);
  saveData();
  res.status(201).json(newChannel);
});

// Add user to channel
app.post('/api/channels/:channelId/users', async (req, res) => {
  const { channelId } = req.params;
  const { userId } = req.body;

  const channel = await Channel.findById(channelId);
  const user = data.users.find(user => user.id === userId);

  if (!channel || !user) {
    return res.status(404).json({ message: 'Channel or User not found' });
  }

  if (!channel.users.includes(userId)) {
    channel.users.push(userId);
    await channel.save();
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
app.get('/api/channels', async (req, res) => {
  const channels = await Channel.find();
  res.json(channels);
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
app.post('/api/users/promote', (req, res) => {
  const userId = req.body.userId;
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

// Delete a user by ID
app.delete('/api/users/:id', (req, res) => {
  const userId = req.params.id;
  const userIndex = data.users.findIndex(user => user.id === userId);

  if (userIndex === -1) {
    return res.status(404).json({ message: 'User not found' });
  }

  data.users.splice(userIndex, 1);
  saveData();
  res.sendStatus(204);
});

// Start the server
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});