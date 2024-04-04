import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import KeyboardBackspaceOutlinedIcon from '@mui/icons-material/KeyboardBackspaceOutlined';
import _ from 'lodash';

const theme = createTheme({
    palette: {
        primary: {
            main: '#9f8d83'
        },
    },
});

function HeaderBooking({ userInfo }) {
    const navigate = useNavigate();

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => {
        // kiểm tra đã có thông tin chưa, nếu chưa thì k hiển thị model
        let hasUserInfo = _.pickBy(userInfo, (value) => !_.isEmpty(value));
        if (_.isEmpty(hasUserInfo)) {
            navigateToHome();
            return;
        }

        setShow(true)
    };

    const buttonStyle = {
        color: 'white', // Màu chữ trắng
        backgroundColor: '#9f8d83', // Màu nền theo ý muốn của bạn
        borderColor: '#9f8d83', // Màu viền theo ý muốn của bạn
        marginBottom: '10px',
        fontSize: '16px'
    };

    const buttonInActiveStyle = {
        color: '#9f8d83', // Màu chữ trắng
        backgroundColor: 'transparent', // Màu nền theo ý muốn của bạn
        borderColor: '#9f8d83', // Màu viền theo ý muốn của bạn
        marginBottom: '10px',
        fontSize: '16px'
    };

    const navigateToHome = () => {
        try {
            navigate('/', {});
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { }, [userInfo]);

    return (
        <Container>
            <Row style={{ marginBottom: '30px' }}>
                <Col xs={4} md={4} sm={4}>
                    <Button
                        className='back-button'
                        onClick={handleShow}
                        startIcon={<KeyboardBackspaceOutlinedIcon />}
                    >
                        Trở về
                    </Button>
                    <ThemeProvider theme={theme}>
                    </ThemeProvider>
                </Col>

            </Row>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} >
                <h1 className='protest-strike-regular' style={{ fontSize: '2.2em', color: 'white' }}> Thông tin đặt bàn </h1>
            </div>
            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                size='md'
                centered={true}
            >
                {/* <Modal.Header closeButton={false}>
                    <Modal.Title>Modal title</Modal.Title>
                </Modal.Header> */}
                <Modal.Body>
                    Các thông tin bạn đã điền sẽ bị xóa. Bạn có chắc chắn muốn quay trở lại trang trước
                </Modal.Body>
                <Modal.Footer>
                    <Button autoFocus variant="secondary" style={buttonStyle} onClick={handleClose}>
                        Không
                    </Button>
                    <Button variant="primary" style={buttonInActiveStyle} onClick={navigateToHome}>Có</Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default HeaderBooking;