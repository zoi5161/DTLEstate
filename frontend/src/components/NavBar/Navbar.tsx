import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

const Navbar = () => {
  const [menuActive, setMenuActive] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoImage, setLogoImage] = useState("./imagesHome/LogoWhite.png"); // Thêm trạng thái cho logo

  const toggleMenu = () => {
    setMenuActive(!menuActive);
  };

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      setHidden(true);
    } else {
      setHidden(false);
    }

    // Kiểm tra xem đã cuộn xuống hay chưa
    if (window.scrollY > 50) { // Điều chỉnh giá trị 50 nếu cần
      setScrolled(true);
      setLogoImage("./imagesHome/LogoBlack.png"); // Đổi logo khi cuộn xuống
      setMenuActive(false); // Tắt dropdown khi cuộn trang
    } else {
      setScrolled(false);
      setLogoImage("./imagesHome/LogoWhite.png"); // Trở lại logo trắng khi ở đầu trang
    }

    setLastScrollY(window.scrollY);
  };

  // Hàm cuộn lên đầu trang khi click vào logo
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth' // Tạo hiệu ứng cuộn mượt mà
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`${styles.navbar} ${hidden ? styles.hidden : ''} ${scrolled ? styles.scrolled : ''}`}>
      <div className={styles.logo} onClick={scrollToTop}>
        <img src={logoImage} alt="Logo" className={styles.logoImage} />
      </div>
      <div className={`${styles.navList} ${menuActive ? styles.active : ''}`}>
        <div>BẤT ĐỘNG SẢN</div>
        <div>VỀ CHÚNG TÔI</div>
        <div>ĐĂNG KÝ</div>
      </div>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        &#9776;
      </div>
    </div>
  );
};

export default Navbar;
