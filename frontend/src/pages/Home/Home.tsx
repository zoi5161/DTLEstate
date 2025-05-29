// src/pages/Home.tsx
import React from 'react';
import styles from './Home.module.css';
import Navbar from '../../components/NavBar/Navbar';

const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <Navbar />
      <div className={styles.banner}>
        <div className={styles.descriptionBanner}>ĐƯỢC PHÁT TRIỂN BỞI ĐÔNG TÂY LAND</div>
        <div className={styles.titleBanner}>Mạng lưới bất động sản <br/>hàng đầu Việt Nam</div>
      </div>

      <div className={styles.introduction}>
        <div className={styles.logoContainer}>
          <img className={styles.logo} src="./imagesHome/LogoDTL.png" alt="" />
          <img className={styles.logoSpy} src="./imagesHome/FullLogoBlack.png" alt="" />
        </div>
        <img className={styles.imageIntroduction} src="./imagesHome/belowTitle.png" alt="Image below Title" />
        <div className={styles.descriptionIntroduction}>CHÀO MỪNG ĐẾN VỚI SPYESTATE</div>
        <div className={styles.titleIntroduction}>Nhiệt huyết đỉnh cao<br/>Đam mê vượt trội</div>
        <div className={styles.contentIntroduction}>SpyEstate là một phần của công ty Đông Tây Land, <br/> mang đến những chuyên gia bất động sản hàng đầu Việt Nam, <br/>với sự hiểu biết sâu rộng và tầm ảnh hưởng đáng kể trong ngành, <br/>chúng tôi rất mong được phục vụ các quý khách hàng.</div>
      </div>

      <div className={styles.services}>
        <div className={`${styles.servicesBlock}`}>
          <div className={styles.blockWrapper}>
            <img src="./imagesHome/block1.jpg" className={styles.block} alt="" />
          </div>
          <div className={styles.titleBlock}>Quyền lợi</div>
          <div className={styles.contentBlock}>
            Các thành viên có cơ hội tham gia vào thế giới bất <br />
            động sản cao cấp, tiếp cận các danh sách đặc biệt <br />
            từ Mạng Lưới Danh Sách Riêng Tư Collective, với sự <br />
            hỗ trợ từ đội ngũ môi giới chuyên nghiệp, cam kết <br />
            mang lại giá trị cao nhất.
          </div>
        </div>
        <div className={`${styles.servicesBlock}`}>
          <div className={styles.blockWrapper}>
            <img src="./imagesHome/block2.jpg" className={styles.block} alt="" />
          </div>
          <div className={styles.titleBlock}>Về chúng tôi</div>
          <div className={styles.contentBlock}>
            SpyEstate không chỉ là một mạng lưới mà là một cộng<br/>
            đồng. Bằng cách ưu tiên những kết nối ý nghĩa hơn là<br/>
            số lượng, chúng tôi mang đến một không gian để các <br/>
            chuyên gia cùng chí hướng gặp gỡ, hợp tác và phát triển, <br/>
            tại những điểm đến hàng đầu trên toàn cầu.
          </div>
        </div>
        <div className={`${styles.servicesBlock}`}>
          <div className={styles.blockWrapper}>
            <img src="./imagesHome/block3.jpg" className={styles.block} alt="" />
          </div>
          <div className={styles.titleBlock}>Bất động sản</div>
          <div className={styles.contentBlock}>
            Hệ thống bất động sản uy tín kết nối cơ hội đầu tư <br />
            tại Việt Nam và Úc. Cung cấp căn hộ, biệt thự, đất <br />
            tiềm năng, mang lại lựa chọn phù hợp nhất. Đội ngũ <br />
            chuyên gia hỗ trợ tìm bất động sản tốt nhất, đảm bảo <br />
            an tâm và lợi ích tối ưu.
          </div>
        </div>
      </div>

      <div className={styles.members}>
      
      </div>
    </div>
  );
};

export default Home;