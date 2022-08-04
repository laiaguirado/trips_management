import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../../api";
import "./TransportationPage.css";
import Bar from "../../components/Bar";
import TransportationCard from "../../components/tripInformation/Transportation/TransportationCard";

function TransportationPage() {
  const [transportationList, setTransportationList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();

  const loadTransportationList = async () => {
    const { success, transportationList, error } =
      await api.getTransportationList(tripId);
    if (success) {
      setTransportationList(transportationList);
      setMessage(null);
    } else {
      setTransportationList([]);
      setMessage(error);
    }
  };

  const addTransportation = async (tripId, newTransportationData) => {
    /*const { success, added, error } = await api.addAccommodation(
      tripId,
      newAccommodationData
    );
    if (success) {
      setAccommodationList((accommodationList) => [
        ...accommodationList,
        added,
      ]);
      setAdding(false);
      setMessage(null);
    } else {
      setMessage(error);
    }*/
  };

  function addTransportationForm() {
    /*if (adding === false) {
      return (
        <div
          className="add-accommodation-button"
          onClick={() => setAdding(true)}
        >
          <FontAwesomeIcon icon={faPlus} />
        </div>
      );
    } else {
      return (
        <AddAccommodationCard
          onAdd={addAccommodation}
          adding={() => {
            setAdding(false);
            setMessage(null);
          }}
          tripId={tripId}
        />
      );
    }*/
  }

  useEffect(() => {
    loadTransportationList();
  }, []);

  return (
    <div className="transportation-page">
      <Bar mode="login" />
      <div className="flex-container">
        <div>{message}</div>
        <div>
          <h1>TRANSPORTATIONS</h1>
          <div>{addTransportationForm()}</div>
          <div className="transportation-list">
            {transportationList.map((transportation) => (
              <TransportationCard
                key={transportation._id}
                transportation={transportation}
                transportationList={setTransportationList}
              />
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => window.history.go(-1)}>Go back</button>
      <button onClick={() => editPage()}>Edit</button>
    </div>
  );
}

export default TransportationPage;
