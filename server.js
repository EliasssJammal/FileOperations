const express = require('express');
const mongoose = require('mongoose');
const { body, validationResult } = require('express-validator');

const app = express();
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/fitnessTracker', { useNewUrlParser: true, useUnifiedTopology: true });

const workoutSchema = new mongoose.Schema({
  type: { type: String, required: true },
  duration: { type: Number, required: true },
  calories_burned: { type: Number, required: true }
});

const nutritionSchema = new mongoose.Schema({
  meal: { type: String, required: true },
  calories: { type: Number, required: true },
  protein: { type: Number, required: true }
});

const goalSchema = new mongoose.Schema({
  goal_type: { type: String, required: true },
  target: { type: Number, required: true }
});

const Workout = mongoose.model('Workout', workoutSchema);
const Nutrition = mongoose.model('Nutrition', nutritionSchema);
const Goal = mongoose.model('Goal', goalSchema);

app.get('/workouts', async (req, res) => {
  try {
    const workouts = await Workout.find();
    res.json(workouts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/workouts', [
  body('type').isLength({ min: 1 }),
  body('duration').isNumeric(),
  body('calories_burned').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newWorkout = new Workout(req.body);
    await newWorkout.save();
    res.json(newWorkout);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/nutrition', async (req, res) => {
  try {
    const nutritionFacts = await Nutrition.find();
    res.json(nutritionFacts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/nutrition', [
  body('meal').isLength({ min: 1 }),
  body('calories').isNumeric(),
  body('protein').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newNutrition = new Nutrition(req.body);
    await newNutrition.save();
    res.json(newNutrition);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.get('/goals', async (req, res) => {
  try {
    const goals = await Goal.find();
    res.json(goals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

app.post('/goals', [
  body('goal_type').isLength({ min: 1 }),
  body('target').isNumeric()
], async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    const newGoal = new Goal(req.body);
    await newGoal.save();
    res.json(newGoal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});


