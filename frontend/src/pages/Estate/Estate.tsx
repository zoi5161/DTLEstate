import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './Estate.module.css';
import Navbar from '../../components/NavBarInvisible/Navbar';

const API_URL = process.env.REACT_APP_API_URL;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const Estate: React.FC = () => {
  const { id } = useParams();
  const location = useLocation();
  const name = location.state?.name;

  const [estate, setEstate] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

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
      <Navbar />
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
          <div className={styles.descriptionContentText}>{estate.description}</div>
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
                <img src="../imagesEstate/interior.png" alt=""/>
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
      {selectedImage && (
        <div className={styles.overlay} onClick={() => setSelectedImage(null)}>
          <div className={styles.enlargedImageContainer} onClick={(e) => e.stopPropagation()}>
            <img src={selectedImage} alt="Enlarged" className={styles.enlargedImage} />
            <button className={styles.closeButton} onClick={() => setSelectedImage(null)}>×</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Estate;
