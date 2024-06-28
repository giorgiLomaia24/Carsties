

import React from 'react'
import Search from './Search';
import Logo from './Logo';
import LoginButton from './LoginButton';
import { getCurrentUser } from '../actions/AuthActions';
import UserActions from './UserActions';

export default async function Navbar() {
  const user = await getCurrentUser();

  return (
    <header className='sticky top-0 left-0 z-50 flex justify-between bg-black p-5 items-center text-gray-800 shadow-md'>
      <Logo />
      <div className="hidden md:flex w-[50%] items-center border-2 rounded-full py-2 shadow-sm bg-white'">
      <Search />
      </div>
      {user ? (<UserActions user={user}/>) : ( <LoginButton/>)}
    
    </header>
  )
}

