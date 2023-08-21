import React from "react";
import "../styles/homePage.css";
import { Link, useNavigate } from "react-router-dom";

export const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="homePage">
      <div className="womanCover" onClick={() => navigate("/women")}>
        <div className="linkDiv1">
          <Link to="/women" className="homePageLink">
            WOMAN
          </Link>
        </div>
      </div>
      <div className="manCover" onClick={() => navigate("/men")}>
        <div className="linkDiv2">
          <Link to="/men" className="homePageLink">
            MAN
          </Link>
        </div>
      </div>
    </div>
  );
};
