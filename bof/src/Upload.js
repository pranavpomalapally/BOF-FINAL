import React, { useState } from 'react'
import './Upload.css'
import db from './FirebaseRDB';
import storage from './FirebaseS'
import { ref, set } from "firebase/database";
import { uploadBytes, ref as sRef } from "firebase/storage";
import Select from 'react-select';

const conferences = [
  { label: 'ETH Denver 2-17-22', value: 'ETH Denver 2-17-22'},
  { label: 'World Blockchain Summit Dubai 3-23-22', value: 'World Blockchain Summit Dubai 3-23-22'},
  { label: 'Permissionless Miami 5-17-22', value: 'Permissionless Miami 5-17-22'},
];

function Upload() {
  const [images, setImages] = useState('');
  const [address, setAddress] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [description, setDescription] = useState('');
  const [conference, setConference] = useState('');
  const [price, setPrice] = useState('');
  const [max_guests, setMaxGuests] = useState('');
  const guests_confirmed = 0;

  const imagePrefix = "https://firebasestorage.googleapis.com/v0/b/bof-app-fc36e.appspot.com/o/";
  async function uploadImages(prefix) {
    let imgIndex = 0;
    const imageUrls = {};
    for (const image of images) {
        const storageRef = sRef(storage, `${prefix}/image_${imgIndex}`);

        await uploadBytes(storageRef, image).then((snapshot) => {
            console.log('Uploaded a blob or file!');
            imageUrls[`image_${imgIndex++}`] = imagePrefix + encodeURIComponent(snapshot.metadata.fullPath) + "?alt=media";
        });
    }
    return imageUrls;
  }

  async function uploadHouse() {
    const path = `conferences/${conference.label}/${address}`;
    const imagesUploaded = await uploadImages(path);
    const listing = {
      images: imagesUploaded,
      address,
      description,
      conference: conference.label,
      contact_name: name,
      contact_phone: phone,
      price,
      max_guests,
      guests_confirmed
    };

    set(ref(db, path), listing);
  }

  return (
  <div className='home'>
    <div className ="selectDropdown">
      <label></label>
      <Select onChange={setConference} options={conferences} />
    </div>
    <div className = "propTitle">
      <center><h3>Property Info:</h3></center>
    <div className ='inputElems'>
      <label htmlFor='address'></label>
      <input
        name='address'
        placeholder='Address'
        value = {address}
        onChange={(e) => {setAddress(e.target.value)}}
      />
    </div>

    <div className='inputElems'>
      <label htmlFor='description'></label>
      <input
        name='description'
        placeholder='Description'
        value={description}
        onChange={(e) => {setDescription(e.target.value)}} /></div>



    <div className='inputElems'>
      <label htmlFor='max_guests'></label>
      <input
        name='max_guests'
        placeholder='MaxGuests'
        value={max_guests}
        onChange={(e) => {setMaxGuests(e.target.value)}}
      />
    </div>

    <div className='inputElems'>
      <label htmlFor='name'></label>
      <input
        name='price'
        placeholder='$ per Person per Night'
        value={price}
        onChange={(e) => {setPrice(e.target.value)}}
      />
    </div>


    </div>
    <div className='propTitle'>
      <center><h3>Contact Info:</h3></center>
      </div>
    <div className='underElems'>
      <label htmlFor='name'></label>
      <input
        name='name'
        placeholder='Name'
        value={name}
        onChange={(e) => {setName(e.target.value)}}
      />
    </div>
    <div className='underElems'>
      <label htmlFor='phoneNo'></label>
      <input
        name='phoneNo'
        placeholder='Phone No'
        value={phone}
        onChange={(e) => {setPhone(e.target.value)}}
      />
    </div>

    <div className='choosePic'>
      <input multiple type="file" onChange={(e) => setImages(e.target.files)}/>
    </div>
    <div className='uploadList'>
      <button onClick={uploadHouse}>Upload</button>
    </div>
    </div>
  );
}

export default Upload