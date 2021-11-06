import React from "react";
import { NavLink } from "react-router-dom";
import { ReactComponent as Logo } from "../assets/logo.svg";
import styles from "./Footer.module.css";
import instagram from "../assets/social/instagram.png"
import facebook from "../assets/social/facebook.png"
import twitter from "../assets/social/twitter.png"
import linkedin from "../assets/social/linkedin.png"

const Footer = () => {
  const date = new Date();

  return (
    <div className={styles.wrapper}>
      <div className={`${styles.container} container`}>
        <Logo></Logo>
        <div className={styles.social}>
          <ul>
            <li><a href="https://www.instagram.com/convergencefood"><img src={instagram} alt="instagram"/></a></li>
            <li><a href="https://www.facebook.com/convergencefood"><img src={facebook} alt="facebook"/></a></li>
            <li><a href="https://www.twitter.com/convergencefood"><img src={twitter} alt="twitter"/></a></li>
            <li><a href="https://www.linkedin.com/convergencefood"><img src={linkedin} alt="linkedin"/></a></li>
          </ul>
        </div>
        <div className={styles.termos}>
          <NavLink to="/termos">Termos & Condições</NavLink>
        </div>
      </div>
      <p className={styles.copyright}>
        Todos direitos reservados - ConvergenceFood© {date.getFullYear()}
      </p>
    </div>
  );
};

export default Footer;
