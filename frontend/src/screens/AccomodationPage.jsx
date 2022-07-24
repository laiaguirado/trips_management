import React from "react";
import { useNavigate } from "react-router-dom";
import Bar from "../components/Bar";

function AccomodationPage() {
  return (
    <div>
      <Bar />
      <div> AccomodationPage</div>
      <button onClick={() => window.history.go(-1)}>Go back</button>
    </div>
  );
}

export default AccomodationPage;
