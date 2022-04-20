import React from "react";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

const Videos = () => {
  return (
    <div>
      <Navbar />

      <h1>Motivational Videos</h1>
      <div>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/RvW3mIDNY6o"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ margin: "30px" }}
        ></iframe>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/TFO9hBtLVec"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ margin: "30px" }}
        ></iframe>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/IHwqhSLE9Gc"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ margin: "30px" }}
        ></iframe>
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/Z63w5PefxTQ"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          style={{ margin: "30px" }}
        ></iframe>
      </div>
    </div>
  );
};
export default Videos;
