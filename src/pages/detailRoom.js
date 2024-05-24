import React, { Fragment, useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';
import SlideImage from './GeneralComponents/slideImage';
import { useLocation, useNavigate } from 'react-router-dom';
import _ from 'lodash';
import Footer from './footer';
import { Box, CircularProgress, createTheme } from '@mui/material';
import { ThemeProvider } from 'react-bootstrap';
import HeaderDetailRoom from './DetailRoomComponents/HeaderDetailRoom';

const theme = createTheme({
    palette: {
        primary: {
            main: '#eabe6c',
        },
    },
});

function DetailRoom() {
    const navigate = useNavigate();

    // load màn hình ban đầu
    const [isVisible, setIsVisible] = useState(true);

    // danh sách hình ảnh của sảnh
    const [images, setImages] = useState([])

    // data khi dùng navigate để chuyển trang
    const location = useLocation();
    const receivedData = location?.state?.data;

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
        if (_.isEmpty(receivedData) || _.isEmpty(receivedData?.images)) {
            navigateToHome();
        }

        setImages(receivedData?.images);


        // hiển thị loading khi init màn hình 
        setTimeout(() => {
            setIsVisible(false);
        }, 300)

    }, []);

    return (
        <Fragment>
            {/* <Menu siteInfo={siteInfo} /> */}
            {isVisible && (
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            )}

            <section className="hp-room-section" style={{ paddingTop: '30px' }} >
                <div className="container-fluid">
                    <HeaderDetailRoom />
                </div>
            </section>

            <section className="hp-room-section" style={{ paddingTop: '10px', marginBottom: '-10px' }} >
                <div className="container-fluid">
                    {!_.isEmpty(images) ? <div className="hp-room-items">
                        <div className="row">
                            <SlideImage imageHomeList={images} />
                        </div>
                    </div> : <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '20px' }}>
                        <ThemeProvider theme={theme}>
                            <CircularProgress />
                        </ThemeProvider>
                    </Box>}

                </div>
            </section>

            <Footer />
        </Fragment>
    );
}

export default DetailRoom;
