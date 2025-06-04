import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.topFooter}>
        <div className={styles.leftTopFooter}>
          <img src="../imagesHome/LogoBlack.png" alt="" />
          <div className={styles.groupInfo}>
            <div>Liên hệ chúng tôi</div>
            <div>SpyEstate@gmail.com</div>
            <div>0772134455</div>
          </div>
        </div>
        <div className={styles.rightTopFooter}>
          <img src="../imagesHome/website.png" alt="" />
          <img src="../imagesHome/facebook.png" alt="" />
          <img src="../imagesHome/gmail.png" alt="" />
          <img src="../imagesHome/youtube.png" alt="" />
        </div>
      </div>
      <div className={styles.belowFooter}>
        <div className={styles.textBelowFooter}>Powered by Spy Estate</div>
        <div className={styles.textBelowFooter}>Copyright © 2025</div>
        <div className={styles.textBelowFooter}>Privacy Policy</div>
      </div>
    </div>
  );
};

export default Footer;
