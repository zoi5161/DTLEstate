import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './Estate.module.css';
import Navbar from '../../components/NavBarInvisible/Navbar';
import Footer from '../../components/Footer/Footer';

const API_URL = process.env.REACT_APP_API_URL;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Estate: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name;
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  const [estate, setEstate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  // Trạng thái để hiển thị/ẩn pop-up modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalContactOpen, setisModalContactOpen] = useState(false);

  // Trạng thái để lưu các giá trị form
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [selectedProject, setSelectedProject] = useState('');

  const openModalContact = () => {
    setisModalContactOpen(true);
  };

  const closeModalContact = () => {
    setisModalContactOpen(false);
  };

  // Hàm mở modal khi nhấn nút Đăng ký thành viên
  const openModal = () => {
    setIsModalOpen(true);
  };

  // Hàm đóng modal
  const closeModal = () => {
    setIsModalOpen(false);
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
    closeModal();
  };

  const handleContact = async () => {
    // Kiểm tra các trường thông tin bắt buộc
    if (!fullName || !phone || !email) {
      setError('Vui lòng điền đầy đủ thông tin');
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
          selectedProject: estate.name,
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
    closeModalContact();
  };
 
  useEffect(() => {
    const fetchEstate = async () => {
      try {
        console.log('Fetching estate with name:', name);
        const res = await fetch(`${API_URL}/estates`);
        const data = await res.json();

        console.log('Fetched estates:', data);
        const found = data.find((e: any) => e.name === name);

        setEstate(found);
      } catch (err) {
        console.error('Error fetching estate:', err);
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      fetchEstate();
    } else {
      setLoading(false);
      setEstate(null);
    }
  }, [name]);

  if (loading) return <div>Loading...</div>;
  if (!estate) return <div>Estate not found.</div>;

  return (
    <div className={styles.container}>
      <Navbar openModal={openModal} />
      <div className={styles.images}>
        <div className={styles.twoImagesBefore}>
          <div className={styles.twoImages}>
            <img src={`${BACKEND_URL}/${estate.images[0]}`} alt="Estate" className={styles.image} onClick={() => setSelectedImage(`${BACKEND_URL}/${estate.images[0]}`)}/>
          </div>
          <div className={styles.twoImages}>
            <img src={`${BACKEND_URL}/${estate.images[1]}`} alt="Estate" className={styles.image} onClick={() => setSelectedImage(`${BACKEND_URL}/${estate.images[1]}`)}/>
          </div>
        </div>

        <div className={styles.twoImagesMiddle}>
          <img src={`${BACKEND_URL}/${estate.images[2]}`} alt="Estate" className={styles.image} onClick={() => setSelectedImage(`${BACKEND_URL}/${estate.images[2]}`)}/>
        </div>

        <div className={styles.twoImagesBehind}>
          <div className={styles.twoImages}>
            <img src={`${BACKEND_URL}/${estate.images[3]}`} alt="Estate" className={styles.image} onClick={() => setSelectedImage(`${BACKEND_URL}/${estate.images[3]}`)}/>
          </div>
          <div className={styles.twoImages}>
            <img src={`${BACKEND_URL}/${estate.images[4]}`} alt="Estate" className={styles.image} onClick={() => setSelectedImage(`${BACKEND_URL}/${estate.images[4]}`)}/>
          </div>
        </div>
      </div>
      <div className={styles.introduction}>
        <div className={styles.middleIntroduction}>
          <div className={styles.startDayIntroduction}>
            <div className={styles.startDay}>
              Ngày mở bán
            </div>
            <div className={styles.imageStartDay}>
              <img src="../imagesEstate/startDay.png" alt="" />
              {new Date(estate.startSell).toLocaleDateString('vi-VN')}
            </div>
          </div>
          <div className={styles.areaIntroduction}>
            <div className={styles.area}>
              Quy mô
            </div>
            <div className={styles.imageArea}>
              <img src="../imagesEstate/area.png" alt="" />
              {estate.area} ha
            </div>
          </div>
        </div>
        <div className={styles.blockSpaceIntroduction}></div>
        <div className={styles.priceIntroduction}>
          {estate.price.toLocaleString('vi-VN')} VNĐ / m²
        </div>
      </div>

      <div className={styles.description}>
        <div className={styles.descriptionTitle}>
          <div className={styles.descriptionTitleText}>Mô tả</div>
          <div className={styles.descriptionTitleText}>Vị Trí</div>
        </div>
        <div className={styles.descriptionContent}>
          <div
            className={styles.descriptionContentText}
            dangerouslySetInnerHTML={{ __html: estate.description }}
          />
          <div className={styles.descriptionAddressText}>
            {estate.address}
            <div className={styles.addressImages}>
              <img src={`${BACKEND_URL}/${estate.imageAddress}`} alt="Estate" className={styles.image} onClick={() => setSelectedImage(`${BACKEND_URL}/${estate.imageAddress}`)}/>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.information}>
        <div className={styles.informationTop}>
          <div className={styles.informationInTop}>
            <div className={styles.headerInfo}>
              <div className={styles.imageHeader}>
                <img src="../imagesEstate/about.png" alt=""/>
              </div>
              <div className={styles.infoHeader}>Thông tin cơ bản</div>
            </div>
            <div className={styles.footerInfor}>
              <div className={styles.footerInforText}>
                <div className={styles.footerInforTextTitle}>Trạng thái</div>
                <div className={styles.footerInforTextContent}>{estate.status}</div>
              </div>
              <div className={styles.footerInforText}>
                <div className={styles.footerInforTextTitle}>Quy mô</div>
                <div className={styles.footerInforTextContent}>{estate.area} ha</div>
              </div>
              <div className={styles.footerInforText}>
                <div className={styles.footerInforTextTitle}>Hoa hồng</div>
                <div className={styles.footerInforTextContent}>{estate.buyerAgentFee}%</div>
              </div>
            </div>
          </div>
          <div className={styles.informationInTop}>
            <div className={styles.headerInfo}>
              <div className={styles.imageHeader}>
                <img src="../imagesEstate/landscape.png" alt=""/>
              </div>
              <div className={styles.infoHeader}>Cảnh quan</div>
            </div>
            <div className={styles.footerInfor}>
              <div className={styles.footerInforText}>
                <div className={styles.footerInforTextTitle}>Phong cách</div>
                <div className={styles.footerInforTextContent}>{estate.lifestyles}</div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.informationMiddle}>
          <div className={styles.informationInTop}>
            <div className={styles.headerInfo}>
              <div className={styles.imageHeader}>
                <img src="../imagesEstate/interior.png" alt=""/>
              </div>
              <div className={styles.infoHeader}>Tiện ích</div>
            </div>
            <div className={styles.footerInfor}>
              <div className={styles.footerInforText}>
                <div className={styles.footerInforTextTitle}>Tiện ích</div>
                <div className={styles.footerInforTextContent}>
                  {estate.utilities
                    .split('🔺')
                    .filter((part: string) => part.trim() !== '')
                    .map((part: string, index: number) => (
                      <React.Fragment key={index}>
                        {index !== 0 && <br />}
                        ✧ {part.trim()}
                      </React.Fragment>
                    ))}
                </div>
                </div>
            </div>
          </div>
          <div className={styles.informationInTop}>
            <div className={styles.headerInfo}>
              <div className={styles.imageHeader}>
                <img src="../imagesEstate/emptyBed.png" alt=""/>
              </div>
              <div className={styles.infoHeader}>Loại hình</div>
            </div>
            <div className={styles.footerInfor}>
              <div className={styles.footerInforText}>
                <div className={styles.footerInforTextTitle}>Sản phẩm</div>
                <div className={styles.footerInforTextContent}>{estate.viewDescription}</div>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.informationEnd}>
          <div className={styles.informationInTop}>
            <div className={styles.headerInfo}>
              <div className={styles.imageHeader}>
                <img src="../imagesEstate/policy.png" alt=""/>
              </div>
              <div className={styles.infoHeader}>Chính sách bán hàng</div>
            </div>
            <div className={styles.footerInfor}>
              <div className={styles.footerInforText}>
                <div className={styles.footerInforTextTitle}>Chính sách</div>
                <div className={styles.footerInforTextContent}>
                  {estate.slogan
                    .split('🔺')
                    .filter((part: string) => part.trim() !== '')
                    .map((part: string, index: number) => (
                      <React.Fragment key={index}>
                        {index !== 0 && <br />}
                        ✧ {part.trim()}
                      </React.Fragment>
                    ))}
                </div>
              </div>
            </div>
          </div>
          <div className={styles.informationInTop}>
            <div className={styles.headerInfo}>
              <div className={styles.imageHeader}>
                <img src="../imagesEstate/price.png" alt=""/>
              </div>
              <div className={styles.infoHeader}>Giá bán</div>
            </div>
            <div className={styles.footerInfor}>
              <div className={styles.footerInforText}>
                <div className={styles.footerInforTextTitle}>Giá bán</div>
                <div className={styles.footerInforTextContent}>{estate.price.toLocaleString('vi-VN')} VNĐ / m²</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={styles.buttonContact} onClick={openModalContact}>Nhận thêm thông tin dự án</div>

      {/* Pop-up Modal */}
      {isModalOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModal}>&times;</span>
            <h2>Đăng ký thành viên</h2>
            <div className={styles.descriptionModal}>Tham gia SpyEstate – một phần của Đông Tây Land, 
              <br />cộng đồng bất động sản uy tín, nơi bạn có thể kết nối 
              <br />với các chuyên gia, tìm kiếm cơ hội đầu tư hấp dẫn và 
              <br />cập nhật thông tin mới nhất về thị trường.
              <br /><br />Đăng ký ngay để trở thành thành viên và khám phá những
              <br />cơ hội độc đáo chỉ có tại SpyEstate!</div>
            <form onSubmit={(e) => { e.preventDefault(); handleSignUp(); }} className={styles.formSignUp}>
              <div className={styles.formGroup}>
                <input
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
      {isModalContactOpen && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <span className={styles.close} onClick={closeModalContact}>&times;</span>
            <h2>Nhận thêm thông tin về dự án {estate.name}</h2>
            <div className={styles.descriptionModal}>
              Đăng ký nhận thông tin về các dự án để luôn cập nhật những cơ hội
              <br /> đầu tư hấp dẫn và tin tức mới nhất. Bạn sẽ nhận được
              <br /> thông báo về tiến độ, cơ hội đặc biệt, cũng
              <br /> như các thay đổi quan trọng từ các dự
              <br /> án uy tín. 
              
              <br /><br />Đừng bỏ lỡ cơ hội để nắm bắt thông tin kịp thời
              <br /> và đưa ra quyết định đầu tư chính xác!
            </div>
            <form onSubmit={(e) => { e.preventDefault(); handleContact(); }}>
              <div className={styles.formGroup}>
                <input
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
                  type="email"
                  id="email"
                  value={email}
                  placeholder="Email"
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              {error && <div className={styles.error}>{error}</div>}
              <button type="submit" className={styles.submitButton}>Đăng ký</button>
            </form>
          </div>
        </div>
      )}
      
      {selectedImage && (
        <div className={styles.overlay} onClick={() => setSelectedImage(null)}>
          <div className={styles.enlargedImageContainer} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged" className={styles.enlargedImage} />
            <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>×</button>
          </div>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default Estate;
