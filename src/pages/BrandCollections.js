import React, { useState, useEffect, useContext, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ThemeContext } from '../ThemeContext.js';
import axios from 'axios';

const BrandCollections = () => {
  const { brand } = useParams(); 
  const { theme } = useContext(ThemeContext);
  const [cars, setCars] = useState([]); 
  const [filteredCars, setFilteredCars] = useState([]);  
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchValue, setSearchValue] = useState("");
  const collectionRef = useRef(null);

 
  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('http://localhost:3000/cars');
        if (Array.isArray(response.data)) {
          setCars(response.data);
        } else {
          setError('Unexpected response format');
        }
      } catch (error) {
        setError('Error fetching car data');
      } finally {
        setLoading(false);
      }
    };

    fetchCars();
  }, []);

 
  useEffect(() => {
    if (cars.length > 0) {
      const filtered = cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase());
      setFilteredCars(filtered);
    }
  }, [brand, cars]);  

 
  useEffect(() => {
    if (searchValue.trim() === "") {
      setFilteredCars(cars.filter(car => car.brand.toLowerCase() === brand.toLowerCase()));
    } else {
      const filtered = filteredCars.filter(car => {
        const model = car.model ? car.model.toLowerCase() : '';
        return model.includes(searchValue.toLowerCase());
      });
      setFilteredCars(filtered);
    }
  }, [searchValue, brand, cars]);

 
  useEffect(() => {
    if (collectionRef.current) {
      collectionRef.current.classList.remove('light-theme', 'dark-theme');
      collectionRef.current.classList.add(theme === 'Dark Theme' ? 'dark-theme' : 'light-theme');
    }
  }, [theme]);

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  return (
    <div ref={collectionRef} className={`car-collection ${theme === 'Dark Theme' ? 'dark-theme' : 'light-theme'}`}>
      <h2>{brand} Models</h2>

      <input
        type="text"
        value={searchValue}
        onChange={handleSearchChange}
        placeholder="Search by model"
        className={`search-input ${theme === 'Dark Theme' ? 'dark-theme' : 'light-theme'}`}
      />

      {loading && <p>Loading cars...</p>}
      {error && <p>{error}</p>}

      <div className="car-list">
        {filteredCars.length === 0 ? (
          <p>No models found for {brand}.</p>
        ) : (
          filteredCars.map(car => (
            <Link key={car.id} to={`/car/${car.model}`} className="car-item">
              <h3>{car.model}</h3>
              <img src={car.image_url_1} alt={car.model} className="car-image" />
            </Link>
          ))
        )}
      </div>
    </div>
  );
};

export default BrandCollections;

