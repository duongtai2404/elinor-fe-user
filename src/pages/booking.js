import React, { Fragment, useEffect, useState } from 'react';
import axios from 'axios';
import _ from 'lodash';
import { useNavigate, useLocation } from 'react-router-dom';
import Footer from './footer';
import 'bootstrap/dist/css/bootstrap.min.css';
import SlideImage from './GeneralComponents/slideImage';
import HeaderBooking from './BookingComponents/Header';
import ReviewInformationBooking from './BookingComponents/ReviewInfomation';
import UserInformationBooking from './BookingComponents/UserInfomation';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const theme = createTheme({
    palette: {
        primary: {
            main: '#dfa974',
        },
    },
});


function Booking() {
    const navigate = useNavigate();
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
    const changeUserInfo = (data) => {
        setUserInfo(data);
    }

    // thông tin kiểm tra nút đặt bàn
    const [isValidInfo, setIsValidInfo] = useState(false);
    const checkIsValid = (data) => {
        setIsValidInfo(data)
    }

    // chuyển tới trang thanh toán
    const navigateToPayment = () => {
        try {
            if (!isValidInfo) return;

            // kiểm tra thông tin user 1 lần nữa
            const phoneRegex = /^(0[2-9]|84[2-9]|\+84[2-9])\d{8,9}$/;
            const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|icloud\.com)$/;
            const validUserInfo = _.pickBy(userInfo, (value) => _.isEmpty(value));
            if (!_.isEmpty(validUserInfo) || !phoneRegex.test(userInfo?.phone) || !emailRegex.test(userInfo?.email)) {
                setIsValidInfo(false);
                return;
            }

            navigate('/payment', { state: { data: { numPeople, selectedMenu, selectedTimeSlot, userInfo } } });
        } catch (error) {
            console.log(error);
        }
    }

    const location = useLocation();
    const receivedData = location?.state?.data;

    const navigateToHome = () => {
        try {
            navigate('/', { state: { data: {} } });
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

        if (_.isNil(receivedData?.numPeople) || _.isEmpty(receivedData?.selectedMenu) || _.isEmpty(receivedData?.selectedTimeSlot)) {
            navigateToHome();
        }

        setNumPeople(receivedData?.numPeople);
        setSelectedMenu(receivedData?.selectedMenu);
        setSelectedTimeSlot(receivedData?.selectedTimeSlot);
        if (!_.isEmpty(receivedData?.userInfo)) {
            setUserInfo(receivedData?.userInfo);
            setIsValidInfo(true);
        }

        // hiển thị loading khi init màn hình 
        setTimeout(() => {
            setIsVisible(false);
        }, 1000)

    }, [receivedData]);

    return (
        <Fragment>
            {/* <Menu siteInfo={siteInfo} /> */}
            {isVisible && (
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            )}

            <section className="hp-room-section" style={{ paddingTop: '20px' }} >
                <div className="container-fluid">
                    <HeaderBooking userInfo={userInfo} />
                </div>
            </section>

            {/* <!-- Danh sách hình các món ăn --> */}
            <section className="hp-room-section" style={{ paddingTop: '0px' }} >
                <div className="container-fluid">
                    {!_.isEmpty(selectedMenu?.images) ? <div className="hp-room-items">
                        <div className="row">
                            <SlideImage imageHomeList={selectedMenu?.images} />
                        </div>
                    </div> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
                        <ThemeProvider theme={theme}>
                            <CircularProgress />
                        </ThemeProvider>
                    </Box>}

                </div>
            </section>

            {/* review thông tin chung */}
            <section className="hp-room-section" style={{ paddingTop: '0px' }} >
                <div className="container-fluid">
                    <ReviewInformationBooking numPeople={numPeople} selectedMenu={selectedMenu} selectedTimeSlot={selectedTimeSlot} />
                </div>
            </section>

            {/* Thông tin xác nhận đặt bàn */}
            <section className="hp-room-section" style={{ paddingTop: '40px' }}>
                <div className="container-fluid">
                    <UserInformationBooking userInfo={userInfo} changeUserInfo={changeUserInfo} checkIsValid={checkIsValid} />
                </div>
            </section>

            <section className="hp-room-section" style={{ paddingTop: '40px', paddingBottom: '20px' }}>
                <div className="container-fluid">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <ThemeProvider theme={theme}>
                            <Button className={isValidInfo ? 'dancing' : ''} variant={isValidInfo ? 'contained' : 'outlined'} size="large" style={{ fontWeight: 'bolder', cursor: `${isValidInfo ? '' : 'not-allowed'}` }} onClick={() => navigateToPayment()}>
                                Đặt bàn
                            </Button>
                        </ThemeProvider>
                    </div>
                </div>
            </section>

            <Footer />
        </Fragment >
    )
}

export default Booking;