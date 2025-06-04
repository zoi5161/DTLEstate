import React, { useState, useEffect } from 'react';
import styles from './Navbar.module.css';

interface NavbarProps {
  openModal: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ openModal }) => {
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

  // state mới cho animation
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  return (
    <div className={`${styles.navbar} ${hidden ? styles.hidden : ''} ${scrolled ? styles.scrolled : ''}`}>
      <div
        className={`${styles.logo} ${animate ? styles.animateSlideUp : ''}`}
        onClick={scrollToTop}
      >
        <img src={logoImage} alt="Logo" className={`${styles.logoImage} ${animate ? styles.animateSlideUp : ''}`} />
      </div>
      <div className={`${styles.navList} ${menuActive ? styles.active : ''}`}>
        {/* Áp animation cho từng mục menu */}
          <div className={animate ? styles.animateSlideUp : ''} onClick={() => {
            const aboutSection = document.getElementById('collections');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
          BẤT ĐỘNG SẢN
        </div>
        <div className={animate ? styles.animateSlideUp : ''} onClick={() => {
            const aboutSection = document.getElementById('aboutUs');
            if (aboutSection) {
              aboutSection.scrollIntoView({ behavior: 'smooth' });
            }
          }}>
          VỀ CHÚNG TÔI
        </div>
        <div className={animate ? styles.animateSlideUp : ''} onClick={openModal}>ĐĂNG KÝ</div>
      </div>
      <div className={styles.menuIcon} onClick={toggleMenu}>
        &#9776;
      </div>
    </div>
  );
};

export default Navbar;
