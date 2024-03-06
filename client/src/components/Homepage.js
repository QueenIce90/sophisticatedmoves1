// HomePage.js

import React from 'react';
import './Homepage.css';
import NavBar from './Navbar';

function HomePage() {
    
return (
    <>
    <NavBar />

    <div className="home-page">
        <section className="intro-section">
        <div className="intro-content">
            

            {/* Add any introductory content here */}
        </div>
        </section>
        {/* <img src={process.env.PUBLIC_URL + '/images/myimage.jpg'} alt="My Image" /> */}
        <div className="moving-truck-container-home">
        <img src='/1.jpg' alt="Moving Truck 1" />
        <img src='/3.jpg' alt="Moving Truck 2" />
        <img src='/2.jpg' alt="Moving Truck 3" />
        <img src='/4.png' alt="Moving Truck 4" />
        <img src='/5.png' alt="Moving Truck 5" />
        <img src='/6.png' alt="Moving Truck 6" /> 
        </div>
    </div>
    <div className='copyright'>
            <p>Copyright © 2023. All rights reserved. Sophisticated Moves</p>
        </div>
    </>
);
}

export default HomePage;
