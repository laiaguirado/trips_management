import React from 'react'
import { useNavigate } from "react-router-dom";
import "./MainPage.css"
import Bar from '../components/Bar'
import TripCard from "../components/TripCard"

function MainPage() {
    //aqui haremos la llamada a la API para obtener tripsList
    const tripsList = [
        {id: 123,
         tripName:"London"},
        {id:456,
        tripName:"Paris"}
    ]
    const navigate = useNavigate();
    return (
        <div>
            <Bar />
            <div>
                <h3>Main Page</h3>
                <div>
                    {tripsList.map((trip) => (
                        <TripCard
                            key={trip.id}
                            trip={trip}
                            onClick={() => navigate(`/trip/${trip.id}`, { replace: false })}
                        />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MainPage