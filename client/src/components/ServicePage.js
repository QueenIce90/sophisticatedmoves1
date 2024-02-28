// ServicePage.js
import React from 'react';
import './ServicePage.css';
import NavBar from './Navbar';


function ServicePage() {
return (
    <>
    <NavBar />
    <div className="service-page">


    <div className='image'>
        <img src={process.env.PUBLIC_URL + "/5.png"} alt="moving truck" />  
    </div>

    <div className="service-list">
        <div className="service-item"> 
        <span class="material-symbols-outlined">local_shipping</span>

        <h3>Local Moves</h3>
        <p>Efficient and reliable local moving services for a stress-free experience.</p>
        </div>


        <div className="service-item">
        <span class="material-symbols-outlined"> distance</span>
        <h3>Long-Distance Moves</h3>
        <p>Relocate with ease across long distances with our experienced movers.</p>
        </div>


        <div className="service-item">
        <span class="material-symbols-outlined">package_2</span>
        <span class="material-symbols-outlined">orders</span>
        <h3>Packing and Unpacking</h3>
        <p>Let our professionals handle the packing and unpacking, ensuring the safety of your belongings.</p>
        </div>


        <div className="service-item">
        <span class="material-symbols-outlined">chair</span>
        <span class="material-symbols-outlined">king_bed</span>
        
        <h3>Furniture Assembly/Disassembly</h3>
        <p>We take care of assembling and disassembling furniture during the moving process.</p>
        </div>

        {/* Add more services as needed */}
    </div>
    </div>
    </>
);
};

export default ServicePage;
