import React, { useEffect } from 'react';
import './ContactForm.css'; // Import your CSS file
import NavBar from './Navbar';


function ContactForm() {
const scriptURL = 
    'https://script.google.com/macros/s/AKfycbyJIc_yrP1HJU7P7R2th_nfn4Hq0upBRgCAtbwNs31Bf3-g2vJVV3nNE4Fq_lsUTf8D/exec';

useEffect(() => {
    const form = document.forms['submit-to-google-sheet'];
    const msg = document.getElementById('msg');
    const handleSubmit = (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
        .then((response) => {
        msg.innerHTML = 'Message sent successfully';
        setTimeout(() => {
            msg.innerHTML = '';
        }, 5000);
        form.reset();
        })
        .catch((error) => console.error('Error!', error.message));
    };

    form.addEventListener('submit', handleSubmit);

    return () => {
    form.removeEventListener('submit', handleSubmit);
    };
}, [scriptURL]);

const imagePath = process.env.PUBLIC_URL + '/logo.png';
return (
    <>
    <NavBar />

    <div className="contact">
        <div className="container">
    
        <div className="row">
            <div className="contact-left">
            </div>

            
<img className="logo1" src={imagePath} alt="logo" />


            
            <h2 className="contact-title">Move with Elegance <br/> Choose Sophisticated Moves <br/> Where Every Move is a Masterpiece!</h2>
            <h5>Get in touch, we'd love to hear from you</h5>

            

            <div className="contact-right">
            <form name="submit-to-google-sheet">
                <input
                type="text"
                name="Name"
                placeholder="Enter Your Name"
                required
                />
                <input
                type="email"
                name="Email"
                placeholder="Enter Your Email"
                required
                />
                <textarea
                name="Message"
                rows="6"
                placeholder="Enter Your Message"
                required
                ></textarea>
                <button  className="btn-btn2" type="submit">Submit</button>
                <span id="msg"></span>
            </form>
            
            <div className  ="contact-us">
            <h2>Contact Us</h2>

            <span class="material-symbols-outlined">
            location_city
            </span> <span>New York - Tri-State Area</span>
            <div className="contact-info">
                <div className="contact-icon">
                <span class="material-symbols-outlined">
                phone_iphone
        </span>               
        <span>(347)916-5420</span>
                </div>    
                <div className="contact-icon">
                <span class="material-symbols-outlined">
                mail
                </span>
                    <span>Sophisticatedelitemoves@gmail.com</span>

                    </div>
                </div>
              
                </div>
            </div>
        </div>
        </div>
    </div>
    </>
);
}

export default ContactForm;
