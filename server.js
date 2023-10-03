const express = require('express');
const app = express();
const port = 3000;
const methodOverride = require('method-override');

app.use(express.urlencoded());
app.use(express.json());
app.set('view engine', 'ejs');
app.use(methodOverride('_method'));

app.use((req, res, next) => {
    console.log(`${req.method} request for ${req.url}`);
    next();
});

let workouts = [
    { id: 1, name: 'Pushups' },
    { id: 2, name: 'Situps' },
    { id: 3, name: 'Jogging' },
];

function getWorkouts() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve([...workouts]);
        }, 100); 
    });
}

function addWorkout(newWorkout) {
    return new Promise((resolve) => {
        setTimeout(() => {
            workouts.push(newWorkout);
            resolve();
        }, 100); 
    });
}

app.get('/', (req, res) => {
    res.send(`<button ><a href="/v1/api/workouts">workouts</a></button> <button ><a href="/v1/api/workouts/add">add workouts</a></button>`);
});

app.get('/v1/api/workouts', async (req, res) => {
    try {
        let filteredWorkouts = await getWorkouts();

        // Filtering
        if (req.query.name) {
            filteredWorkouts = filteredWorkouts.filter(workout => workout.name.includes(req.query.name));
        }

        // Sorting
        if (req.query.sort === 'name') {
            filteredWorkouts.sort((a, b) => a.name.localeCompare(b.name));
        }

        res.render("workouts.ejs", { workouts: filteredWorkouts });
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong fetching workouts!');
    }
});

app.get('/v1/api/workouts/add', (req, res) => {
    res.render('workoutForm.ejs');
});

app.get('/v1/api/workouts/add/:id', (req, res) => {
    res.render('updateWorkout.ejs');
});

app.post('/v1/api/workouts', async (req, res) => {
    try {
        const newWorkout = {
            id: workouts.length + 1,
            name: req.body.name
        };
        await addWorkout(newWorkout);
        res.redirect('/v1/api/workouts');
    } catch (error) {
        console.error(error);
        res.status(500).send('Something went wrong adding the workout!');
    }
});

app.put('/v1/api/workouts/update/:id', (req, res) => {
    const workoutId = parseInt(req.params.id);
    const updatedName = req.body.name;

    const workout = workouts.find(w => w.id === workoutId);
    if (workout) {
        workout.name = updatedName;
        res.status(200).send(`Workout with ID ${workoutId} updated.`);
    } else {
        res.status(404).send(`Workout with ID ${workoutId} not found.`);
    }
});

app.delete('/v1/api/workouts/delete/:id', (req, res) => {
    const workoutId = parseInt(req.params.id);
    const index = workouts.findIndex(w => w.id === workoutId);

    if (index !== -1) {
        workouts.splice(index, 1);
        res.redirect('/v1/api/workouts');
    } else {
        res.status(404).send(`Workout with ID ${workoutId} not found.`);
    }
});

// Global error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});

