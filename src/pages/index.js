import React, { Fragment, useEffect, useState } from 'react';
import Menu from './menu';
import axios from 'axios';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import Footer from './footer';
import { Col, Row } from 'react-bootstrap';
import NumberOfPeopleInput from './IndexComponents/numberPeopleInput';
import 'bootstrap/dist/css/bootstrap.min.css';
import SlideImage from './GeneralComponents/slideImage';
import MenuList from './IndexComponents/MenuList';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Button from '@mui/material/Button';
import TimeTable from './IndexComponents/TimeTable';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const theme = createTheme({
    palette: {
        primary: {
            main: '#dfa974',
        },
    },
});


function Index() {
    const navigate = useNavigate();
    // danh sách tổng các menu
    const [menuList, setMenuList] = useState({});

    // danh sách menu theo số người
    const [menuByPeople, setMenuByPeople] = useState([]);

    // menu được chọn bởi user
    const [selectedMenu, setSelectedMenu] = useState({});
    const selectMenuByUser = (menu) => {
        setSelectedMenu(menu)
    }

    // số khách hàng
    const [numPeople, setNumPeople] = useState(2);
    const changeNumPeople = (data) => {
        setNumPeople(data)
        setMenuByPeople(menuList[data] || [])
    }

    // khung thời gian chọn
    const [selectedTimeSlot, setSelectedTimeSlot] = useState({});
    const onSelectedTimeSlot = (selectedTime) => {
        setSelectedTimeSlot(selectedTime);
    }

    // kiểm tra active nút xác nhận
    const isActiveConfirmButton = () => {
        if (_.isEmpty(selectedTimeSlot) || _.isEmpty(selectedMenu)) return false;
        return true;
    }

    const [imageHomeList, setImageHomeList] = useState([]);

    // const [siteInfo, setSiteInfo] = useState({});
    const [errorAPI, setErrorAPI] = useState([]);

    const navigateToBooking = () => {
        try {
            if (!isActiveConfirmButton()) return;
            navigate('/booking', { state: { data: { numPeople, selectedMenu, selectedTimeSlot } } });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {

        // lấy danh sách menu 
        const fetchMenuList = async () => {
            try {
                let menuResult = await axios.get(`${process.env.URL_BACKEND || 'http://10.8.103.27:3000'}/menu`, { timeout: 60000 });
                menuResult = menuResult?.data;
                if (menuResult?.code === 1000) {

                    // group danh sách menu theo số người
                    let data = _.map(menuResult?.data, (item) => ({
                        ..._.pick(item, ['name', 'price', 'images', 'items', 'description', 'customerNumber', 'id'])
                    }));
                    data = _.groupBy(data, 'customerNumber');

                    setMenuList(data);
                    setMenuByPeople(data[numPeople])
                }
            } catch (error) {
                console.log(`ERROR when call get list menu ${error.message} -- ${JSON.stringify(error)}`);
            }
        }

        // lấy danh sách sảnh và hình ảnh
        const fetchHome = async () => {
            try {
                let homeResult = await axios.post(`${process.env.URL_BACKEND || 'http://10.8.103.27:3000'}/room/search`, {}, { timeout: 60000 });
                homeResult = homeResult?.data;
                if (homeResult?.code === 1000) {
                    const homeList = homeResult?.data?.rooms;
                    const imageList = _.flatten(_.map(homeList, 'images'));
                    setImageHomeList(imageList);
                }
            } catch (error) {
                console.log(`ERROR when call get list homestay ${error.message} -- ${JSON.stringify(error)}`);
                const errorSearch = [{ api: '/room/search (2)', error: error.message, data: JSON.stringify(error) }];
                setErrorAPI(errorSearch);
            }
        }

        // const fetchInfo = async () => {
        //     try {
        //         let info = await axios.post('https://api.maryjanethehome.me/siteInfo');
        //         info = info?.data;
        //         if (info?.code === 1000) {
        //             setSiteInfo({
        //                 facebook: info?.data?.facebook,
        //                 tiktok: info?.data?.tiktok,
        //                 phoneNumber: info?.data?.phoneNumber,
        //                 zalo: info?.data?.zalo,
        //                 images: info?.data?.images
        //             });
        //         }
        //     } catch (error) {
        //         console.log(`ERROR when call get list homestay ${error.message} -- ${JSON.stringify(error)}`);
        //         setSiteInfo({
        //             facebook: 'Link facebook',
        //             tiktok: 'Link tiktok',
        //             phoneNumber: 'Số điện thoại',
        //             zalo: 'Số zalo',
        //             images: []
        //         });
        //     }
        // }

        if (_.isEmpty(menuList)) {
            fetchMenuList();
        }

        if (_.isEmpty(imageHomeList)) {
            fetchHome();
        }
        // if (_.isEmpty(siteInfo)) {
        //     fetchInfo();
        // }
    }, []);

    return (
        <Fragment>
            <Menu />

            {/* <!-- Danh sách hình banner --> */}
            <section className="hp-room-section" style={{ paddingTop: '0px' }} >
                <div className="container-fluid">
                    <div className="hp-room-items">
                        <div className="row">
                            {!_.isEmpty(imageHomeList) ? <SlideImage imageHomeList={imageHomeList} /> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
                                <ThemeProvider theme={theme}>
                                    <CircularProgress />
                                </ThemeProvider>
                            </Box>}
                        </div>
                    </div>
                </div>
            </section>

            {/* input nhập số người */}
            <section className="hp-room-section" style={{ paddingTop: '0px' }} >
                <div className="container-fluid">
                    <NumberOfPeopleInput change={changeNumPeople} />
                </div>
            </section>

            <section className="hp-room-section" style={{ paddingTop: '0px' }}>
                <div className="container-fluid">
                    <Row>
                        {/* Khung ngày, giờ */}
                        <Col lg={6} md={6} sm={12} xs={12} style={{ paddingTop: '40px' }}>
                            <div style={{ border: '2px solid #dfa974', borderRadius: '10px', padding: '20px 10px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                    <p style={{ fontSize: '1.6em', display: 'flex' }} className='protest-strike-regular'>Chọn ngày/khung giờ: </p>
                                </div>
                                <div style={{ minHeight: '300px' }}>

                                    <TimeTable numPeople={numPeople} onSelectedTimeSlot={onSelectedTimeSlot} />
                                </div>
                                <Row >
                                    <Col xs={10} md={10} sm={10} className='d-flex' style={{ marginTop: '10px' }}>
                                        <div style={{ display: 'flex', fontSize: '12px' }}>
                                            <div style={{ margin: '0 10px 0 0', display: 'flex', alignItems: 'center' }}>
                                                <div style={{ backgroundColor: '#dfa974', width: '70px', height: '20px', margin: '0 4px 0 0', display: 'flex' }}></div> <span>Đã đặt</span>
                                            </div>
                                            <div style={{ margin: '0 10px 0 0', display: 'flex', alignItems: 'center' }}>
                                                <div style={{ backgroundColor: '#white', width: '70px', height: '20px', margin: '0 4px 0 0', border: '1px solid #00000078' }}></div> <span>Còn trống</span>
                                            </div>
                                            <div style={{ margin: '0 10px 0 0', display: 'flex', alignItems: 'center' }}>
                                                <div style={{ backgroundColor: '#42D7F1', width: '70px', height: '20px', margin: '0 4px 0 0' }}></div> <span>Đang chọn</span>
                                            </div>
                                        </div>
                                    </Col>
                                </Row>
                            </div>
                        </Col>
                        {/* Danh sách menu */}
                        <Col lg={6} md={6} sm={12} xs={12} style={{ paddingTop: '40px' }}>
                            <div style={{ borderRadius: '10px', padding: '20px 10px', backgroundColor: '#dfa974' }}>

                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '10px' }}>
                                    <p style={{ color: 'white', fontSize: '1.6em' }} className='protest-strike-regular'>Chọn menu: </p>
                                </div>
                                <MenuList data={menuByPeople} selectedMenuItems={selectMenuByUser} />
                            </div>
                        </Col>

                    </Row>

                </div>
            </section>

            {/* nút xác nhận */}
            <section className="hp-room-section" style={{ paddingTop: '50px', marginBottom: '20px' }}>
                <div className="container-fluid">
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                        <ThemeProvider theme={theme}>
                            <Button className={isActiveConfirmButton() ? 'dancing' : ''} variant={isActiveConfirmButton() ? 'contained' : 'outlined'} size="large" style={{ fontWeight: 'bolder', cursor: `${isActiveConfirmButton() ? '' : 'not-allowed'}` }} onClick={() => navigateToBooking()}>
                                Xác nhận
                            </Button>
                        </ThemeProvider>
                        {/* <button disabled={!showConfirmButton} className={`confirm-time-booking ${showConfirmButton ? '' : 'disabled-btn'}`} onClick={() => navigateToDetail()} style={{ minWidth: '100px', marginTop: '5px' }} > Xác nhận</button> */}
                    </div>
                </div>
            </section>

            <Footer />
        </Fragment >
    )
}

export default Index;