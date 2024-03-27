import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import _ from 'lodash';
import axios from 'axios';

const theme = createTheme({
    palette: {
        primary: {
            main: '#dfa974',
        },
    },
});

function HeaderPayment({ numPeople, selectedMenu, selectedTimeSlot, userInfo, paymentInfo }) {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const buttonStyle = {
        color: 'white', // Màu chữ trắng
        backgroundColor: '#dfa974', // Màu nền theo ý muốn của bạn
        borderColor: '#dfa974', // Màu viền theo ý muốn của bạn
        marginBottom: '10px',
        fontSize: '16px'
    };

    const buttonInActiveStyle = {
        color: '#dfa974', // Màu chữ trắng
        backgroundColor: 'transparent', // Màu nền theo ý muốn của bạn
        borderColor: '#dfa974', // Màu viền theo ý muốn của bạn
        marginBottom: '10px',
        fontSize: '16px'
    };

    const navigateToBooking = () => {
        try {
            // gọi hủy thanh toán
            if (!_.isNil(paymentInfo?.bookingId)) {
                deletePayment({ bookingId: paymentInfo?.bookingId });
            }

            navigate('/booking', { state: { data: { numPeople, selectedMenu, selectedTimeSlot, userInfo } } });
        } catch (error) {
            console.log(error);
        }
    }

    const deletePayment = async ({ bookingId }) => {
        try {
            const requestData = {
                bookingId
            }
            let deletedResult = await axios.post(`${process.env.REACT_APP_URL_BACKEND || 'http://10.8.103.27:3000'}/booking/delete`, requestData, { timeout: 60000 });
        } catch (error) {
            console.log(`ERROR when call delete booking ${error.message} -- ${JSON.stringify(error)}`);
        }
    }

    useEffect(() => { }, []);

    return (
        <Container>
            <Row style={{ marginBottom: '30px' }}>
                <Col xs={6} md={6} sm={6}>
                    <ThemeProvider theme={theme}>

                        <Button
                            onClick={handleShow}
                            startIcon={<KeyboardBackspaceOutlinedIcon />}
                        >
                            Trở về
                        </Button>
                    </ThemeProvider>
                </Col>

            </Row>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <h1 className='protest-strike-regular' style={{ fontSize: '2.2em' }}> Thông tin thanh toán </h1>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='md'
                centered={true}
            >
                <Modal.Body>
                    Các thông tin thanh toán sẽ bị hủy. Bạn có chắc chắn muốn quay trở lại trang chủ
                </Modal.Body>
                <Modal.Footer>
                    <Button autoFocus variant="secondary" style={buttonStyle} onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="primary" style={buttonInActiveStyle} onClick={navigateToBooking}>Có</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default HeaderPayment;