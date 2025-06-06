import React, { useEffect, useState } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import styles from './PrivacyPolicy.module.css';
import Navbar from '../../components/NavBarInvisible/Navbar';
import Footer from '../../components/Footer/Footer';

const API_URL = process.env.REACT_APP_API_URL;
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PrivacyPolicy: React.FC = () => {
  const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  const phoneRegex = /^(0[3|5|7|8|9])+([0-9]{8})$/;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  const openModal = () => {
    console.log('Open modal clicked');
    setIsModalOpen(true);
    console.log('Modal state:', isModalOpen);
  };

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

  return (
    <div className={styles.container}>
      <Navbar openModal={openModal} />
      <div className={styles.privacyPolicyHeader}>
        Privacy Policy
      </div>

        <div className={styles.privacyPolicyBody}>
        <h2>Chính Sách Bảo Mật của Spy Estate</h2>
        <p><strong>Cập nhật lần cuối: 05-06-2025</strong></p>

        <h3>Giới thiệu</h3>
        <p>
            Spy Estate cung cấp các công nghệ, sản phẩm và dịch vụ được sử dụng bởi khách hàng của chúng tôi trong ngành bất động sản. Chúng tôi cam kết bảo vệ quyền riêng tư của bạn và thông qua chính sách bảo mật này, chúng tôi sẽ giải thích cách chúng tôi thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn khi bạn sử dụng trang web hoặc dịch vụ của Spy Estate.
        </p>
        <p>
            Chính sách bảo mật này áp dụng cho tất cả người dùng truy cập vào trang web của chúng tôi, và bao gồm các thông tin thu thập từ bạn khi bạn tương tác với các dịch vụ và sản phẩm của chúng tôi.
        </p>

        <h3>Thông Tin Cá Nhân Chúng Tôi Thu Thập</h3>
        <p>
            Spy Estate có thể thu thập thông tin cá nhân của bạn theo nhiều cách khác nhau khi bạn truy cập và sử dụng trang web hoặc dịch vụ của chúng tôi. Các thông tin này có thể bao gồm:
        </p>
        <ul>
            <li><strong>Thông tin bạn cung cấp cho chúng tôi</strong>: Thông tin liên hệ như tên, email, số điện thoại; các phản hồi hoặc thông tin bạn cung cấp khi liên hệ với chúng tôi để đưa ra câu hỏi, phản hồi hoặc yêu cầu hỗ trợ; thông tin marketing và sở thích liên quan đến các hoạt động của chúng tôi, các sự kiện, và các chương trình khuyến mãi.</li>
            <li><strong>Thông tin thu thập tự động</strong>: Dữ liệu thiết bị như loại và phiên bản hệ điều hành của máy tính hoặc thiết bị di động, kiểu máy, loại trình duyệt, địa chỉ IP và các thông tin khác liên quan đến việc truy cập của bạn; Dữ liệu hoạt động trực tuyến như các trang bạn đã xem, thời gian bạn dành trên các trang đó, lịch sử duyệt web và các hoạt động tương tác khác với các dịch vụ của chúng tôi.</li>
            <li><strong>Thông tin từ các bên thứ ba</strong>: Thông tin từ các mạng xã hội như Facebook, Instagram, LinkedIn mà chúng tôi có thể thu thập khi bạn tương tác với các trang của chúng tôi trên các nền tảng này.</li>
        </ul>

        <h3>Cách Chúng Tôi Sử Dụng Thông Tin Cá Nhân Của Bạn</h3>
        <p>
            Chúng tôi có thể sử dụng thông tin cá nhân của bạn với những mục đích sau:
        </p>
        <ul>
            <li><strong>Cung cấp và vận hành dịch vụ</strong>: Cung cấp, vận hành và cải tiến các dịch vụ của chúng tôi và các dịch vụ liên quan đến khách hàng; Gửi các thông báo quan trọng liên quan đến dịch vụ, bao gồm thông báo về cập nhật, bảo mật và hỗ trợ.</li>
            <li><strong>Tiếp thị và quảng cáo</strong>: Nếu bạn đồng ý nhận các thông tin tiếp thị, chúng tôi có thể gửi thông tin về các chương trình khuyến mãi, sự kiện hoặc các cơ hội đầu tư bất động sản qua email hoặc tin nhắn SMS. Bạn có thể lựa chọn không nhận các thông báo tiếp thị này bằng cách hủy đăng ký hoặc thay đổi tùy chọn trong phần cài đặt tài khoản của mình.</li>
            <li><strong>Tuân thủ pháp luật</strong>: Chúng tôi có thể sử dụng thông tin cá nhân của bạn khi cần thiết để tuân thủ các yêu cầu pháp lý hoặc các yêu cầu từ cơ quan chức năng.</li>
            <li><strong>Bảo mật và phòng chống gian lận</strong>: Để bảo vệ quyền lợi của chúng tôi, quyền lợi của bạn và các bên khác, chúng tôi có thể sử dụng thông tin để phát hiện, ngăn chặn hành vi gian lận hoặc vi phạm các điều khoản sử dụng của chúng tôi.</li>
        </ul>

        <h3>Chúng Tôi Chia Sẻ Thông Tin Của Bạn Với Ai</h3>
        <p>
            Chúng tôi không "bán" thông tin cá nhân của bạn, nhưng chúng tôi có thể chia sẻ thông tin với các đối tượng sau:
        </p>
        <ul>
            <li><strong>Các đối tác và nhà cung cấp dịch vụ</strong>: Các công ty cung cấp dịch vụ hỗ trợ cho chúng tôi như lưu trữ, phân tích web, gửi email hoặc các dịch vụ marketing.</li>
            <li><strong>Các cơ quan chức năng</strong>: Nếu có yêu cầu từ các cơ quan chức năng hoặc trong trường hợp cần thiết để bảo vệ quyền lợi hợp pháp của chúng tôi, chúng tôi có thể chia sẻ thông tin của bạn.</li>
        </ul>

        <h3>Lựa Chọn và Quyền Riêng Tư của Bạn</h3>
        <p>
            Bạn có quyền kiểm soát thông tin cá nhân của mình. Bạn có thể:
        </p>
        <ul>
            <li><strong>Hủy nhận thông tin tiếp thị</strong>: Bạn có thể từ chối nhận các thông báo tiếp thị qua email hoặc tin nhắn bằng cách thay đổi cài đặt tài khoản của mình.</li>
            <li><strong>Quyền yêu cầu truy cập hoặc chỉnh sửa thông tin cá nhân</strong>: Bạn có thể yêu cầu chúng tôi cung cấp thông tin cá nhân mà chúng tôi đã thu thập hoặc yêu cầu chỉnh sửa thông tin không chính xác.</li>
            <li><strong>Yêu cầu xóa thông tin cá nhân</strong>: Bạn có thể yêu cầu chúng tôi xóa thông tin cá nhân nếu không còn cần thiết cho các mục đích mà chúng tôi đã thu thập.</li>
        </ul>

        <h3>Bảo Mật Thông Tin Cá Nhân</h3>
        <p>
            Chúng tôi sử dụng các biện pháp bảo mật hợp lý để bảo vệ thông tin cá nhân của bạn khỏi mất mát, truy cập trái phép hoặc tiết lộ không mong muốn. Tuy nhiên, không có phương thức truyền tải qua Internet hoặc phương thức lưu trữ điện tử nào là 100% an toàn. Chúng tôi cam kết bảo vệ thông tin của bạn nhưng không thể đảm bảo an toàn tuyệt đối.
        </p>

        <h3>Thay Đổi Chính Sách Bảo Mật</h3>
        <p>
            Chúng tôi có thể thay đổi chính sách bảo mật này bất cứ lúc nào. Nếu có thay đổi quan trọng, chúng tôi sẽ thông báo cho bạn thông qua việc cập nhật ngày tháng của chính sách bảo mật và công khai trên trang web.
        </p>

        <h3>Liên Hệ Với Chúng Tôi</h3>
        <p>
            Nếu bạn có bất kỳ câu hỏi nào liên quan đến chính sách bảo mật của chúng tôi, vui lòng liên hệ với chúng tôi qua email: <a href="mailto:TheSpyEstate@gmail.com">TheSpyEstate@gmail.com</a>.
        </p>
        </div>

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
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
