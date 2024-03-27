import React, { Fragment, useEffect, useRef, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import HeaderPayment from './PaymentComponents/HeaderPayment';
import GeneralInfo from './PaymentComponents/GeneralInfo';
import { Col, Row } from 'react-bootstrap';
import QrImage from './PaymentComponents/QrImage';
import PaymentInformation from './PaymentComponents/PaymentInformation';

const theme = createTheme({
    palette: {
        primary: {
            main: '#dfa974',
        },
    },
});


function Payment() {
    const navigate = useNavigate();
    // hiển thị trang
    const [isVisible, setIsVisible] = useState(true);

    // số người
    const [numPeople, setNumPeople] = useState(2);

    // menu được chọn
    const [selectedMenu, setSelectedMenu] = useState({});

    // thời gian được chọn
    const [selectedTimeSlot, setSelectedTimeSlot] = useState({});

    // thông tin người đặt bàn
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        email: '',
        note: ''
    });

    // tên sảnh
    const [roomName, setRoomName] = useState('');

    // thông tin thanh toán
    const [paymentInfo, setPaymentInfo] = useState({});

    // đổi màu thông tin thanh toán dựa trên màu của thông tin chung
    const [isActivePaymentInfo, setIsActivePaymentInfo] = useState(false);
    const changeActivePaymentInfo = (data) => {
        setIsActivePaymentInfo(data);
    }

    // interval query kết quả thanh toán
    // const [intervalQueryId, setIntervalQueryId] = useState(null);
    const intervalQueryIdRef = useRef(null);

    // query kết quả thanh toán
    const queryBooking = async (bookingId) => {
        try {
            let response = await axios.post(`${process.env.URL_BACKEND || 'http://10.8.103.27:3000'}/booking/query`, { bookingId });
            response = response?.data
            if (response?.code === 1000) {
                response = response?.data
                if (response?.status === 'PAID') {
                    return true;
                }
            }
        } catch (error) {
            console.log(`ERROR when call /query/booking  ${error.message} -- ${JSON.stringify(error)}`);
        }
        return false;
    }

    // kích hoạt interval query kết quả thanh toán
    const intervalQueryBooking = async (bookingId) => {
        try {
            const id = setInterval(async () => {
                const result = await queryBooking(bookingId);
                if (result === true) {
                    clearInterval(intervalQueryIdRef.current);
                    navigateToPaymentSuccess();
                }
            }, 10000);
            intervalQueryIdRef.current = id;
        } catch (error) {
            console.log(`ERROR when call interval  ${error.message} -- ${JSON.stringify(error)}`);
        }
    }

    const location = useLocation();
    const receivedData = location?.state?.data

    const navigateToHome = () => {
        try {
            navigate('/', { state: { data: {} } });
        } catch (error) {
            console.log(error);
        }
    }

    const navigateToPaymentSuccess = () => {
        try {
            navigate('/paymentSuccess', { state: { data: { email: receivedData?.userInfo?.email } } });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        window.scrollTo(0, 0);

        // chuyển về trang hom nếu không có data
        if (_.isEmpty(receivedData)) {
            navigateToHome();
        }
        const { numPeople, selectedMenu, selectedTimeSlot, userInfo } = receivedData;
        if (_.isNil(numPeople) || _.isEmpty(selectedMenu) || _.isEmpty(selectedTimeSlot)) {
            navigateToHome();
        }

        setNumPeople(numPeople);
        setSelectedMenu(selectedMenu);
        setSelectedTimeSlot(selectedTimeSlot);
        setUserInfo(userInfo);

        // gọi tạo thanh toán
        const createBooking = async () => {
            try {
                if (intervalQueryIdRef.current) {
                    clearInterval(intervalQueryIdRef.current);
                }
                const requestData = {
                    contactName: userInfo?.name,
                    contactPhone: userInfo?.phone,
                    contactEmail: userInfo?.email,
                    note: userInfo?.note,
                    totalCustomer: numPeople,
                    menuId: selectedMenu?.id,
                    from: selectedTimeSlot?.from,
                    to: selectedTimeSlot?.to
                }
                let bookingResult = await axios.post(`${process.env.URL_BACKEND || 'http://10.8.103.27:3000'}/booking`, requestData, { timeout: 60000 });
                // let bookingResult = {
                //     data: {
                //         code: 1000,
                //         data: {
                //             bookingId: 'b165136',
                //             amount: 450000,
                //             qrContent: '00020101021238610010A000000727013100069704520117101094217005364930208QRIBFTTA530370454068500005802VN62280815TT PIDXPOOWIPO19905PAYME6304B252',
                //             bankInfo: {
                //                 number: '156036123156',
                //                 fullName: 'TRAN THANH CONG',
                //                 bankName: 'KIEN LONG',
                //                 branch: 'TP.Hồ Chí Minh',
                //                 content: 'TT PIDXPOOWIPO1'
                //             },
                //             roomName: 'Fall in love'
                //         }
                //     }
                // }
                bookingResult = bookingResult?.data;
                if (bookingResult?.code === 1000) {
                    bookingResult = bookingResult?.data;
                    setRoomName(bookingResult?.roomName);
                    setPaymentInfo(_.pick(bookingResult, ['qrContent', 'bankInfo', 'bookingId', 'amount']));
                    intervalQueryBooking(bookingResult?.bookingId)
                }
            } catch (error) {
                console.log(`ERROR when call booking ${error.message} -- ${JSON.stringify(error)}`);
            }
            // tắt loading màn hình
            setIsVisible(false);
        }

        createBooking();

        return () => {
            if (intervalQueryIdRef.current) {
                clearInterval(intervalQueryIdRef.current);
            }
        };
    }, []);

    return (
        <Fragment>
            {/* <Menu siteInfo={siteInfo} /> */}
            {isVisible && (
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            )}

            {/* header của payment */}
            <section className="hp-room-section" style={{ paddingTop: '20px' }} >
                <div className="container-fluid">
                    <HeaderPayment />
                </div>
            </section>

            {/* <!-- Thông tin người đặt, tên menu, thời gian --> */}
            <section className="hp-room-section" style={{ paddingTop: '20px' }} >
                <div className="container-fluid">
                    <GeneralInfo
                        numPeople={numPeople}
                        selectedMenu={selectedMenu}
                        selectedTimeSlot={selectedTimeSlot}
                        userInfo={userInfo}
                        total={paymentInfo?.amount}
                        roomName={roomName}
                        changeActivePaymentInfo={changeActivePaymentInfo} />
                </div>
            </section>

            {/* hình mã qr và thông tin chuyển khoản */}
            <section className="hp-room-section" style={{ paddingTop: '20px', paddingBottom: '40px' }} >
                <div className="container-fluid">
                    <Row>
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <QrImage qrContent={paymentInfo?.qrContent} />
                        </Col>
                        {/* thông tin chuyển khoản */}
                        <Col lg={6} md={6} sm={12} xs={12}>
                            <PaymentInformation isActivePaymentInfo={isActivePaymentInfo} paymentInfo={paymentInfo} />
                        </Col>
                    </Row>
                </div>
            </section>

            <Footer />
        </Fragment >
    )
}

export default Payment;