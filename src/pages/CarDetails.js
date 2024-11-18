import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './Collections.css';

const CarDetails = () => {
    const { model } = useParams();// Get the car ID from URL
    const [car, setCar] = useState(null);
    const [cars, setCars] = useState([]);  // Store all cars
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/collection/');
                setCars(response.data);  // Store all cars in state
            } catch (error) {
                console.error('Error fetching car list:', error);
                setError('Error fetching car details');
            } finally {
                setLoading(false);
            }
        };

        fetchCars();
    }, []);  // Only run once when the component is mounted

    useEffect(() => {
        // Once the car list is fetched, filter to find the specific car by id
        if (cars.length > 0) {
            const selectedCar = cars.find((car) => (car.car_model.toLowerCase()===model.toLowerCase() || car.image_model.toLowerCase() === model.toLowerCase()) || (car.brand.toLowerCase()===brand.toLowerCase()));  // Find car by ID
            if (selectedCar) {
                setCar(selectedCar);
            } else {
                setError('Car not found');
            }
        }
    }, [cars, model,brand]);  // Run this effect when cars or id changes

    if (loading) return <p>Loading car details...</p>;
    if (error) return <p>{error}</p>;

    if (!car) return <p>Car not found</p>;

    return (
        <div className="car-details">
            <h2>{car.brand} {car.model}</h2>
            <img
                src={car.image_url}
                alt={`${car.brand} ${car.model}`}
                className="car-detail-image"
            />
            <p>Year of Manufacture: {car.year_of_manufacture}</p>
            <p>Top Speed: {car.top_speed} km/h</p>
            <p>Price: "$"{car.price}</p>
            <p>{car.description}</p>
            <h3>Features</h3>
            <ul>
                {(car.features || "").split(',').map((feature, index) => (
                    <li key={index}>{feature}</li>
                ))}
            </ul>
        </div>
    );
};

export default CarDetails;

