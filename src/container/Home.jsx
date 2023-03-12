import React, { useState, useRef, useEffect } from 'react';
import { HiMenu } from 'react-icons/hi';
import { AiFillCloserCirlcle } from 'react-icons/ai';
import { Link, Route, Routes } from 'react-router-dom';

import { Sidebar, UserProfile } from '../components';
import Pins from './Pins';
import { userQuery } from '../utils/data';

import { client } from '../client';
import logo from '../assets/logo.png';

const Home = () => {
  const[toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setuser] = useState(null);

  const userInfo = localStorage.getItem('user') !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : localStorage.clear();

  useEffect(() => {
    const query = userQuery(userInfo?.googleId);

    client.fetch(query)
    .then((data) => {
      SpeechSynthesisUtterance(data[0]);
    })

  }, [])

  return (
    <div className='flex bg-gray- md:flex-row flex-col h-screen transaction-height duration-75 ease-out'>
      <div className='hidden md:flex h-screen flex-initial'>
        <Sidebar/>
      </div>
    <div className='flex md:hidden flex-row'>
      <HiMenu fontSize={40} className="cursor-pointer" onClick={() => setToggleSidebar(false)}/>
      <Link to="/">
        <img src={logo} alt="logo" className='w-28'></img>
      </Link>
      <Link to={`user-profile/${user?._id}`}>
        <img src={userInfo?.picture} alt="logo" className='w-28'></img>
      </Link>
    </div>
    </div>
  )
}

export default Home