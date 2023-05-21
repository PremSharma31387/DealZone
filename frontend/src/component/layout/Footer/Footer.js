import React from "react";
import Playstore from "../../../images/Playstore.png";
import Applestore from "../../../images/Applestore.png";
import "./Footer.css";

const Footer = () => {
  return (
    <footer id="footer">
      <div className="leftFooter">
        <h4>DOWNLOAD OUR APP</h4>
        <p>Download App for Android and IOS mobile phone</p>
        <img src={Playstore} alt="playstore" />
        <img src={Applestore} alt="Appstore" />
      </div>

      <div className="midFooter">
        <h1>DealZone.</h1>
        <p>High Quality is our first priority</p>

        <p>Copyrights 2021 &copy; PremSharma</p>
      </div>

      <div className="rightFooter">
        <h4>Follow Us</h4>
        <a href="http://instagram.com/prem_sharma723">Instagram</a>
        <a href="http://youtube.com/6packprogramemr">Youtube</a>
        <a href="http://instagram.com/meabhisingh">Facebook</a>
      </div>
    </footer>
  );
};

export default Footer;