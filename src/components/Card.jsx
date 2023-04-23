import React, { useState, useEffect } from "react";

import ic_sun from "../assets/images/ic_sun.png";
import ic_rain from "../assets/images/ic_rain.png";

const Card = ({ date }) => {
  // rainy 06 - 11
  // dry 12 - 05

  const [season, setSeason] = useState("Dry");

  useEffect(() => {
    const month = date.split("-")[1];
    if (parseInt(month) >= 6 && parseInt(month) <= 11) {
      setSeason("Wet");
    }
  }, []);

  return (
    <>
      <div
        className={`flex items-center bg-white rounded-lg shadow-lg p-5 border-t-4 border-blue-500`}
      >
        {season == "Dry" ? (
          <img src={ic_sun} width={64} height={64} alt="" className="mr-2" />
        ) : (
          <img src={ic_rain} width={64} height={64} alt="" className="mr-2" />
        )}
        <div>
          <p className="text-gray-600 font-bold">Season: {season}</p>
        </div>
      </div>
    </>
  );
};

export default Card;
