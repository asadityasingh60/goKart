import React from "react";
import playStore from "../../../images/playstore.png";
import appStore from "../../../images/Appstore.png";
import "./Footer.css";

export default function Footer(){
    const date = new Date().getFullYear();
  return (
    <footer id="footer">
      <div className="leftFooter">
            <h4>Download Our App</h4>
            <p>Download our App for Android and IOS Mobile Phone</p>
            <img src={playStore} alt="AppStore"/>
            <img src={appStore} alt="PlayStore"/>
      </div>

      <div className="midFooter">
            <h1>goKart Services</h1>
            <p>Delivering Trust on Products Behalf</p>
            <p>Copyright {date} &copy; Aditya Narayan Singh</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
            <a href="https://www.instagram.com/adityasingh60/">Instagram</a>
            <a href="https://github.com/asadityasingh60">GitHub</a>
            <a href="https://www.facebook.com/profile.php?id=100003019855341">Facebook</a>
      </div>
    </footer>
  );
};

