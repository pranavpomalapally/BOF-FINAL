import React from 'react'
import './Header.css'
import { Link } from "react-router-dom";

import logo from '/Users/pranavpomalapally/BOF-FINAL/bof/src/bof.png'

import Button from 'react-bootstrap/Button';



function Header() {

  return (
    <div className='header'>
      <Link to="/">
          <img
              className="header_icon"
              src={logo}
              alt="logo"
          />
        </Link>
        <div className='header_center'>``
          
        </div>

        <div className='header_right'>
          <Link to="/upload">
              <Button variant='primary' size='sm'>
                Upload listing!
              </Button>
          </Link>
        </div>
    </div>
  )
}

export default Header