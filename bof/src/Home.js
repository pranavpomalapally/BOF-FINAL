import React, {useState} from 'react'
import './Home.css'
import db from './FirebaseRDB';
import { ref, child, get } from "firebase/database";
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';


const conferences = [
  { label: 'ETH Denver 2-17-22', value: 'ETH Denver 2-17-22'},
  { label: 'World Blockchain Summit Dubai 3-23-22', value: 'World Blockchain Summit Dubai 3-23-22'},
  { label: 'Permissionless Miami 5-17-22', value: 'Permissionless Miami 5-17-22'},
];

function Home() {
  const [conf, setConf] = useState('');
  const [listings, setListings] = useState([]);
  const navigate = useNavigate();


  async function updateListings(e) {
    await setConf(e.label);
    console.log(e.label);
    const test = await get(child(ref(db), `conferences/${e.label}`));
    console.log(`conferences/${e.label}`);
    console.log(test);
    setListings(test.val());
  }

  function goToListing(listing) {
    navigate(`/listing/${listing.conference}/${listing.address}`);
  }

  return (
    <div className='home'>
      <div className='text_bar'>
        <center><h1>Birds of a Feather</h1></center>
      </div>

      <div className='desc'>
        <center><h3>Book Your Stay Today</h3></center>
      </div>

      <div className='search_bar' style={{ backgroundImage: "url(${bgp})" }}>
        <Select options={conferences} onChange={updateListings}/>
      </div>

      <div class = "grid" className='listings'>
      {
        Object.keys(listings).map((key) => (
          <div class = "card" onClick={() => goToListing(listings[key])}>
            <img src={listings[key].images[Object.keys(listings[key].images)[0]]} width="80%" height="50%"/>
            <div class="container">
              <h4><b>{listings[key].address}</b></h4>
              <h4><b>${listings[key].price}</b></h4>
              <h4><b>{listings[key].guests_confirmed}/{listings[key].max_guests} Confirmed</b></h4>
              <p className="pDesc">{listings[key].description}</p>
            </div>
          </div>
        ))
      }

      </div>
    </div>
  )
}

export default Home