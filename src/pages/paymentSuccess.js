import React, { Fragment, useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import HeaderPaymentSuccess from './PaymentSuccessComponents/HeaderPaymentSuccess';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import Footer from './footer';

function PaymentSuccess() {
  const navigate = useNavigate();

  // load màn hình ban đầu
  const [isVisible, setIsVisible] = useState(true);

  // data khi dùng navigate để chuyển trang
  const location = useLocation();
  const receivedData = location?.state?.data;

  // email của người đặt bàn
  const [userEmail, setUserEmail] = useState('');

  // redirect về home
  const navigateToHome = () => {
    try {
      navigate('/', { state: { data: {} } });
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {

    window.scrollTo(0, 0);

    // chuyển về trang homE nếu không có data
    if (_.isEmpty(receivedData) || _.isEmpty(receivedData?.email)) {
      navigateToHome();
    }

    setUserEmail(receivedData?.email);

    // hiển thị loading khi init màn hình 
    setTimeout(() => {
      setIsVisible(false);
    }, 1000)

  }, []);

  return (
    <Fragment>
      {/* <Menu siteInfo={siteInfo} /> */}
      {isVisible && (
        <div id="preloder">
          <div className="loader"></div>
        </div>
      )}

      <section className="hp-room-section" style={{ paddingTop: '50px' }} >
        <div className="container-fluid">
          <HeaderPaymentSuccess />
        </div>
      </section>

      <section className="hp-room-section" style={{ paddingTop: '30px', paddingBottom: '20px' }}>
        <div className="container-fluid">
          <div
            style={{
              backgroundColor: 'white',
              padding: '30px',
              borderRadius: '4px',
              margin: '0 auto',
              textAlign: 'center'
            }}
          >
            <div
              style={{
                borderRadius: 200,
                height: 200,
                width: 200,
                background: '#F8FAF5',
                margin: '0 auto'
              }}
            >
              <i className='checkmark' style={{
                color: 'darkorange',
                fontSize: '110px',

              }}>✓</i>
            </div>
            <p className='protest-strike-regular' style={{ marginTop: '30px', fontSize: '30px' }}>Đặt bàn thành công</p>
            <br />
            <p>
              Thông tin <span style={{ fontWeight: 'bold' }}>xác nhận đặt bàn thành công</span>đã
              được gửi tới email <b>{userEmail}</b><br /> <span style={{ color: 'red', fontSize: '13px' }}>*Vui lòng kiểm tra hộp thư đến hoặc hộp thư spam để nhận những thông tin đặt bàn phục vụ cho bữa tối của bạn nhé.</span><br /> <br />
            </p>
          </div>
          {/* <UserInformationBooking changeUserInfo={changeUserInfo} checkIsValid={checkIsValid} /> */}
        </div>
      </section>

      <Footer />
    </Fragment>
  );
}

export default PaymentSuccess;
