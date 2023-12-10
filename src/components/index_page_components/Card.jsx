import React from 'react'
import image from '../../assets/test.jpg'
import { AiOutlineStar as Star, AiFillStar as FilledStar } from 'react-icons/ai'

function Card() {
  return (
    <div className='boxes'>
      <img src={image} width={200} height={150} alt='Attack On Titan' />
      <h5 className='text-primary m-0 p-0'>Attack On Titan</h5>
      <p className='text-secondary m-0 p-0'>Samian Lashari</p>
      <Star />
      <Star />
      <Star />
      <Star />
      <Star />
    </div>
  )
}

export default Card
