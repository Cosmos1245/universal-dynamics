import React, { useEffect, useState, useContext, useRef } from 'react';
import { Link } from 'react-router-dom'; 
import { ThemeContext } from '/home/cosmos/project-z/src/ThemeContext.js';  // Correct path based on your structure
import axios from 'axios';
import '/home/cosmos/project-z/src/pages/Collections.css';  // Include styles for the collection

const CarCollection = () => {
    const { theme } = useContext(ThemeContext);  // Use the theme from context
    const [cars, setCars] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);  // State for filtered cars
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchValue, setSearchValue] = useState("");  // State to hold search input

    // Create a ref for the root div
    const collectionRef = useRef(null);

    // Fetch car data
    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/car_brands');
                if (Array.isArray(response.data)) {
                    setCars(response.data);
                    setFilteredCars(response.data);  // Initially set filtered cars to all cars
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

    // Apply theme to the root div based on context value
    useEffect(() => {
        if (collectionRef.current) {
            collectionRef.current.classList.remove('light-theme', 'dark-theme');  // Remove old theme
            collectionRef.current.classList.add(theme === 'Dark Theme' ? 'dark-theme' : 'light-theme'); // Add the new theme
        }
    }, [theme]);  // Re-run this effect when theme changes

    // Handle search input change
    const handleSearchChange = (event) => {
        setSearchValue(event.target.value);
    };

    // Filter cars based on the search input
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
            
            {/* Search Input */}
            <input
                type="text"
                id="searchInput"
                value={searchValue}
                onChange={handleSearchChange}
                placeholder="Search by brand"
                className={`search-input ${theme === 'Dark Theme' ? 'dark-theme' : 'light-theme'}`}
            />
            
            {/* Loading or Error States */}
            {loading && <p>Loading cars...</p>}
            {error && <p>{error}</p>}
            
            <div className="car-list">
                {filteredCars.map(car => (
                 <Link to={`/car/${car.id}`} >
                    <div key={car.id} className="car-item">
                        <h3>{car.brand} {car.model}</h3>
                        <img
                            src={car.logo_url}
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

