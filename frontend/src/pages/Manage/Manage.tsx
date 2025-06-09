import React, { useState, ChangeEvent, FormEvent, useEffect } from 'react';
import styles from './Manage.module.css';

const Manage: React.FC = () => {
  const tags = ['estates', 'customers', 'members', 'hots'];
  const [activeTag, setActiveTag] = useState<string>('estates');
  const [searchValue, setSearchValue] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [estates, setEstates] = useState<any[]>([]);
  const [activeEstateId, setActiveEstateId] = useState<string | null>(null);
  const [news, setNews] = useState<any[]>([]);
  const [staff, setStaff] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const API_URL = process.env.REACT_APP_API_URL;
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

  const [formData, setFormData] = useState({
    name: '',
    images: [] as File[],
    address: '',
    imageAddress: null as File | null,
    slogan: '',
    price: '',
    area: '',
    startSell: '',
    description: '',
    status: '',
    buyerAgentFee: '',
    lifestyles: '',
    viewDescription: '',
    utilities: '',
  });

  const filteredEstates = estates.filter((estate) => 
    estate.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  const filteredNews = news.filter((item) => {
    const matchSearch =
      item.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.email.toLowerCase().includes(searchValue.toLowerCase());

    // Lọc theo ngày
    const createdAt = new Date(item.createdAt).toISOString().split('T')[0]; // YYYY-MM-DD
    const isWithinDateRange =
      (!startDate || createdAt >= startDate) &&
      (!endDate || createdAt <= endDate);

    return matchSearch && isWithinDateRange;
  });


  const filteredStaff = staff.filter((item) => {
    const matchSearch =
      item.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
      item.email.toLowerCase().includes(searchValue.toLowerCase());

    const createdAt = new Date(item.createdAt).toISOString().split('T')[0];
    const isWithinDateRange =
      (!startDate || createdAt >= startDate) &&
      (!endDate || createdAt <= endDate);

    return matchSearch && isWithinDateRange;
  });


  const filteredProjects = projects.filter((project) => {
    const matchSearch =
      project.fullName.toLowerCase().includes(searchValue.toLowerCase()) ||
      project.phone.toLowerCase().includes(searchValue.toLowerCase()) ||
      project.email.toLowerCase().includes(searchValue.toLowerCase());

    const createdAt = new Date(project.createdAt).toISOString().split('T')[0];
    const isWithinDateRange =
      (!startDate || createdAt >= startDate) &&
      (!endDate || createdAt <= endDate);

    return matchSearch && isWithinDateRange;
  });


  // Handle input change cho các input thường
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    // Nếu là trường startSell, chuyển đổi giá trị trước khi gán
    if (name === 'startSell') {
      const dateValue = new Date(value); // Tạo đối tượng Date từ giá trị input
      const formattedDate = dateValue.toISOString().split('T')[0]; // Chuyển đổi thành định dạng YYYY-MM-DD
      setFormData((prev) => ({ ...prev, [name]: formattedDate }));
    } else {
      // Các trường khác xử lý bình thường
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle chọn nhiều ảnh images
  const handleImagesChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const filesArray = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: filesArray }));
  };

  // Handle chọn 1 ảnh imageAddress
  const handleImageAddressChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0] ?? null;
    setFormData((prev) => ({ ...prev, imageAddress: file }));
  };

  // Mở popup khi nhấn thêm mới nếu activeTag === 'estates'
  const handleAddNewClick = () => {
    if (activeTag === 'estates') {
      setShowPopup(true);
      setActiveEstateId(null); // Reset ID khi nhấn "Thêm mới"
    }
  };

  const handleDeleteClick = async (estateId: string) => {
    if (window.confirm("Are you sure you want to delete this estate?")) {
      try {
        const response = await fetch(`${API_URL}/estates/${estateId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Error deleting estate');
        }

        // Cập nhật lại danh sách estate sau khi xóa
        alert('Estate deleted successfully');
        setEstates((prevEstates) => prevEstates.filter((estate) => estate._id !== estateId));
      } catch (error) {
        alert('Failed to delete estate: ' + error);
        console.error(error);
      }
    }
  };

  // Đóng popup
  const handleClosePopup = (clearForm: boolean = false) => {
    setShowPopup(false);
    if (clearForm) {
      setFormData({
        name: '',
        images: [],
        address: '',
        imageAddress: null,
        slogan: '',
        price: '',
        area: '',
        startSell: '',
        description: '',
        status: '',
        buyerAgentFee: '',
        lifestyles: '',
        viewDescription: '',
        utilities: '',
      });
    }
  };

  // Xử lý submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const formPayload = new FormData();
    const price = String(formData.price);  // Ép kiểu thành chuỗi nếu cần
    formPayload.append('price', price.replace(/\./g, ''));

    const buyerAgentFee = String(formData.buyerAgentFee || '0'); // Ép kiểu thành chuỗi nếu cần, mặc định '0' nếu null/undefined
    formPayload.append('buyerAgentFee', buyerAgentFee.replace(/\./g, ''));

    formPayload.append('name', formData.name);
    formPayload.append('address', formData.address);
    formPayload.append('slogan', formData.slogan);
    formPayload.append('area', formData.area);
    formPayload.append('startSell', formData.startSell);
    formPayload.append('description', formData.description);
    formPayload.append('status', formData.status);
    formPayload.append('lifestyles', formData.lifestyles);
    formPayload.append('viewDescription', formData.viewDescription);
    formPayload.append('utilities', formData.utilities);

    formData.images.forEach((file) => {
      formPayload.append('images', file);
    });

    if (formData.imageAddress) {
      formPayload.append('imageAddress', formData.imageAddress);
    }

    const url = activeEstateId ? `${API_URL}/estates/${activeEstateId}` : `${API_URL}/estates`;
    try {
      const res = await fetch(url, {
        method: activeEstateId ? 'PUT' : 'POST',
        body: formPayload,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Lỗi server');
      }

      const data = await res.json();
      alert(`Cập nhật thành công estate: ${data.name}`);

      handleClosePopup(true);
    } catch (error) {
      alert('Có lỗi xảy ra: ' + error);
      console.error(error);
    }
  };

  const handleEditClick = (estate: any) => {
  // Lấy thông tin estate và hiển thị trong form
  const formattedStartSell = estate.startSell.split('T')[0];
  setFormData({
    name: estate.name,
    images: [],
    address: estate.address,
    imageAddress: null,
    slogan: estate.slogan,
    price: estate.price,
    area: estate.area,
    startSell: formattedStartSell,
    description: estate.description,
    status: estate.status,
    buyerAgentFee: estate.buyerAgentFee,
    lifestyles: estate.lifestyles,
    viewDescription: estate.viewDescription,
    utilities: estate.utilities,
  });
  setShowPopup(true);
  setActiveEstateId(estate._id);  // Lưu id của estate để dùng khi gửi PUT request
  };

  const fetchEstates = async () => {
    try {
      const response = await fetch(`${API_URL}/estates`, {
        method: 'GET',  // GET để lấy dữ liệu
        credentials: 'include',  // Nếu sử dụng cookies hoặc session
      });

      if (!response.ok) {
        console.error("Error fetching estates:", response.statusText);
        throw new Error('Failed to fetch estates');
      }

      const data = await response.json();
      console.log("Estates data:", data);
      setEstates(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  const fetchNews = async () => {
    try {
      const response = await fetch(`${API_URL}/news`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch news');
      }

      const data = await response.json();
      setNews(data);
    } catch (error) {
      console.error('Error fetching news:', error);
    }
  };

  const fetchStaff = async () => {
    try {
      const response = await fetch(`${API_URL}/staffs`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch staff');
      }

      const data = await response.json();
      setStaff(data);  // Store fetched staff data
    } catch (error) {
      console.error('Error fetching staff:', error);
    }
  };

  const fetchProjects = async () => {
    try {
      const response = await fetch(`${API_URL}/projects`, {
        method: 'GET',
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('Failed to fetch projects');
      }

      const data = await response.json();
      setProjects(data);  // Store fetched projects data
    } catch (error) {
      console.error('Error fetching projects:', error);
    }
  };

  useEffect(() => {
    if (activeTag === 'estates') {
      fetchEstates();
    } else if (activeTag === 'customers') {
      fetchNews();
    } else if (activeTag === 'members') {
      fetchStaff();
    } else if (activeTag === 'hots') {
      fetchProjects();  // Fetch projects when 'hots' tag is active
    }
  }, [activeTag]);

  return (
    <div className={styles.container}>
      <div className={styles.topBar}>
        <div className={styles.groupTags}>
          {tags.map((tag) => (
            <div
              key={tag}
              className={`${styles.Tag} ${activeTag === tag ? styles.activeTag : ''}`}
              onClick={() => setActiveTag(tag)}
            >
              <img
                src={`./imagesManage/${tag}.png`}
                alt={tag.charAt(0).toUpperCase() + tag.slice(1)}
                className={styles.imageTag}
              />
            </div>
          ))}
        </div>

        <div className={styles.search}>
          <input
            type="text"
            className={styles.searchInput}
            placeholder="Tìm kiếm..."
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                // Optionally, handle search on Enter key press
                alert('Tìm kiếm: ' + searchValue);
              }
            }}
          />
          <button
            className={styles.searchButton}
            onClick={() => alert('Tìm kiếm: ' + searchValue)}
            aria-label="Search"
          >
            <img src="./imagesManage/search.png" alt="" className={styles.imageSearch} />
          </button>
        </div>

        <div className={styles.dateFilter}>
          <label>
            Từ:
            <input
              type="date"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
            />
          </label>
          <label>
            Đến:
            <input
              type="date"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            />
          </label>
          <button
            type="button"
            onClick={() => {
              setStartDate('');
              setEndDate('');
            }}
            className={styles.resetDateButton}
          >
            Tất cả
          </button>
        </div>

        <div className={`${styles.addButton} ${activeTag === 'estates' ? '' : styles.disabledButton}`} onClick={activeTag === 'estates' ? handleAddNewClick : undefined}>
          Thêm mới
        </div>
      </div>

      <div className={styles.bodyBar}>
        {activeTag === 'estates' && filteredEstates.length > 0 ? (
          filteredEstates.map((estate) => (
            <div key={estate._id} className={styles.aEstate}>
              <div className={styles.imageEstateContainer}>
                <img src={`${BACKEND_URL}/${estate.images[0]}`} alt={estate.name} className={styles.imageEstate} />
              </div>
              <div className={styles.nameEstate}>{estate.name}</div>
              <div className={styles.groupButtons}>
                <div className={styles.editButton} onClick={() => handleEditClick(estate)}>Chỉnh sửa</div>
                <div className={styles.deleteEstate} onClick={() => handleDeleteClick(estate._id)}>Xoá</div>
              </div>
            </div>
          ))
        ) : activeTag === 'customers' && filteredNews.length > 0 ? (
          filteredNews.map((item) => (
            <div key={item._id} className={styles.newsItem}>
              <div className={styles.newsFullName}>{item.fullName}</div>
              <div className={styles.newsPhone}>{item.phone}</div>
              <div className={styles.newsEmail}>{item.email}</div>
              <div className={styles.newsCreatedAt}>
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : activeTag === 'members' && filteredStaff.length > 0 ? (
          filteredStaff.map((item) => (
            <div key={item._id} className={styles.newsItem}>
              <div className={styles.staffFullName}>{item.fullName}</div>
              <div className={styles.staffPhone}>{item.phone}</div>
              <div className={styles.staffEmail}>{item.email}</div>
              <div className={styles.staffCreatedAt}>
                {new Date(item.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : activeTag === 'hots' && filteredProjects.length > 0 ? (
          filteredProjects.map((project) => (
            <div key={project._id} className={styles.newsItem}>
              <div className={styles.projectFullName}>{project.fullName}</div>
              <div className={styles.projectPhone}>{project.phone}</div>
              <div className={styles.projectEmail}>{project.email}</div>
              <div className={styles.projectSelected}>{project.selectedProject}</div>
              <div className={styles.projectCreatedAt}>
                {new Date(project.createdAt).toLocaleString()}
              </div>
            </div>
          ))
        ) : (
          <div>No content for this tag</div>
        )}
      </div>
      {/* Popup nhập liệu chỉ hiện khi showPopup = true */}
      {showPopup && (
        <div className={styles.popupOverlay}
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              handleClosePopup();  // Chỉ đóng popup khi nhấn ngoài vùng popup
            }
          }}
        >
          <div className={styles.popup}>
            <h2>Thêm mới Estate</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <label>
                Tên dự án:
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Ảnh (chọn đúng 5 ảnh):
                <input
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={handleImagesChange}
                />
              </label>

              <label>
                Địa chỉ:
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Ảnh bản đồ (chọn đúng 1 ảnh):
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageAddressChange}
                />
              </label>

              <label>
                Chính sách:
                <input
                  type="text"
                  name="slogan"
                  value={formData.slogan}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Giá (VNĐ/m²):
                <input
                  type="text"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  placeholder="xxx.xxx.xxx"
                  required
                />
              </label>

              <label>
                Quy mô (m²):
                <input
                  type="number"
                  name="area"
                  value={formData.area}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Ngày mở bán:
                <input
                  type="date"
                  name="startSell"
                  value={formData.startSell}
                  onChange={handleInputChange}
                  required
                />
              </label>

              <label>
                Mô tả dự án:
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  rows={4}
                  required
                />
              </label>

              <label>
                Trạng thái (Chưa mở bán, Đang mở bán, Đã bán hết):
                <input
                  type="text"
                  name="status"
                  value={formData.status}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Hoa hồng môi giới (%):
                <input
                  type="text"
                  name="buyerAgentFee"
                  value={formData.buyerAgentFee}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Phong cách:
                <input
                  type="text"
                  name="lifestyles"
                  value={formData.lifestyles}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Các loại hình:
                <input
                  type="text"
                  name="viewDescription"
                  value={formData.viewDescription}
                  onChange={handleInputChange}
                />
              </label>

              <label>
                Tiện ích:
                <input
                  type="text"
                  name="utilities"
                  value={formData.utilities}
                  onChange={handleInputChange}
                />
              </label>

              <div className={styles.formButtons}>
                <button type="submit">Đăng</button>
                <button type="button" onClick={() => handleClosePopup(true)}>
                  Hủy
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default Manage;