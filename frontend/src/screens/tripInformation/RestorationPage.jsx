import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../../api";
import "./RestorationPage.css";
import Bar from "../../components/Bar";
import RestorationCard from "../../components/tripInformation/Restoration/RestorationCard";
import AddRestorationCard from "../../components/tripInformation/Restoration/AddRestorationCard";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faPlus, faAngleLeft } from "@fortawesome/free-solid-svg-icons";

function RestorationPage() {
  const [restorationList, setRestorationList] = useState([]);
  const [adding, setAdding] = useState(false);
  const [message, setMessage] = useState(null);
  const { tripId } = useParams();

  const loadRestorationList = async () => {
    const { success, restorationList, error } = await api.getRestorationList(
      tripId
    );
    if (success) {
      setRestorationList(restorationList);
      setMessage(null);
    } else {
      setRestorationList([]);
      setMessage(error);
    }
  };

  const addRestoration = async (tripId, newRestorationData) => {
    const { success, added, error } = await api.addRestoration(
      tripId,
      newRestorationData
    );
    if (success) {
      setRestorationList((restorationList) => [...restorationList, added]);
      setAdding(false);
      setMessage(null);
    } else {
      setMessage(error);
    }
  };

  function addRestorationForm() {
    if (adding === false) {
      return (
        <div className="add-restoration-button" onClick={() => setAdding(true)}>
          <FontAwesomeIcon icon={faPlus} />
        </div>
      );
    } else {
      return (
        <AddRestorationCard
          onAdd={addRestoration}
          adding={() => {
            setAdding(false);
            setMessage(null);
          }}
          tripId={tripId}
        />
      );
    }
  }

  useEffect(() => {
    loadRestorationList();
  }, []);

  return (
    <div className="restoration-page">
      <Bar mode="login" />
      <div className="flex-container">
        <div className="return-icon" onClick={() => window.history.go(-1)}>
          <FontAwesomeIcon icon={faAngleLeft} size="3x" />{" "}
        </div>
        <div>{message}</div>
        <div>
          <h1>RESTORATIONS</h1>
          <div>{addRestorationForm()}</div>
          <div className="restoration-list">
            {restorationList.map((restoration) => (
              <RestorationCard
                key={restoration._id}
                restoration={restoration}
                modifyRestorationList={setRestorationList}
              />
            ))}
          </div>
        </div>
      </div>
      <button onClick={() => editPage()}>Edit</button>
    </div>
  );
}

export default RestorationPage;
