import React, { useContext } from 'react';
 import { BrowserRouter as Router, Route,  Link, Routes } from 'react-router-dom';
import './index.css';
import './App.css';
import logo from './icons/LOGO.png';
import Home from './pages/Home.js';
import Collections from './pages/Collections.js';
import EVehicles from './pages/EVehicles.js';
import SportsCars from './pages/SportsCars.js';
import VintageCars from './pages/VintageCars.js';
import Contact from './pages/Contact.js';
import { ThemeContext } from './ThemeContext.js'; 
import CarDetails from './pages/CarDetails.js';
import BrandCollections from './pages/BrandCollections.js';
const MainLayout = () => {
const { theme, toggleTheme } = useContext(ThemeContext); 
    return (
 <Router>
            <div>
                <nav className={`navbar navbar-expand-lg ${theme === 'Dark Theme' ? 'bg-dark navbar-dark' : 'navbar-light'}`}>
                    <a href="/" className="nav-logo" style={{ marginRight: "1rem" }}>
                        <img className="Img" loading="lazy" src={logo} alt="Logo" style={{ width: '4rem', height: '4rem', borderRadius: "50%" }} />
                    </a>
                    <a href="/" className="navbar-brand" style={{ position: "relative" }} id="ud-brand">UD</a>
                    <a href="/" className="navbar-brand" style={{ position: "relative" }} id="universal-brand">Universal Dynamics</a>

                    <div className='d-flex align-items-center'>
                        <button className={`btn ${theme === "Dark Theme" ? "btn-dark" : "btn-light"} d-lg-none`} onClick={toggleTheme} aria-label='Toggle Theme' style={{ position: "relative" }}>
                            <i className={theme === "Dark Theme" ? "bi bi-sun-fill" : "bi bi-moon-fill"} style={{ fontSize: "24px" }}></i>
                        </button>
                    </div>
                    <button style={{ position: "relative" }} className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"> </span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
                        <ul className="navbar-nav ml-auto mt-2 mt-lg-0" style={{ marginLeft: "auto", padding: "12px" }}>
                            <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/collections">Collections</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/EVehicles">E-Vehicles</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/sportscars">SportsCars</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/vintage">VintageCars</Link></li>
                            <li className="nav-item"><Link className="nav-link" to="/contact">Contact Us</Link></li>
                        </ul>
                    </div>
                    <div className='d-flex align-items-center'>
                        <div className="d-none d-lg-flex align-items-center ml-auto">
                            <button className={`btn ${theme === "Dark Theme" ? "btn-dark" : "btn-light"}`} onClick={toggleTheme} aria-label='Toggle Theme'>
                                <i className={theme === "Dark Theme" ? "bi bi-sun-fill" : "bi bi-moon-fill"} style={{ fontSize: "24px" }}></i>
                            </button>
                        </div>
                    </div>
                </nav>
                <main>
                    <Routes>
                        <Route path='/' element={<Home />} />
                        <Route path='/collections' element={<Collections />} />
                        <Route path="/EVehicles" element={<EVehicles />} />
                        <Route path='/sportscars' element={<SportsCars />} />
                        <Route path='/vintage' element={<VintageCars />} />
                        <Route path='/contact' element={<Contact />} />
                        <Route path='/car/:model' element={<CarDetails/>} />
                        <Route path='/cars/:brand' element={<BrandCollections/>}/>
                      
                    </Routes>
                </main>
            </div>
 </Router>
    );
};

export default MainLayout;

