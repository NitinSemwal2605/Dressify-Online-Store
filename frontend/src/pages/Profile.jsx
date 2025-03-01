import React from "react";

const Profile = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🚧 Sorry, this page is under construction! 🚧</h1>
      <p style={styles.text}>We're working hard to bring this feature to you soon. Stay tuned! 😊</p>

      {/* Display Video */}
      <video autoPlay loop muted style={styles.video}>
        <source
          src="https://videos.pexels.com/video-files/2985409/2985409-uhd_2560_1440_24fps.mp4"
          type="video/mp4"
        />
        Your browser does not support the video tag.
      </video>
    </div>
  );
};

// Inline CSS Styles
const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f8f9fa",
    textAlign: "center",
  },
  title: {
    fontSize: "24px",
    color: "#ff5733",
    fontWeight: "bold",
  },
  text: {
    fontSize: "18px",
    color: "#333",
  },
  video: {
    width: "80%", // Adjust size as needed
    maxWidth: "600px",
    marginTop: "20px",
    borderRadius: "10px",
  },
};

export default Profile;
