import React, { useState, useEffect } from 'react';
import styles from './Footer.module.css';
import { useNavigate } from 'react-router-dom';

const Footer = () => {
  return (
    <div className={styles.footerContainer}>
      <div className={styles.topFooter}>
        <div className={styles.leftTopFooter}>
          <img src="./imagesHome/LogoBlack.png" alt="" />
          <div className={styles.groupInfo}>
            <div>Liên hệ chúng tôi</div>
            <div>SpyEstate@gmail.com</div>
            <div>0772134455</div>
          </div>
        </div>
        <div className={styles.rightTopFooter}></div>
      </div>
      <div className={styles.belowFooter}></div>
    </div>
  );
};

export default Footer;
