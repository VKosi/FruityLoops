import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import './../App.css';

const FruitDetail = () => {
    const [loading, setLoading] = useState(true); // Track loading state
    const [fruit, setFruit] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            try {

                const response = await axios.get(`https://www.fruityvice.com/api/fruit/${id}`);

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }

                const data = await response.json();
                console.log(response); // Log the HTTP response
                const fruitData = data[0];
                setFruit(fruitData);
                setLoading(false); // Set loading state to false once data is fetched

            } catch (error) {
                console.error('Error fetching fruit details:', error);
                alert('Error fetching fruit details.');
                setLoading(false); // Set loading state to false to display an error message
                setFruit(null); // Set fruit state to null to display an error message
            }
        };



        fetchData();
    }, [id]);

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
