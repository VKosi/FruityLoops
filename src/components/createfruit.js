import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../App.css';

const CreateFruit = () => {
  const [newFruit, setNewFruit] = useState({
    genus: '',
    name: '',
    family: '',
    order: '',
    nutritions: {
      carbohydrates: 0,
      protein: 0,
      fat: 0,
      calories: 0,
      sugar: 0,
    },
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'carbohydrates' || name === 'protein' || name === 'fat' || name === 'calories' || name === 'sugar') {
      if (isNaN(parseInt(value)) || value === '') {
        setNewFruit((prevFruit) => ({
          ...prevFruit,
          nutritions: {
            ...prevFruit.nutritions,
            [name]: 0,
          },
        }));
      } else {
        setNewFruit((prevFruit) => ({
          ...prevFruit,
          nutritions: {
            ...prevFruit.nutritions,
            [name]: parseInt(value),
          },
        }));
      }
    } else {
      setNewFruit((prevFruit) => ({
        ...prevFruit,
        [name]: value,
      }));
    }
  };


  const handleSubmit = () => {
    axios.post('https://www.fruitruityvice.com/api/fruit', newFruit)
      .then((response) => {
        // success
        if (response.status === 202) {
          setSuccessMessage('Fruit added successfully!');
          setErrorMessage('');
        } else {
          // error
          setErrorMessage('Error adding the fruit.');
          setSuccessMessage('');

          // alert error message
          alert('Error adding the fruit. Please check your input and try again.');
        }
      })
      .catch((error) => {
        // return api error to console
        console.error('Error adding the fruit:', error);
        setErrorMessage('Error adding the fruit.');
        setSuccessMessage('');

        // alert
        alert('Error adding the fruit. Please check your internet connection and try again.');
      });
  };

  return (
    <div>
      <Link to="/">Back to Fruit Table</Link>

      <h2>Create New Fruit</h2>

      <div class="form-group">
        <label>Genus:</label>
        <input
          type="text"
          name="genus"
          value={newFruit.genus}
          onChange={handleChange}
        />
      </div>

      <div class="form-group">
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={newFruit.name}
          onChange={handleChange}
        />
      </div>

      <div class="form-group">
        <label>Family:</label>
        <input
          type="text"
          name="family"
          value={newFruit.family}
          onChange={handleChange}
        />
      </div>

      <div class="form-group">
        <label>Order:</label>
        <input
          type="text"
          name="order"
          value={newFruit.order}
          onChange={handleChange}
        />
      </div>

      <h3>Nutritions</h3>

      <div class="form-group">
        <label>Carbohydrates:</label>
        <input
          type="text"
          name="carbohydrates"
          value={newFruit.nutritions.carbohydrates}
          onChange={handleChange}
        />
      </div>

      <div class="form-group">
        <label>Protein:</label>
        <input
          type="text"
          name="protein"
          value={newFruit.nutritions.protein}
          onChange={handleChange}
        />
      </div>

      <div class="form-group">
        <label>Fat:</label>
        <input
          type="text"
          name="fat"
          value={newFruit.nutritions.fat}
          onChange={handleChange}
        />
      </div>

      <div class="form-group">
        <label>Calories:</label>
        <input
          type="text"
          name="calories"
          value={newFruit.nutritions.calories}
          onChange={handleChange}
        />
      </div>

      <div class="form-group">
        <label>Sugar:</label>
        <input
          type="text"
          name="sugar"
          value={newFruit.nutritions.sugar}
          onChange={handleChange}
        />
      </div>

      <button onClick={handleSubmit}>Submit</button>

      {successMessage && <p>{successMessage}</p>}
      {errorMessage && <p>{errorMessage}</p>}
    </div>

  );
};

export default CreateFruit;
