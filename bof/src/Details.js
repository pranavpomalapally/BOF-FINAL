import React, {useEffect, useState} from 'react'
import { Link, useParams } from "react-router-dom";
import db from './FirebaseRDB';
import { ref, child, set, get } from "firebase/database";
import './Details.css'


function Details() {
  const params = useParams();
  const [listing, setListing] = useState({});
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [payment, setPayment] = useState('');


  useEffect(() => {
    async function fetchData() {
      const firebaseListing = await get(child(ref(db), `conferences/${params.conf}/${params.address}`));
      console.log(`conferences/${params.conf}/${params.address}`);
      console.log(firebaseListing.val());
      setListing(firebaseListing.val());
    }
    fetchData();
  });

  async function reserveProperty() {
    const path = `conferences/${params.conf}/${params.address}`;
    const guest_path = `conferences/${params.conf}/${params.address}/guests/${phone}`;
    const confirmed_guest = {
      guest_name: name,
      guest_phone: phone,
      payment
    };
    if (listing.guests_confirmed < listing.max_guests) {
      listing.guests_confirmed++;
      set(ref(db, path), listing);
      set(ref(db, guest_path), confirmed_guest);
    } 

    
  }

  console.log(listing);
  if (!listing || Object.keys(listing).length == 0) 
    return (<div />);

  return (
    <div className="details">
      <div className="info">
        <h1>{listing && listing.address}</h1>
        <h3>${listing && listing.price}/person</h3>
        <h3>Confirmed Guests:{listing && listing.guests_confirmed}</h3>
        <h3>Max Guests:{listing && listing.max_guests}</h3>
      </div>
      
      <div class = "grid" className='images'>
      {
        Object.keys(listing.images).map((imgKey) => (
            <img src={listing.images[imgKey]} width="90%" height="90%"/>
        ))
      }
      </div>

      <div className="info_desc">
        <p>{listing && listing.description}</p>
      </div>


      <div className='reserve'>
        Reserve this propery!
        <div>
          <label htmlFor='Name'>Name</label>
          <input
            name='name'
            placeholder='Name'
            value = {name}
            onChange={(e) => {setName(e.target.value)}}
          />
        </div>

        <div>
          <label htmlFor='Phone'>Phone</label>
          <input
            name='phone'
            placeholder='Phone'
            value = {phone}
            onChange={(e) => {setPhone(e.target.value)}}
          />
        </div>

        <div>
          <label htmlFor='Payment'>Payment</label>
          <input
            name='paymeny'
            placeholder='Payment'
            value = {payment}
            onChange={(e) => {setPayment(e.target.value)}}
          />
        </div>

        <button onClick={reserveProperty}>Confirm!
        </button>
      </div>

    </div>
  )
}

export default Details