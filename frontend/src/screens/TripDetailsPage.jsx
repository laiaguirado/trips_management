import React from 'react'
import { useNavigate } from "react-router-dom";
import Bar from '../components/Bar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBed, faPlane, faCamera, faUtensils, faTrashCan } from '@fortawesome/free-solid-svg-icons'

function TripDetailsPage() {
  const trip = {
    id: "1234"
  }
  const navigate = useNavigate();
  return (
    <div>
      <Bar />
      <h3>TripDetailsPage</h3>
      <button onClick={() => navigate(`/`, { replace: false })}>Main Page</button>
      <button onClick={() => navigate(`/trip/${trip.id}/accomodation`, { replace: false })}> <FontAwesomeIcon icon={faBed}/> Accomodation</button>
      <button onClick={() => navigate(`/trip/${trip.id}/transportation`, { replace: false })}> <FontAwesomeIcon icon={faPlane}/> Transportation</button>
      <button onClick={() => navigate(`/trip/${trip.id}/thingsToDo`, { replace: false })}> <FontAwesomeIcon icon={faCamera}/> Things To Do</button>
      <button onClick={() => navigate(`/trip/${trip.id}/placesToEat`, { replace: false })}> <FontAwesomeIcon icon={faUtensils}/> Places To Eat</button>
      <button className='delete-trip'><FontAwesomeIcon icon={faTrashCan}/> DELETE TRIP</button>
    </div>
  )
}

export default TripDetailsPage