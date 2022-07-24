import React from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../components/Bar";

function TransportationPage() {
  return (
    <div>
      <Bar />
      <div> TransportationPage</div>
      <button onClick={() => window.history.go(-1)}>Go back</button>
    </div>
  );
}

export default TransportationPage;
