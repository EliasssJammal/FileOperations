import React, { useState, useEffect } from "react";

const App = () => {
  const [exercises, setExercises] = useState([]);
  const [newExercise, setNewExercise] = useState("");

  // Helper function to fetch exercises
  const fetchExercises = async () => {
    try {
      const response = await fetch("/api/exercises");
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setExercises(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Fetch exercises from API on component mount
  useEffect(() => {
    fetchExercises();
  }, []);

  // Event handler for refreshing exercises
  const handleRefresh = () => {
    fetchExercises();
  };

  // Event handler for adding an exercise
  const handleAddExercise = () => {
    if (newExercise.trim() === "") return; // Ensure the exercise is not empty
    const exercise = {
      id: exercises.length + 1, // simplistic ID generation
      name: newExercise
    };
    setExercises([...exercises, exercise]);
    setNewExercise("");
  };

  return (
    <div>
      <h1>Exercise List</h1>
      <button onClick={handleRefresh}>Refresh</button>
      <input
        value={newExercise}
        onChange={(e) => setNewExercise(e.target.value)}
        placeholder="Add new exercise"
      />
      <button onClick={handleAddExercise}>Add Exercise</button>
      {exercises.length > 0 ? (
        <ul>
          {exercises.map((exercise) => (
            <li key={exercise.id}>{exercise.name}</li>
          ))}
        </ul>
      ) : (
        <p>No exercises available. Add some!</p>
      )}
    </div>
  );
};

export default App;

