import React from 'react'
import { useParams } from 'react-router-dom'
import useFetchDetails from '../hooks/useFetchDetails';

function Details() {
  const params = useParams()
  const { data } = useFetchDetails(`/${params?.explore}/${params?.id}`);
console.log('data', data);





  return (
    <div>Details</div>
  )
}

export default Details