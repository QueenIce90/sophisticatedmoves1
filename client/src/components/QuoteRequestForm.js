// QuoteRequestForm.js
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import './Quote.css';  // Import the CSS file for QuoteRequestFor

function QuoteRequestForm() {
const [name, setName] = useState('');
const [phone, setPhone] = useState('');
const [email, setEmail] = useState('');
const [pickup, setPickup] = useState('');
const [dropoff, setDropoff] = useState('');
const [moveType, setMoveType] = useState('studio');
const [packingService, setPackingService] = useState(false);
const [unpackingService, setUnpackingService] = useState(false);
const [numberOfItemsToAssemble, setNumberOfItemsToAssemble] = useState(0);
const [additionalServiceOptions, setAdditionalServiceOptions] = useState([]);

const [showPopup, setShowPopup] = useState(false);

const rates = useMemo(() => ({
    'labor': 150,
    'studio+1bedroom': 600,
    '1bedroom': 800,
    '2bedroom': 1000,
    '3bedroom': 1200,
    '4bedroom': 1500,
    'office': 2000,
    'warehouse': 2500,
    'retail': 3000,
    
}), []);  



const services = useMemo(() => ({
    full_packing: 180,
    'packing' : 100,
    'unpacking' : 85, 
    'furniture_disassembly' : 130,
    'furniture_assembly' : 140,

}), []);


const packingRate = 100;
const unpackingRate = 150;
const assemblyRate = 80;


const [estimatedTotal, setEstimatedTotal] = useState(0);

const calculateEstimate = useCallback(() => {
    let total = rates[moveType] || rates['labor']; 

    if (packingService) {
    total += packingRate;
    }

    if (unpackingService) {
    total += unpackingRate;
    }

    if (additionalServiceOptions.includes('furniture_assembly_and_disassembly')) {
    total += services['furniture_assembly'] + services['furniture_disassembly'];
    }

    if (additionalServiceOptions.includes('packing')) {
    total += services['packing'];
    }

    if (additionalServiceOptions.includes('unpacking')) {
    total += services['unpacking'];
    }

    if (additionalServiceOptions.includes('full_packing')) {
    total += services['full_packing'];
    }

    if (additionalServiceOptions.includes('furniture_assembly_and_disassembly')) {
    total += services['furniture_assembly'] + services['furniture_disassembly'];
    }

    total += services['furniture_assembly'] * numberOfItemsToAssemble;


    total += assemblyRate * numberOfItemsToAssemble ;

    setEstimatedTotal(total);
}, [moveType, packingService, unpackingService, numberOfItemsToAssemble, rates,  additionalServiceOptions, services, assemblyRate]); 

useEffect(() => {
    calculateEstimate();
}, [calculateEstimate]);

const handleSubmit = async(e) => {
    e.preventDefault();

    
    console.log('Form submitted with values:', { name, phone, email, estimatedTotal });
    
    try {
        const response = await fetch('http://localhost:5000/send-quote', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name,
            phone,
            email,
            estimatedTotal,
        })
    });

        if (!response.ok) {
        throw new Error('Failed to send quote');

        }
        const data = await response.json();
        console.log(data);

        alert('Estimated Total: $' + estimatedTotal);
        setShowPopup(true);

    } catch (error) {
        console.error(error);
    }
};
    


return (
    <div className='quote-form'>
    <form onSubmit={handleSubmit} method='post'>
    <h1>Moving Quote Request</h1>
    <h2>Satisfaction Guaranteed: We Price Match for Your Peace of Mind!</h2>

      {/* Contact Information */}
    <label>
        Name:
        <input value={name} onChange={(e) => setName(e.target.value)} />
    </label>

    <label>
        Phone:
        <input value={phone} onChange={(e) => setPhone(e.target.value)} />
    </label>

    <label>
        Email:
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
    </label>

      {/* Move Details */}
    <label>
        Pickup Address:
        <input value={pickup} onChange={(e) => setPickup(e.target.value)} />
    </label>

    <label>
        Dropoff Address:
        <input value={dropoff} onChange={(e) => setDropoff(e.target.value)} />
    </label>

    <label>
        Size Option:
        <select value={moveType} onChange={(e) => setMoveType(e.target.value)}>
        <option value="'studio+1bedroom">Studio</option>
        <option value="1bedroom">1 Bedroom</option>
        <option value="2bedroom">2 Bedroom</option>
        <option value="3bedroom">3 Bedroom</option>
        <option value="4bedroom">4 Bedroom</option>
        <option value="office">Office</option>
        <option value="warehouse">Warehouse</option>
        <option value="retail">Retail</option>
        <option value="other">Other</option>
        </select>
    </label>

      {/* Additional Services */}
    <label>
        Packing Service:
        <input
        type="checkbox"
        checked={packingService}
        onChange={() => setPackingService(!packingService)}
        />
    </label>

    <label>
        Unpacking Service:
        <input
        type="checkbox"
        checked={unpackingService}
        onChange={() => setUnpackingService(!unpackingService)}
        />
    </label>

      {/* Number of Items to Assemble */}
    <label>
        Number of Items to Assemble:
        <input
        type="number"
        value={numberOfItemsToAssemble}
        onChange={(e) => setNumberOfItemsToAssemble(Number(e.target.value))}
        />
    </label>

    <label>
        Additional Services:
        <select value={additionalServiceOptions} onChange={(e) => setAdditionalServiceOptions(e.target.value)}>
        <option value='full_packing' >Full Packing</option>
        <option value='packing' >Boxing & Packing Services</option>
        <option value='unpacking' >Unpacking Services</option>
        <option value="furniture_assembly">Furniture Assembly</option>
        <option value="furniture_assembly_and_disassembly">Furniture Disassembly</option>
        </select>
    </label>
    

      {/* Estimated Total */}
    <p>Estimated total: ${estimatedTotal}</p>

    <button type="submit">Get Quote</button>

      {/* Popup */}
    {showPopup && (
        <div className="popup">
        <p>Estimated Total: ${estimatedTotal}</p>
        <button onClick={() => setShowPopup(false)}>Close</button>
        </div>
    )}

    
    </form>
    
    <h5> Labor Fees is $150 per hour</h5>
        <a href="/contact">For additional information, please contact us</a>
    
    </div>
);
}

export default QuoteRequestForm;
