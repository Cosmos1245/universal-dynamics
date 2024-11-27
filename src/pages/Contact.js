import React, { useState } from 'react';
import './ContactUs.css';
import mail from '../icons/gmail.png';
import linkedin from '../icons/linkedin.png';
import github from '../icons/github.png';
import phone from '../icons/phone.png';

const ContactUs = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const [formStatus, setFormStatus] = useState(null);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          
            setFormStatus('Message sent successfully!');
            
           
            setFormData({
                name: '',
                email: '',
                message: ''
            });

            setTimeout(() => {
                setFormStatus(null); 
            }, 5000); 
        } catch (error) {
            setFormStatus('Error sending message. Please try again.');
        }
    };

    return (
        <div className="contact-us-container">
            <h1>Contact Us</h1>

            <div className="contact-form">
                <h2>We'd love to hear from you!</h2>
                <p>Whether you're interested in our cars, need help, or have a question, feel free to reach out.</p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Enter your full name"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="email">Email Address</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="Enter your email address"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="message">Message</label>
                        <textarea
                            id="message"
                            name="message"
                            value={formData.message}
                            onChange={handleChange}
                            required
                            placeholder="Your message"
                        />
                    </div>

                    <button type="submit" className="submit-button">Send Message</button>
                </form>

                {formStatus && <p className="form-status">{formStatus}</p>}
            </div>

            <div className="contact-details">
                <h2>Other Ways to Reach Us</h2>
                <p>If you prefer, you can contact us directly through the following channels:</p>

                <div className="contact-method">
                    <img src={mail} alt="Email" className="contact-icon" />
                    <a href="mailto:contact@universaldynamics.com">contact@universaldynamics.com</a>
                </div>

                <div className="contact-method">
                    <img src={phone} alt="Phone" className="contact-icon" />
                    <p>+91 (637)967-0588</p>
                </div>

                <div className="contact-method">
                    <a href="https://www.linkedin.com/in/kishore-r1245" target="_blank" rel="noopener noreferrer">
                        <img src={linkedin} alt="LinkedIn" className="contact-icon" />
                    </a>
                    <a href="https://www.linkedin.com/in/kishore-r1245" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>

                <div className="contact-method">
                    <a href="https://github.com/cosmos1245" target="_blank" rel="noopener noreferrer">
                        <img src={github} alt="GitHub" className="contact-icon" />
                    </a>
                    <a href="https://github.com/cosmos1245" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
            </div>
        </div>
    );
};

export default ContactUs;

