import React, { useState, useEffect } from 'react';
import axios from 'axios';

const StepTracker = () => {
  const [steps, setSteps] = useState([]);
  const [newStep, setNewStep] = useState(0);

  useEffect(() => {
    fetchSteps();
  }, []);

  const fetchSteps = async () => {
    try {
      const response = await axios.get('http://localhost:3000/api/steps');
      setSteps(response.data);
    } catch (error) {
      console.error('Error fetching steps:', error);
    }
  };

  const handleAddStep = async () => {
    try {
      await axios.post('http://localhost:3000/api/steps', { steps: newStep });

      fetchSteps();
    } catch (error) {
      console.error('Error adding step:', error);
    }
  };

  return (
    <div>
      <h1>Step Tracker</h1>
      <ul>
        {steps.map((step) => (
          <li key={step._id}>{step.steps}</li>
        ))}
      </ul>
      <div>
        <label>Add New Step:</label>
        <input type="number" value={newStep} onChange={(e) => setNewStep(e.target.value)} />
        <button onClick={handleAddStep}>Add Step</button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <div>
      <StepTracker />
    </div>
  );
};

export default App;

