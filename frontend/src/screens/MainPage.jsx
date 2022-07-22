import React from 'react'
import { useNavigate } from "react-router-dom";
import Bar from '../components/Bar'

function MainPage() {
    const trip = {
        id: "1234"
    }
    const navigate = useNavigate();
    return (
        <div>
            <Bar />
            <div>
                <h3>Main Page</h3>
                <div>
                    <button className='button' onClick={() => navigate(`/trip/${trip.id}`, { replace: false })}>Trip Name 1</button>
                    <button className='button' onClick={() => navigate(`/trip/${trip.id}`, { replace: false })}>Trip Name 2</button>
                </div>
            </div>
        </div>
    )
}

export default MainPage