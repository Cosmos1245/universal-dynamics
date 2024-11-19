import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import '/home/cosmos/project-z/src/pages/CarDetails.css';

const CarDetails = () => {
  const { model } = useParams();
  const [car, setCar] = useState(null);
  const [cars, setCars] = useState([]);  // Store all cars
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars/');
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
    // Once the car list is fetched, filter to find the specific car by model
    if (cars.length > 0) {
      const selectedCar = cars.find((car) => car.model.toLowerCase() === model.toLowerCase());
      if (selectedCar) {
        setCar(selectedCar);
      } else {
        setError('Car not found');
      }
    }
  }, [cars, model]);  // Run this effect when cars or model changes

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p>{error}</p>;

  if (!car) return <p>Car not found</p>;

  return (
    <div className="car-details">
      <h2>{car.brand} {car.model}</h2>
      <div className="car-image-gallery">
        <div className="car-image-item">
          <img src={car.image_url_1} alt="Car Image 1" className="car-detail-image" />
        </div>
        <div className="car-image-item">
          <img src={car.image_url_2} alt="Car Image 2" className="car-detail-image" />
        </div>
        <div className="car-image-item">
          <img src={car.image_url_3} alt="Car Image 3" className="car-detail-image" />
        </div>
        <div className="car-image-item">
          <img src={car.image_url_4} alt="Car Image 4" className="car-detail-image" />
        </div>
        <div className="car-image-item">
          <img src={car.image_url_5} alt="Car Image 5" className="car-detail-image" />
        </div>
      </div>

      <p>Year of Manufacture: {car.year_of_manufacture}</p>
      <p>Top Speed: {car.top_speed} km/h</p>
      <p>Mileage: {car.mileage} km</p>
      <p>Fuel: {car.fuel}</p>
      <p>Price: ₹{car.price}</p>
      <p>Horsepower: {car.horsepower} HP</p>
      <p>Engine Capacity: {car.engine_capacity} L</p>
      <p>Transmission Type: {car.transmission_type}</p>
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

