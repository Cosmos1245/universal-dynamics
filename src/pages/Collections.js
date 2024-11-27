import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { ThemeContext } from '../ThemeContext.js';  
import axios from 'axios';
import './Collections.css';  

const CarCollection = () => {
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
              const response = await axios.get('http://localhost:1245/brands');

                if (Array.isArray(response.data)) {
                    setCars(response.data);
                    setFilteredCars(response.data); 
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
        if (collectionRef.current) {
            collectionRef.current.classList.remove('light-theme', 'dark-theme');  
            collectionRef.current.classList.add(theme === 'Dark Theme' ? 'dark-theme' : 'light-theme'); 
        }
    }, [theme]);  

   
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };


  useEffect(() => {
    const filtered = cars.filter(car => {
    
        const brand = car.brand ? car.brand.toLowerCase() : '';
        
        return brand.includes(searchValue.toLowerCase()) ;
    });
    setFilteredCars(filtered);
}, [searchValue, cars]);

    return (
        <div ref={collectionRef} className="car-collection">
            <h2 className="heading">Car Collection</h2>
            
           
            <input
                type="text"
                id="searchInput"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search by brand"
                className={`search-input ${theme === 'Dark Theme' ? 'dark-theme' : 'light-theme'}`}
            />
            
           
            {loading && <p>Loading cars...</p>}
            {error && <p>{error}</p>}
            
            <div className="car-list">
                {filteredCars.map(car => (
                 <Link to={`/cars/${car.brand}`}>
                        <div key={car.id} className="car-item">
                        <h3>{car.brand} {car.model} </h3>
                        <img
                            src={car.brand_logo_url}
                            alt={car.brand}
                            className="car-image"
                        />
                    </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CarCollection;

