import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './../App.css';

const FruitDetail = () => {
    const [loading, setLoading] = useState(true); // Track loading state
    const [fruit, setFruit] = useState(null);
    const { name } = useParams();

    useEffect(() => {
        setLoading(true);
        axios
            .get('https://www.fruityvice.com/api/fruit/all')
            .then((response) => {
                console.log(name);
                const fruitIndex = response.data.findIndex((fruit) => fruit.name === name);
                if (fruitIndex !== -1) {
                    const selectedFruit = response.data[fruitIndex];
                    setFruit(selectedFruit);

                } else {
                    setFruit(null);
                    console.log(`Fruit with name ${name} not found.`);
                }

                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching fruit details:', error);
                alert('Error fetching fruit details.');
                setLoading(false);
                setFruit(null);
            });
    }, [name]);

    return (
        <div>
            <Link to="/">Back to Fruit Table</Link>

            <h2>Fruit Detail</h2>

            {loading ? (
                <p className="loading-message">Loading fruit details...</p>
            ) : fruit ? (
                <div className="fruit-details">
                    <h3>{fruit.name}</h3>

                    <ul className="fruit-info-list">
                        <li>Family: {fruit.family}</li>
                        <li>Order: {fruit.order}</li>
                        <li>Genus: {fruit.genus}</li>
                        <li>Carbohydrates: {fruit.nutritions.carbohydrates}</li>
                        <li>Protein: {fruit.nutritions.protein}</li>
                        <li>Fat: {fruit.nutritions.fat}</li>
                        <li>Calories: {fruit.nutritions.calories}</li>
                        <li>Sugar: {fruit.nutritions.sugar}</li>
                    </ul>
                </div>
            ) : (
                <p className="error-message">Error fetching fruit details. Please try again later.</p>
            )}
        </div>

    );
};

export default FruitDetail;
