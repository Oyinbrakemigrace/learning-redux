import React from 'react'
import { useSelector } from 'react-redux';

function Card({data}) {
    //console.log('data', data);
    const imageUrl = useSelector((state) => state.gboxData.imageUrl);
  return (
    <div className='max-w-[230px] w-full h-80 overflow-hidden rounded'>
        <img src={imageUrl+data.poster_path} alt="posterImage" />
    </div>
  )
}

export default Card