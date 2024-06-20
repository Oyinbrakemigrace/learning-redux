import React from 'react'
import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className='text-center bg-gray-800 shadow-2xl bg-opacity-35 text-neutral-400 py-2 '>
      <div className='flex justify-center items-center gap-4'>
        <Link to={'/'}>About</Link>
        <Link to={'/'}>Contact</Link>
      </div>
      <p className='text-xs'>Created by Grace O</p>
    </footer>
  )
}

export default Footer