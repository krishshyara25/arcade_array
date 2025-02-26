import React, { useState, useEffect } from "react";
import '../styles/WelcomeVideo.css'
const WelcomeVideo = ({ onFinish }) => {
  const [showVideo, setShowVideo] = useState(false);

  

  const handleVideoEnd = () => {
    setShowVideo(false);
    onFinish();
  };

  return (
    showVideo && (
      <div className="welcome-video-container">
        <video 
          src={"https://res.cloudinary.com/drno4r3vd/video/upload/v1740548987/logoloader_dralxf.mp4"} 
          autoPlay 
          muted 
          className="welcome-video"
          onEnded={handleVideoEnd} // Hides video when it ends
        />
        <button className="skip-button" onClick={handleVideoEnd}>
          Skip
        </button>
      </div>
    )
  );
};

export default WelcomeVideo;
