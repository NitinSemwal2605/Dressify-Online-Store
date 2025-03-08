import React from "react";
import "./TruckLoader.css"; // Import the CSS file

const TruckLoader = () => {
  return (
    <div className="loader">
      <div className="truckWrapper">
        <div className="truckBody">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 198 93"
            className="trucksvg"
          >
            <path
              strokeWidth="3"
              stroke="#282828"
              fill="#F83D3D"
              d="M135 22.5H177.264C178.295 22.5 179.22 23.133 179.594 24.0939L192.33 56.8443C192.442 57.1332 192.5 57.4404 192.5 57.7504V89C192.5 90.3807 191.381 91.5 190 91.5H135C133.619 91.5 132.5 90.3807 132.5 89V25C132.5 23.6193 133.619 22.5 135 22.5Z"
            ></path>
            <path
              strokeWidth="3"
              stroke="#282828"
              fill="#7D7C7C"
              d="M146 33.5H181.741C182.779 33.5 183.709 34.1415 184.078 35.112L190.538 52.112C191.16 53.748 189.951 55.5 188.201 55.5H146C144.619 55.5 143.5 54.3807 143.5 53V36C143.5 34.6193 144.619 33.5 146 33.5Z"
            ></path>
            <circle cx="146.5" cy="65" r="4" fill="#282828" strokeWidth="2"></circle>
            <rect
              strokeWidth="2"
              stroke="#282828"
              fill="#FFFCAB"
              rx="1"
              height="7"
              width="5"
              y="63"
              x="187"
            ></rect>
            <rect
              strokeWidth="2"
              stroke="#282828"
              fill="#282828"
              rx="1"
              height="11"
              width="4"
              y="81"
              x="193"
            ></rect>
            <rect
              strokeWidth="3"
              stroke="#282828"
              fill="#DFDFDF"
              rx="2.5"
              height="90"
              width="121"
              y="1.5"
              x="6.5"
            ></rect>
          </svg>
        </div>
        <div className="truckTires">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
            <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
          </svg>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 30 30" className="tiresvg">
            <circle strokeWidth="3" stroke="#282828" fill="#282828" r="13.5" cy="15" cx="15"></circle>
            <circle fill="#DFDFDF" r="7" cy="15" cx="15"></circle>
          </svg>
        </div>
        <div className="road"></div>
      </div>
    </div>
  );
};

export default TruckLoader;
