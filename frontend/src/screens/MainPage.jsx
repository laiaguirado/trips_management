import React from "react";
import { useNavigate } from "react-router-dom";
import "./MainPage.css";
import Bar from "../components/Bar";
import TripCard from "../components/TripCard";

function MainPage({ onLogout }) {
  //aqui haremos la llamada a la API para obtener tripsList
  const tripsList = [
    {
      id: 123,
      tripName: "London",
      tripImage:
        "https://cdn.londonandpartners.com/-/media/images/london/visit/things-to-do/sightseeing/london-attractions/coca-cola-london-eye/the-london-eye-2-640x360.jpg?mw=640&hash=F7D574072DAD523443450DF57E3B91530064E4EE",
    },
    {
      id: 456,
      tripName: "Paris",
      tripImage:
        "https://upload.wikimedia.org/wikipedia/commons/4/4b/La_Tour_Eiffel_vue_de_la_Tour_Saint-Jacques%2C_Paris_ao%C3%BBt_2014_%282%29.jpg",
    },
  ];
  const navigate = useNavigate();
  return (
    <div>
      <Bar />
      <button className="logout-button" onClick={onLogout}>
        Logout
      </button>
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
  );
}

export default MainPage;
