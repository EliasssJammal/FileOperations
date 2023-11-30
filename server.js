const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
 
const app = express();
app.use(express.json());
 
mongoose.connect('mongodb://localhost:27017/fitnessTracker', { useNewUrlParser: true, useUnifiedTopology: true });
 
// 1. Create User Schema
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String
});
 
const User = mongoose.model('User', userSchema);

// 4. Configure Passport.js
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// 5. Implement User Sessions
app.use(session({
  secret: "FitnessTrackerSecret",
  resave: false,
  saveUninitialized: false
}));
 
// 2, 3. Implement User Authentication Routes
app.post('/register', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = new User({ username: req.body.username, email: req.body.email, password: hashedPassword });
    await newUser.save();
    res.json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/login', passport.authenticate('local'), (req, res) => {
  res.json({ message: 'Logged in successfully' });
});

app.get('/logout', (req, res) => {
  req.logout();
  res.json({ message: 'Logged out successfully' });
});


app.listen(3000, () => {
  console.log('Server running on <http://localhost:3000/>');
});




