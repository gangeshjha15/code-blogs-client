import React from "react";
import "./spinner.css";
import loading from "../../loading_gif.gif";

export default function Loading() {
  return (
    <div className="spinner-container">
      <div className="loading-spinner">
        <img src={loading} alt="Loading..."/>
      </div>
    </div>
  );
}