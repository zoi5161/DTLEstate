import React, { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';
import Navbar from '../../components/NavBar/Navbar';
import Dot from '../../components/Dot/Dot';

// Tách thành 2 mảng smallMembers và bigMembers
const smallMembers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    position: "Chuyên gia bất động sản Úc",
    imageUrl: "./imagesHome/member1.jpg",
  },
  {
    id: 2,
    name: "Nguyễn Văn B",
    position: "Chuyên gia bất động sản khu Đông",
    imageUrl: "./imagesHome/member4.jpg",
  }
];

const bigMembers = [
  {
    id: 3,
    name: "Nguyễn Văn C",
    position: "Chuyên gia bất động sản khu Tây",
    imageUrl: "./imagesHome/member3.jpg",
  },
  {
    id: 4,
    name: "Nguyễn Văn D",
    position: "Chuyên gia bất động sản khu Nam",
    imageUrl: "./imagesHome/member2.jpg",
  }
  // Các thành viên lớn khác (nếu cần)
];

const Home: React.FC = () => {
  const [currentSmallIndex, setCurrentSmallIndex] = useState(0);
  const [currentBigIndex, setCurrentBigIndex] = useState(0);

  // Sử dụng useRef để tham chiếu đến phần members
  const membersRef = useRef<HTMLDivElement>(null);

  // Hàm cuộn đến phần members
  const scrollToMembers = () => {
    if (membersRef.current) {
      membersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Hàm để thay đổi index mỗi 5 giây cho small và big member
  useEffect(() => {
    const smallInterval = setInterval(() => {
      setCurrentSmallIndex(Math.floor(Math.random() * smallMembers.length)); // Chọn ngẫu nhiên từ smallMembers
    }, 5000); // 5 giây

    const bigInterval = setInterval(() => {
      setCurrentBigIndex(Math.floor(Math.random() * bigMembers.length)); // Chọn ngẫu nhiên từ bigMembers
    }, 5000); // 5 giây

    return () => {
      clearInterval(smallInterval); // Dọn dẹp interval khi component bị unmount
      clearInterval(bigInterval); // Dọn dẹp interval khi component bị unmount
    };
  }, []);

  // Lấy 2 thành viên ngẫu nhiên từ các mảng nhỏ và lớn
  const smallMember = smallMembers[currentSmallIndex];
  const bigMember = bigMembers[currentBigIndex];
  
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
        <div className={`${styles.servicesBlock}`}  onClick={scrollToMembers}>
          <div className={styles.blockWrapper}>
            {/* Thêm sự kiện onClick vào hình ảnh */}
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

      <div className={styles.members} ref={membersRef}>
        <div className={styles.titleMember}>
          Những Tên Tuổi Được Tin Cậy Nhất <br/>
          Trong Ngành Bất Động Sản Cao Cấp
        </div>
        <div className={styles.groupWrapper}>
          <div className={styles.wrapper}>
            <div className={styles.smallMember}>
              <img src={smallMember.imageUrl} alt="" />
            </div>
            <div className={styles.member}>
              <div className={styles.nameMember}>{smallMember.name}</div>
              <div className={styles.positionMember}>{smallMember.position}</div>
            </div>
          </div>
          <div className={styles.wrapperBig}>
            <div className={styles.bigMember}>
              <img src={bigMember.imageUrl} alt="" />
            </div>
            <div className={styles.member}>
              <div className={styles.nameMember}>{bigMember.name}</div>
              <div className={styles.positionMember}>{bigMember.position}</div>
            </div>
          </div>
        </div>
        <div className={styles.contentMember}>
          Các chuyên viên của Đông Tây Land là những nhân tố nổi bật, luôn dẫn đầu trong ngành bất động sản. Với kinh nghiệm vững vàng và thành tích xuất sắc, họ đã góp phần xây dựng nên thương hiệu Đông Tây Land vững mạnh. Những chuyên viên này không chỉ đạt được kết quả vượt trội trong mỗi dự án, mà còn là những người đứng sau những giao dịch thành công, giúp công ty đạt được vị thế đáng tự hào trên thị trường bất động sản.
          <br/><br/>
          Với hơn 10 năm hoạt động, Đông Tây Land đã thực hiện hàng trăm dự án lớn, góp phần vào việc phát triển những khu đô thị hiện đại và các dự án bất động sản nổi bật. Chính nhờ vào đội ngũ chuyên viên tài năng và tận tâm, Đông Tây Land đã ghi dấu ấn với hàng nghìn khách hàng hài lòng và tiếp tục khẳng định là một trong những tên tuổi hàng đầu trong ngành bất động sản tại Việt Nam.
        </div>
        <div className={styles.buttonSignUp}>Đăng ký thành viên</div>
      </div>
      <div className={styles.mapContainer}>
        <div className={styles.map}>
          <img src="/imagesHome/map.png" alt="Bản đồ" className={styles.mapImage} />
          <Dot id="TheBlancaCity" top="93.5%" left="64%" infoImage="./imagesHome/theblancacity.jpg" infoTitle="The Blanca City" infoPrice="100.000.000 VNĐ/m²"/>
          <Dot id="LumiereMidtown" top="43.5%" left="43.3%" infoImage="./imagesHome/lumieremidtown.png" infoTitle="Lumière Midtown" infoPrice="160.000.000 VNĐ/m²"/>
          <Dot id="ThePrive" top="43.5%" left="41.3%" infoImage="./imagesHome/theprive.png" infoTitle="The Privé" infoPrice="99.000.000 VNĐ/m²"/>
        </div>
      </div>
    </div>
  );
};

export default Home;
