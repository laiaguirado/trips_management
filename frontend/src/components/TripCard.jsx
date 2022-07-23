import React from 'react'
import './TripCard.css'

function TripCard({trip, onClick}) {
  return (
    <div className='trip-card' onClick={onClick}>
        <div>{trip.id}</div>
        <div>{trip.tripName}</div>
    </div>
  )
}

export default TripCard