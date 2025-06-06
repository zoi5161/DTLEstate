import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/PrivacyPolicy');
  };


  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className={styles.footerContainer}>
      <div className={styles.topFooter}>
        <div className={styles.leftTopFooter}>
          <img src="../imagesHome/LogoBlack.png" alt="Logo Spy Estate" onClick={scrollToTop}/>
          <div className={styles.groupInfo}>
            <div>Liên hệ chúng tôi</div>
            <a href="mailto:TheSpyEstate@gmail.com" className={styles.noneHref}>
              <div className={styles.phone}>SpyEstate@gmail.com</div>
            </a>
            <a href="tel:0772134455" className={styles.noneHref}>
              <div className={styles.phone}>0772134455</div>
            </a>
          </div>
        </div>
        <div className={styles.rightTopFooter}>
          <a href="https://dongtayland.vn/" target="_blank">
            <img src="../imagesHome/website.png" alt="Website Image" />
          </a>
          <a href="https://www.facebook.com/bdsdongtayland" target="_blank">
            <img src="../imagesHome/facebook.png" alt="" />
          </a>
          <a href="mailto:TheSpyEstate@gmail.com">
            <img src="../imagesHome/gmail.png" alt="Gmail" />
          </a>
          <a href="https://www.youtube.com/@DongTayLandOfficial" target="_blank">
            <img src="../imagesHome/youtube.png" alt="" />
          </a>
        </div>
      </div>
      <div className={styles.belowFooter}>
        <div className={styles.textBelowFooter}>Powered by Spy Estate</div>
        <div className={styles.textBelowFooter}>Copyright © 2025</div>
        <div className={`${styles.textBelowFooter} ${styles.phone}`} onClick={handleClick}>Privacy Policy</div>
      </div>
    </div>
  );
};

export default Footer;
