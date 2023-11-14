import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './../App.css'; //gets css
import filterFruits from './filter'; // gets filter

const FruitTable = () => {
  const [fruits, setFruits] = useState([]);
  const [filteredFruits, setFilteredFruits] = useState([]);
  const [filterName, setFilterName] = useState('');
  const [filterFamily, setFilterFamily] = useState('');

  useEffect(() => {
    axios.get('https://www.fruityvice.com/api/fruit/all')
      .then((response) => {
        setFruits(response.data);
        setFilteredFruits(response.data);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
      })
      .catch((error) => {
        console.error('Error fetching fruits:', error);
      });
  }, []);

  // filter
  useEffect(() => {
    const filtered = filterFruits(fruits, filterName, filterFamily);
    setFilteredFruits(filtered);
  }, [filterName, filterFamily, fruits]);

  return (
    <div>
      <h2>Fruit Table</h2>

      <div class="filter-and-create-container">
        <div class="filter-inputs">
          <input
            type="text"
            placeholder="Filter by Name"
            value={filterName}
            onChange={(e) => setFilterName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Filter by Family"
            value={filterFamily}
            onChange={(e) => setFilterFamily(e.target.value)}
          />
        </div>

        <Link to="/create" class="create-fruit-button">Create Fruit</Link>
      </div>

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Family</th>
            <th>Order</th>
            <th>Genus</th>
            <th>More Info</th>
          </tr>
        </thead>

        <tbody>
          {filteredFruits.map((fruit) => (
            <tr key={fruit.id}>
              <td>{fruit.name}</td>
              <td>{fruit.family}</td>
              <td>{fruit.order}</td>
              <td>{fruit.genus}</td>
              <td>
                <Link to={`/fruit/${fruit.name}`} class="action-link">View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FruitTable;
