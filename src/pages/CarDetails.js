import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './CarDetails.css';

const CarDetails = () => {
  const { model } = useParams();
  const [car, setCar] = useState(null);
  const [cars, setCars] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
   
    const loginStatus = localStorage.getItem('isLoggedIn');
    if (loginStatus === 'true') {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, []);

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://universal-dynamics-backend.onrender.com/cars');
        setCars(response.data); 
      } catch (error) {
        console.error('Error fetching car list:', error);
        setError('Error fetching car details');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);  

  useEffect(() => {
   
   
    if (cars.length > 0  && model) {
      const selectedCar = cars.find((car) => car.model.toLowerCase() === decodeURIComponent(model).toLowerCase());
      if (selectedCar) {
        setCar(selectedCar);
      } else {
        setError('Car not found');
      }
    }
  }, [cars, model]);  

  const handleBuyClick = () => {
    if (!isLoggedIn) {
      alert('You need to log in to buy this car!');
    } else {
     
      alert('Your order is placed successfully!');
    }
  };

  if (loading) return <p>Loading car details...</p>;
  if (error) return <p>{error}</p>;

  if (!car) return <p>Car not found</p>;

  return (
    <div className="car-details">
      <h2>{car.brand} {car.model}</h2>
      
      <div className="car-image-gallery">
        {car.image_url_1 && (
          <div className="car-image-item">
            <img src={car.image_url_1} alt="Car 1" className="car-detail-image" />
          </div>
        )}
        {car.image_url_2 && (
          <div className="car-image-item">
            <img src={car.image_url_2} alt="Car 2" className="car-detail-image" />
          </div>
        )}
        {car.image_url_3 && (
          <div className="car-image-item">
            <img src={car.image_url_3} alt="Car 3" className="car-detail-image" />
          </div>
        )}
        {car.image_url_4 && (
          <div className="car-image-item">
            <img src={car.image_url_4} alt="Car 4" className="car-detail-image" />
          </div>
        )}
        {car.image_url_5 && (
          <div className="car-image-item">
            <img src={car.image_url_5} alt="Car 5" className="car-detail-image" />
          </div>
        )}
      </div>

      <p><strong>Year of Manufacture:</strong> {car.year_of_manufacture}</p>
      <p><strong>Top Speed:</strong> {car.top_speed} km/h</p>
      <p><strong>Mileage:</strong> {car.mileage} km</p>
      <p><strong>Fuel:</strong> {car.fuel}</p>
      <p><strong>Price:</strong> ₹{car.price}</p>
      <p><strong>Horsepower:</strong> {car.horsepower} HP</p>
      <p><strong>Engine Capacity:</strong> {car.engine_capacity} L</p>
      <p><strong>Transmission Type:</strong> {car.transmission_type}</p>
      <p>{car.description}</p>

      <h3>Features</h3>
      <ul>
        {(car.features || "").split(',').map((feature, index) => (
          <li key={index}>{feature}</li>
        ))}
      </ul>

      <button className="buy-button" onClick={handleBuyClick}>
        Buy This Car
      </button>
    </div>
  );
};

export default CarDetails;

