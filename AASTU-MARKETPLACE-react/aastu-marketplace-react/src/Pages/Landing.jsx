
import React from "react";
import "../CSS/Landing.css";
import { Link } from "react-router-dom";
const Landing = () =>{
    return (
        <div className="body">
<div>
    <meta charset="UTF-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>AASTU E-commerce Platform</title>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&family=Montserrat:wght@700;800&display=swap" rel="stylesheet"/>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"/>
    
</div>


            <header>
                <div className="l-container">
                    <div className="l-top-bar">
                        <a href="#" className="l-logo">AASTU<span>Market</span></a>
                        <div className="l-auth-links">
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    </div>
                </div>
            </header>

            <section className="l-welcome-banner">
                <div className="l-container">
                    <h1>Welcome to AASTU E-commerce Platform</h1>
                    <p>A project proudly developed by passionate third-year students of Section B, Group 1 at Addis Ababa Science and Technology University</p>
                </div>
            </section>

            <section className="l-hero">
                <div className="l-container">
                    <div className="l-hero-content">
                        <div className="l-hero-text">
                            <h2>Your Campus Marketplace</h2>
                            <p>Welcome to the AASTU E-commerce Platform, a project proudly developed by passionate third-year students of Section B, Group 1 at Addis Ababa Science and Technology University (AASTU). Our team is dedicated to providing a tailored solution that connects students within the AASTU community, making buying and selling products easier than ever.</p>
                            <p>Our platform is designed specifically for AASTU students to foster a thriving marketplace within the campus. Sellers can conveniently upload and showcase their products, while buyers can effortlessly browse, explore, and purchase items they need.</p>
                        </div>
                        <div className="l-hero-image">
                            <div className="l-product-collage">
                                <div className="l-product-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80')" }}></div>
                                <div className="l-product-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80')" }}></div>
                                <div className="l-product-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80')" }}></div>
                                <div className="l-product-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1585386959984-a4155224a1ad?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80')" }}></div>
                                <div className="l-product-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1542291026-7eec264c27ff?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80')" }}></div>
                                <div className="l-product-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80')" }}></div>
                                <div className="l-product-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1572635196237-14b3f281503f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80')" }}></div>
                                <div className="l-product-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80')" }}></div>
                                <div className="l-product-item" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80')" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="l-stats">
                <div className="l-container">
                    <h2>Our Platform in Numbers</h2>
                    <div className="l-stats-grid">
                        <div className="l-stat-item">
                            <div className="l-stat-number">1M+</div>
                            <div className="l-stat-label">Products Available</div>
                        </div>
                        <div className="l-stat-item">
                            <div className="l-stat-number">10.5K</div>
                            <div className="l-stat-label">Active Sellers</div>
                        </div>
                        <div className="l-stat-item">
                            <div className="l-stat-number">300+</div>
                            <div className="l-stat-label">Trusted Brands</div>
                        </div>
                        <div className="l-stat-item">
                            <div className="l-stat-number">3M</div>
                            <div className="l-stat-label">Happy Customers</div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="l-hero">
                <div className="l-container">
                    <div className="l-hero-content">
                        <div className="l-hero-image">
                            <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" alt="Team working together" />
                        </div>
                        <div className="l-hero-text">
                            <h2>Our Mission</h2>
                            <p>By focusing exclusively on AASTU, we aim to create a secure, supportive, and user-friendly environment where students can engage in hassle-free transactions.</p>
                            <p>Driven by innovation and a commitment to solving real-world problems, this project represents not only our technical skills but also our vision to make life easier for our peers. Thank you for supporting our initiative, and we look forward to seeing the AASTU community grow stronger through this platform.</p>
                        </div>
                    </div>
                </div>
            </section>

            <section className="l-cta">
                <div className="l-container">
                    <h2>Ready to Join Our Marketplace?</h2>
                    <p>Whether you're looking to buy or sell, our platform makes it easy for AASTU students to connect and do business.</p>
                    <Link to="/signup">Get Started Now</Link>
                </div>
            </section>

            <div className="l-footer">
                <div className="l-container">
                    <div className="l-footer-content">
                        <div className="l-footer-column">
                            <h3>AASTUMarket</h3>
                            <p>The premier e-commerce platform for AASTU students, by AASTU students.</p>
                            <div className="l-social-links">
                               <Link to="#"><i className="l-fab fa-facebook-f"></i></Link>
                                <Link to="#"><i className="l-fab fa-twitter"></i></Link>
                                <Link to="#"><i className="l-fab fa-instagram"></i></Link>
                                <Link to="#"><i className="l-fab fa-linkedin-in"></i></Link>
                            </div>
                        </div>
                        <div className="l-footer-column">
                            <h3>Quick Links</h3>
                            <ul>
                                <li><Link to="homebuyer">Home</Link></li>
                                <li><Link to="/about">Contact Us</Link></li>
                                <li><Link to="#">Products</Link></li>
                                <li><Link to="#">Sell on AASTUMarket</Link></li>
                            </ul>
                        </div>
                        <div className="l-footer-column">
                            <h3>Help</h3>
                            <ul>
                                <li><Link to="#">FAQs</Link></li>
                                <li><Link to="#">Shipping</Link></li>
                                <li><Link to="#">Returns</Link></li>
                                <li><Link to="/contacus">Contact Us</Link></li>
                            </ul>
                        </div>
                        <div className="l-footer-column">
                            <h3>Legal</h3>
                            <ul>
                                <li><Link to="#">Terms of Service</Link></li>
                                <li><Link to="#">Privacy Policy</Link></li>
                                <li><Link to="#">Cookie Policy</Link></li>
                            </ul>
                        </div>
                    </div>
                    <div className="l-copyright">
                        &copy; 2023 AASTU E-commerce Platform. All rights reserved. Developed by Section B, Group 1.
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Landing;