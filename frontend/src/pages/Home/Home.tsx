import React, { useState, useEffect, useRef } from 'react';
import styles from './Home.module.css';
import Navbar from '../../components/NavBar/Navbar';
import Footer from '../../components/Footer/Footer';
import Dot from '../../components/Dot/Dot';
import { useNavigate } from 'react-router-dom';

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

const estates = [
  {
    id: 1,
    name: "Spring Ville",
    imageUrl: "./imagesHome/springville.jpg",
    price: "50.000.000 VNĐ/m²",
  },
  {
    id: 2,
    name: "The Beverly",
    imageUrl: "./imagesHome/thebeverly.jpg",
    price: "50.000.000 VNĐ/m²",
  },
  {
    id: 3,
    name: "The Blanca City",
    imageUrl: "./imagesHome/theblancacity.jpg",
    price: "150.000.000 VNĐ/m²",
  },
  {
    id: 4,
    name: "Lumiere Midtown",
    imageUrl: "./imagesHome/theprive.png",
    price: "160.000.000 VNĐ/m²",
  },
  {
    id: 5,
    name: "Eco Retreat",
    imageUrl: "./imagesHome/ecoretreat.jpg",
    price: "60.000.000 VNĐ/m²",
  },
  {
    id: 6,
    name: "La Pura",
    imageUrl: "./imagesHome/lapura.png",
    price: "46.000.000 VNĐ/m²",
  },
  {
    id: 7,
    name: "The Prive",
    imageUrl: "./imagesHome/theprive.png",
    price: "99.000.000 VNĐ/m²",
  }
];

const Home: React.FC = () => {
  const [currentSmallIndex, setCurrentSmallIndex] = useState(0);
  const [currentBigIndex, setCurrentBigIndex] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [prevSlideFading, setPrevSlideFading] = useState(false);
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  const estatesLength = estates.length;
  const benefitRef = useRef<HTMLDivElement>(null);
  const membersRef = useRef<HTMLDivElement>(null);
  const collectionsRef = useRef<HTMLDivElement>(null);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();

  // Trạng thái để hiển thị/ẩn pop-up modal
  const [isModalRegisterOpen, setisModalRegisterOpen] = useState(false);
  const [isModalNewsOpen, setisModalNewsOpen] = useState(false);
  const [isModalProjectsOpen, setisModalProjectsOpen] = useState(false);

  // Trạng thái để lưu các giá trị form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [selectedProject, setSelectedProject] = useState('');
  const [error, setError] = useState<string | null>(null);

  const openModalRegister = () => {
    setisModalRegisterOpen(true);
  };

  const closeModalRegister = () => {
    setisModalRegisterOpen(false);
  };

  const openModalNews = () => {
    setisModalNewsOpen(true);
  };

  const closeModalNews = () => {
    setisModalNewsOpen(false);
  };

  const openModalProjects = () => {
    setisModalProjectsOpen(true);
  };

  const closeModalProjects = () => {
    setisModalProjectsOpen(false);
  };

  const handleSignUp = async () => {
    if (!fullName || !phone || !email) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ.');
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError('Số điện thoại không hợp lệ.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          phone,
          email,
        }),
      });

      // Check if the response is valid and has a success status
      const data = await response.json();
      console.log('Response:', response);

      if (response.ok) {
        // If the status is 200-299, it's a success
        console.log('Đăng ký thành công:', data);
      } else {
        // Handle any errors from the API
        console.error('Lỗi đăng ký:', data);
        setError(data.message || 'Đã xảy ra lỗi khi đăng ký');
      }
    } catch (error) {
      // Handle network or fetch errors
      console.error('Lỗi kết nối:', error);
      setError('Lỗi kết nối. Vui lòng thử lại sau.');
    }

    setError(null); // Reset lỗi nếu mọi thứ hợp lệ
    closeModalRegister();
  };

  const handleNews = async () => {
    if (!fullName || !phone || !email) {
      setError('Vui lòng điền đầy đủ thông tin.');
      return;
    }

    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ.');
      return;
    }

    if (!phoneRegex.test(phone)) {
      setError('Số điện thoại không hợp lệ.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/news`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          phone,
          email,
        }),
      });

      // Check if the response is valid and has a success status
      const data = await response.json();
      console.log('Response:', response);

      if (response.ok) {
        // If the status is 200-299, it's a success
        console.log('Đăng ký thành công:', data);
      } else {
        // Handle any errors from the API
        console.error('Lỗi đăng ký:', data);
        setError(data.message || 'Đã xảy ra lỗi khi đăng ký');
      }
    } catch (error) {
      // Handle network or fetch errors
      console.error('Lỗi kết nối:', error);
      setError('Lỗi kết nối. Vui lòng thử lại sau.');
    }

    setError(null); // Reset lỗi nếu mọi thứ hợp lệ
    closeModalNews();
  };

  const handleProjects = async () => {
    // Kiểm tra các trường thông tin bắt buộc
    if (!fullName || !phone || !email || !selectedProject) {
      setError('Vui lòng điền đầy đủ thông tin và chọn một dự án.');
      return;
    }

    // Kiểm tra định dạng email
    if (!emailRegex.test(email)) {
      setError('Email không hợp lệ.');
      return;
    }

    // Kiểm tra định dạng số điện thoại
    if (!phoneRegex.test(phone)) {
      setError('Số điện thoại không hợp lệ.');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          fullName,
          phone,
          email,
          selectedProject,  // Thêm dự án vào body
        }),
      });

      // Kiểm tra phản hồi từ API
      const data = await response.json();
      console.log('Response:', response);

      if (response.ok) {
        // Nếu phản hồi thành công (status 200-299)
        console.log('Đăng ký thành công:', data);
      } else {
        // Nếu có lỗi từ API
        console.error('Lỗi đăng ký:', data);
        setError(data.message || 'Đã xảy ra lỗi khi đăng ký');
      }
    } catch (error) {
      // Xử lý lỗi mạng hoặc fetch
      console.error('Lỗi kết nối:', error);
      setError('Lỗi kết nối. Vui lòng thử lại sau.');
    }

    // Reset lỗi nếu mọi thứ hợp lệ
    setError(null);
    closeModalProjects();
  };
 
  const scrollToBenefit = () => {
    if (benefitRef.current) {
      benefitRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToMembers = () => {
    if (membersRef.current) {
      membersRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToCollections = () => {
    if (collectionsRef.current) {
      collectionsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + estates.length) % estates.length);
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % estates.length);
  };

  const handleClick = (name: string) => {
    const formattedName = name.replace(/\s+/g, '');
    navigate(`/Estate/${formattedName}`, { state: { name } });
  };

  useEffect(() => {
    const smallInterval = setInterval(() => {
      setCurrentSmallIndex(Math.floor(Math.random() * smallMembers.length)); // Chọn ngẫu nhiên từ smallMembers
    }, 5000); // 5 giây

    const bigInterval = setInterval(() => {
      setCurrentBigIndex(Math.floor(Math.random() * bigMembers.length)); // Chọn ngẫu nhiên từ bigMembers
    }, 5000); // 5 giây

    return () => {
      clearInterval(smallInterval);
      clearInterval(bigInterval);
    };
  }, []);

  const [animate, setAnimate] = useState(false);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  useEffect(() => {
    setAnimate(true);
    window.scrollTo(0, 0);
  }, []);

  const smallMember = smallMembers[currentSmallIndex];
  const bigMember = bigMembers[currentBigIndex];
  
  return (
    <div className={styles.container}>
      <Navbar openModal={openModalRegister} />
      <div className={styles.banner}>
        <div className={`${styles.descriptionBanner} ${animate ? styles.animateSlideUp : ''}`}>ĐƯỢC PHÁT TRIỂN BỞI ĐÔNG TÂY LAND</div>
        <div className={`${styles.titleBanner} ${animate ? styles.animateSlideUp : ''}`}>Mạng lưới bất động sản <br/>hàng đầu Việt Nam</div>
      </div>

      <div className={styles.introduction} id="aboutUs" ref={membersRef}>
        <div className={styles.logoContainer}>
          <a href="https://dongtayland.vn/" target="_blank">
            <img className={styles.logo} src="./imagesHome/LogoDTL.png" alt="" />
          </a>
          <img className={styles.logoSpy} src="./imagesHome/FullLogoBlack.png" alt="" onClick={scrollToTop} />
        </div>
        <img className={styles.imageIntroduction} src="./imagesHome/belowTitle.png" alt="Image below Title" />
        <div className={`${styles.descriptionIntroduction} ${animate ? styles.revealText : ''}`}
          style={{ animationDelay: '0.2s' }}>
          CHÀO MỪNG ĐẾN VỚI SPYESTATE
        </div>

        <div
          className={`${styles.titleIntroduction} ${animate ? styles.revealText : ''}`}
          style={{ animationDelay: '1.0s' }}>
          Nhiệt huyết đỉnh cao<br/>Đam mê vượt trội
        </div>

        <div
          className={`${styles.contentIntroduction} ${animate ? styles.revealText : ''}`}
          style={{ animationDelay: '1.8s' }}>
          SpyEstate là một phần của công ty Đông Tây Land, <br/> 
          mang đến góc nhìn trực quan nhất về các bất động sản, <br/>
          với sự hiểu biết sâu rộng của các chuyên viên cao cấp, <br/>
          chúng tôi rất mong được phục vụ các quý khách hàng.
        </div>
      </div>

      <div className={styles.services}>
        <div className={`${styles.servicesBlock}`} onClick={scrollToBenefit}>
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
        <div className={`${styles.servicesBlock}`} onClick={scrollToMembers}>
          <div className={styles.blockWrapper}>
            {/* Thêm sự kiện onClick vào hình ảnh */}
            <img src="./imagesHome/block2.jpg" className={styles.block} alt="" />
          </div>
          <div className={styles.titleBlock} onClick={() => {
              const aboutSection = document.getElementById('aboutUs');
              if (aboutSection) {
                aboutSection.scrollIntoView({ behavior: 'smooth' });
              }
            }}> Về chúng tôi </div>
          <div className={styles.contentBlock}>
            SpyEstate không chỉ là một mạng lưới mà là một cộng<br/>
            đồng. Bằng cách ưu tiên những kết nối ý nghĩa hơn là<br/>
            số lượng, chúng tôi mang đến một không gian để các <br/>
            chuyên gia cùng chí hướng gặp gỡ, hợp tác và phát triển, <br/>
            tại những điểm đến hàng đầu trên toàn cầu.
          </div>
        </div>
        <div className={`${styles.servicesBlock}`}  onClick={scrollToCollections}>
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

      {/* <div className={styles.members} ref={benefitRef} >
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
        <div className={styles.buttonSignUp} onClick={openModalRegister}>Đăng ký thành viên</div>
      </div> */}

      <div className={styles.mapContainer}>
        <div className={styles.map}>
          <img src="/imagesHome/map.png" alt="Bản đồ" className={styles.mapImage} />
          <Dot name="The Blanca City" id="TheBlancaCity" top="93.1021%" left="64.021%" infoImage="./imagesHome/theblancacity.jpg" infoTitle="The Blanca City" infoPrice="100.000.000 VNĐ/m²"/>
          <Dot name="Lumiere Midtown" id="LumiereMidtown" top="43.5%" left="43.3%" infoImage="./imagesHome/lumieremidtown.png" infoTitle="Lumière Midtown" infoPrice="160.000.000 VNĐ/m²"/>
          <Dot name="The Prive" id="ThePrive" top="43.5%" left="41.3%" infoImage="./imagesHome/theprive.png" infoTitle="The Privé" infoPrice="99.000.000 VNĐ/m²"/>
          <Dot name="Eco Retreat" id="EcoRetreat" top="59.5%" left="27.3%" infoImage="./imagesHome/ecoretreat.jpg" infoTitle="Eco Retreat" infoPrice="60.000.000 VNĐ/m²"/>
          <Dot name="La Pura" id="LaPura" top="31.5%" left="39.5%" infoImage="./imagesHome/lapura.png" infoTitle="La Pura" infoPrice="46.000.000 VNĐ/m²"/>
          <Dot name="The Beverly" id="TheBeverly" top="38.5%" left="47.5%" infoImage="./imagesHome/thebeverly.jpg" infoTitle="The Beverly" infoPrice="48.000.000 VNĐ/m²"/>
          <Dot name="Spring Ville" id="SpringVille" top="51.7%" left="54%" infoImage="./imagesHome/springville.jpg" infoTitle="Spring Ville" infoPrice="50.000.000 VNĐ/m²"/>
        </div>
      </div>

      <div className={styles.collections} ref={collectionsRef} id="collections">
        <div className={styles.topCollections}>
          <div className={styles.preIntroduction}>SPYESTATE - KẾT NỐI ĐỈNH CAO BẤT ĐỘNG SẢN</div>
          <div className={styles.titleCollections}>Bất động sản</div>
          <img className={styles.imageIntroduction} src="./imagesHome/belowTitle.png" alt="Image below Title" />
          <div className={styles.contentIntroduction}>
            Từ Sài Gòn đến Phú Quốc, từ Đà Nẵng đến Melbourne, 
            <br/>SpyEstate – thành viên của Đông Tây Land
            <br/>đồng hành cùng những thương vụ triệu đô, dự án biểu tượng và 
            <br/>giao dịch đẳng cấp trong lĩnh vực bất động sản cao cấp.
          </div>
        </div>
        <div className={styles.estateList}>
          <div className={styles.sliderWrapper}>
          {estates.map((estate, index) => {
            let position = "nextSlide";
            if (index === currentIndex) {
              position = "activeSlide";
            } else if (
              index === (currentIndex - 1 + estates.length) % estates.length
            ) {
              position = "prevSlide";
            }

            return (
              <div key={estate.id} className={`${styles.slide} ${styles[position]}`} onClick={() => handleClick(estate.name)}>
                <img src={estate.imageUrl} alt={estate.name} />
                {/* Chỉ render overlay nếu đây là slide đang active */}
                {index === currentIndex && (
                  <div className={styles.overlay}>
                      <h3>{estate.name}</h3>
                      <p>{estate.price}</p>
                  </div>
                )}
              </div>
            );
          })}
          </div>
          <div className={styles.groupButton}>
            <div className={styles.navButton} onClick={prevSlide}>
              <img src="./imagesHome/left.png" alt="Previous Slide"/>
            </div>
            <div className={styles.navButton} onClick={nextSlide}>
              <img src="./imagesHome/right.png" alt="Next Slide"/>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.invite} ref={benefitRef}>
        <div className={styles.memberCard}>
          <div className={styles.becomeMember}>
            <div className={styles.titleBecomeMember}>Đăng ký nhận <br/>thông tin hằng tháng</div>
            <div className={styles.preBecomeMember}>Bạn muốn nhận thông tin về các dự án?</div>
            <div className={styles.contentBecomeMember}>
              Đăng ký ngay để trở thành thành viên của SpyEstate, <br/>
              nhận thông tin về các bất động sản cao cấp, <br/>
              và được hỗ trợ từ đội ngũ chuyên gia hàng đầu trong ngành.
            </div>
            <div className={styles.buttonBecomeMember} onClick={openModalNews}>Đăng ký ngay</div>
          </div>
          <div className={styles.workWithUs}>
            <div className={styles.titleBecomeMember}>Tìm hiểu về dự án</div>
            <div className={styles.preBecomeMember}>Bạn muốn thông tin của dự án nào?</div>
            <div className={styles.contentBecomeMember}>
              Chúng tôi cung cấp thông tin chi tiết về các dự án bất động sản cao cấp, <br/>
              bao gồm giá cả, vị trí, tiện ích và nhiều thông tin khác. <br/>
              Hãy liên hệ với chúng tôi để được tư vấn và hỗ trợ tốt nhất.
            </div>
            <div className={styles.buttonBecomeMember} onClick={openModalProjects}>Liên hệ</div>
            <div className={styles.or}>or</div>
            <div className={styles.phoneGroup}>Liên hệ: 
              <a href="tel:0772134455" className={styles.noneHref}>
                <div className={styles.phone}>0772134455</div>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Pop-up Modal */}
      {isModalRegisterOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModalRegister}>&times;</span>
            <h2>Đăng ký thành viên</h2>
            <div className={styles.descriptionModal}>Tham gia SpyEstate – một phần của Đông Tây Land, 
              <br />cộng đồng bất động sản uy tín, nơi bạn có thể kết nối 
              <br />với các chuyên gia, tìm kiếm cơ hội đầu tư hấp dẫn và 
              <br />cập nhật thông tin mới nhất về thị trường.
              <br /><br />Đăng ký ngay để trở thành thành viên và khám phá những
              <br />cơ hội độc đáo chỉ có tại SpyEstate!</div>
            <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }}>
              <div className={styles.formGroup}>
                <input
                  className={styles.inputtext}
                  type="text"
                  id="fullName"
                  value={fullName}
                  placeholder='Họ tên'
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  className={styles.inputtext}
                  type="text"
                  id="phone"
                  value={phone}
                  placeholder='Số điện thoại'
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  className={styles.inputtext}
                  type="email"
                  id="email"
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <div className={styles.error}>{error}</div>} {/* Hiển thị lỗi */}
              <button type="submit" className={styles.submitButton}>Đăng ký</button>
            </form>
          </div>
        </div>
      )}

      {/* Pop-up News */}
      {isModalNewsOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModalNews}>&times;</span>
            <h2>Đăng ký nhận thông tin <br /> dự án hàng tháng</h2>
            <div className={styles.descriptionModal}>Đăng ký nhận thông tin dự án hàng tháng từ SpyEstate 
              <br />Cập nhật các cơ hội đầu tư, thông tin mới nhất
              <br /> về bất động sản và những dự án hấp dẫn. 
              <br /> <br />Đừng bỏ lỡ cơ hội để nắm bắt xu hướng thị trường bất động sản!</div>
            <form onSubmit={(e) => { e.preventDefault(); handleNews(); }}>
              <div className={styles.formGroup}>
                <input
                  className={styles.inputtext}
                  type="text"
                  id="fullName"
                  value={fullName}
                  placeholder='Họ tên'
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  className={styles.inputtext}
                  type="text"
                  id="phone"
                  value={phone}
                  placeholder='Số điện thoại'
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  className={styles.inputtext}
                  type="email"
                  id="email"
                  value={email}
                  placeholder='Email'
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <div className={styles.error}>{error}</div>} {/* Hiển thị lỗi */}
              <button type="submit" className={styles.submitButton}>Đăng ký</button>
            </form>
          </div>
        </div>
      )}

      {/* Pop-up Projects */}
      {isModalProjectsOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModalProjects}>&times;</span>
            <h2>Nhận thêm thông tin về dự án</h2>
            <div className={styles.descriptionModal}>
              Đăng ký nhận thông tin về các dự án để luôn cập nhật những cơ hội
              <br /> đầu tư hấp dẫn và tin tức mới nhất. Bạn sẽ nhận được
              <br /> thông báo về tiến độ, cơ hội đặc biệt, cũng
              <br /> như các thay đổi quan trọng từ các dự
              <br /> án uy tín. 
              
              <br /><br />Đừng bỏ lỡ cơ hội để nắm bắt thông tin kịp thời
              <br /> và đưa ra quyết định đầu tư chính xác!
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleProjects(); }}>
              <div className={styles.formGroup}>
                <input
                  className={styles.inputtext}
                  type="text"
                  id="fullName"
                  value={fullName}
                  placeholder="Họ tên"
                  onChange={(e) => setFullName(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  className={styles.inputtext}
                  type="text"
                  id="phone"
                  value={phone}
                  placeholder="Số điện thoại"
                  onChange={(e) => setPhone(e.target.value)}
                  required
                />
              </div>
              <div className={styles.formGroup}>
                <input
                  className={styles.inputtext}
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {/* Dropdown for projects */}
              <div className={styles.formGroup}>
                <select
                  id="project"
                  value={selectedProject}
                  onChange={(e) => setSelectedProject(e.target.value)}
                  required
                >
                  <option value="">Chọn dự án</option>
                  {estates.map((estate) => (
                    <option key={estate.id} value={estate.name}>
                      {estate.name}
                    </option>
                  ))}
                </select>
              </div>
              {error && <div className={styles.error}>{error}</div>} {/* Hiển thị lỗi */}
              <button type="submit" className={styles.submitButton}>Đăng ký</button>
            </form>
          </div>
        </div>
      )}
      <Footer/>
    </div>
  );
};

export default Home;
