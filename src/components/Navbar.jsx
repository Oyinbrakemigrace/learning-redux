import React from 'react'
import { HiShoppingBag } from "react-icons/hi2";
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className='bg-red-300 w-full h-16 flex justify-between items-center px-6'>
      <Link to='/' className='font-bold text-3xl'>Online  Shop</Link>
      <Link to='/cart' className='flex items-center'>
        <HiShoppingBag size={30} />
        <span className='bg-black flex justify-center items-center text-white font-bold h-6 w-6 text-sm rounded-full'>
          <span>3</span>
        </span>
      </Link>
    </div>
  )
}

export default Navbar