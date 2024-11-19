import React, { useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import porsche from './porsche.jpg';
import india from '../icons/india.png';
import mail from '../icons/gmail.png';
import linkedin from '../icons/linkedin.png';
import github from '../icons/github.png';
import '../slider.css';
import axios from 'axios';

const Home = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [items, setItems] = useState([]); 
    const [loading, setLoading] = useState(true); 
    const [error, setError] = useState(null); 

    useEffect(() => {
        const fetchCars = async () => {
            try {
                const response = await axios.get('http://localhost:3000/cars');
                setItems(response.data);
                setLoading(false);
            } catch (error) {
                console.error('Error fetching car data:', error);
                setError('Failed to load car data.'); 
                setLoading(false); 
            }
        };

        fetchCars();
    }, []);



    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + items.length) % items.length);
    };

    // Loading and error handling
    if (loading) return <p>Loading...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
            <h1 className='common-heading'>Welcome to Universal Dynamics</h1>
            <div>
                <img style={{ width: '100%', maxWidth: 'auto', height: 'auto' }} src={porsche} alt="Porsche" />
            </div>
            <div className="d-flex flex-row justify-content-center contain">
            <div className="d-flex flex-row">
                
                <Link to="/SportsCars">
                <div className="car-item"  style={{margin:'12px'}}>
                <h3>Sports Car</h3>
                    <img className="car-image" src={items[20].image_url_1} alt="Sportscar images"/>    
                </div>
                </Link>
                
                <Link to="/vintage">
                <div className="car-item"  style={{margin:'12px'}}>
                 <h3>Vintage Cars</h3>
                    <img className="car-image" src={items[23].image_url_1} alt="Vintage car images"/>    
                </div>
                </Link>
                
                <Link  to="/EVehicles">
                <div className="car-item"  style={{margin:'12px'}}>
                 <h3>E-Vehicles</h3>
                    <img className="car-image" src={items[40].image_url_1} alt="Evechiles images"/>    
                </div>
                </Link>
                
                 </div>
             <div className="centered-text">
    <h3 style={{fontSize:'5vh' ,margin:'2px'}}>Explore the Future of Driving with Universal Dynamics</h3>
    <p  style={{fontSize:'3vh',padding:'31px'}}>At Universal Dynamics, we bring you the finest selection of sports cars, vintage classics, and cutting-edge electric vehicles. Our curated collection showcases the innovation and craftsmanship of the automotive world, providing you with an unforgettable driving experience. Whether you're looking for power, nostalgia, or sustainability, we've got the perfect ride for you. Get ready to hit the road in style!</p>
</div>
            
            
         

            </div>
            
            
            
               <h4 className="common-heading" style={{fontSize:'40px'}}>Top Models</h4> 
            <div className='slide-show'>
                <div className="unique-slider-container">
                    <div className="unique-slider-slide">
                        {items.map((item, index) => (
                            <div
                                key={item.CarID}
                                className={`unique-slider-item ${index === currentIndex ? 'active' : ''}`}
                                style={{ backgroundImage: `url(${item.image_url_1})` }}
                            >
                                <div className="unique-slider-content">
                                    <div className="unique-slider-name">{item.brand} {item.model}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="unique-slider-button">
                        <button className="unique-slider-prev" onClick={prevSlide}>❮</button>
                        <button className="unique-slider-next" onClick={nextSlide}>❯</button>
                    </div>
                </div>
            </div>
                <div className="footings" id="footings">
                <div className="d-flex flex-row">
                <div>
                    <h4>Current Region / Language</h4>
                     <div className="d-flex flex-row">
                     <img style={{ width: '2rem', height: '2rem', borderRadius: "50%" }} src={india} alt="India Flag" />
                    <p style={{padding:'6px'}}>India / English</p>                     
                     </div>
                     </div>
                     <div className="d-flex flex-column"  style={{margin:'auto'}}>
                        <h5>Contact Us</h5> 
                        <div className="d-flex flex-row">
                        <a  href="mailto:kishoreramesh@1245.com?subject=Compose%20Mail"  style={{padding:'10px'}}>
                        <img src={mail} style={{width:'2rem' ,height:'2rem'}} alt="mail icon"/>
                        </a>
                        <a href="https://www.linkedin.com/in/kishore-r1245" target="_blank" rel="noopener noreferrer" style={{padding:'10px'}} >
                         <img src={linkedin} style={{width:'2rem' ,height:'2rem'}} alt="linkedin icon"/>
                        </a>
                        
                         <a  href="https://github.com/cosmos1245" target="_blank" rel="noopener noreferrer"  style={{padding:'10px'}}>
                         <img src={github} style={{width:'2rem' ,height:'2rem'}} alt="github icon"/>
                        </a>
                        </div>
                     </div>
                     </div>
                </div>
                 <hr />
                     <h3 className="footcomapany">Universal Dynamics</h3>

        </div>
    );
};

export default Home;

