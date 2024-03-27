import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Modal } from 'react-bootstrap';
import QRCode from 'qrcode.react';
import { useNavigate } from 'react-router-dom';
import { BiStopwatch } from 'react-icons/bi';
import _ from 'lodash';
// import { _ } from 'numeral';

const CountdownTimer = ({ initialTime, backToHome }) => {
    const [time, setTime] = useState(5 * 60);

    useEffect(() => {
        setTime(initialTime);

        const timer = setInterval(() => {
            setTime((prevTime) => {
                if (prevTime === 0) {
                    clearInterval(timer);
                    backToHome();
                }
                return prevTime - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [initialTime]);

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    return (
        <Container>
            <Row>
                <Col className="text-center" style={{ marginTop: '5px', padding: '0px', display: 'flex', justifyContent: 'center' }}>
                    <BiStopwatch style={{ fontSize: 24, marginBottom: 10, display: 'flex', marginRight: '5px' }} />
                    <p style={{ margin: '0px', padding: '0px', display: 'flex' }}>{formatTime(time)}</p>
                </Col>
            </Row>
        </Container>
    );
};

function QrImage({ qrContent }) {
    const navigate = useNavigate();

    // thời gian count down qr code, 5 phút
    const timeCountDownQrCodeByMinutes = 5;
    const timeCountDownQrCode = timeCountDownQrCodeByMinutes * 60;

    // thời gian count down về trang chủ, 5 giây
    const [timeCountDownBackToHome, setCountDownBackToHome] = useState(5);
    // interval để giảm thời gian về trang chủ
    const [timerBackToHome, setTimerBackToHome] = useState();

    // show modal thông báo trở về home
    const [show, setShow] = useState(false);

    const backToHome = () => {
        setShow(true);
        setTimerBackToHome(setInterval(() => {
            setCountDownBackToHome((prevTime) => {
                if (prevTime === 0) {
                    navigate('/booking', { state: { data: {} } });
                }
                return prevTime - 1;
            });
        }, 1000));
    }

    const containerStyle = {
        // border: '1px solid #dfa974',
        // borderRadius: '20px',
        padding: '30px 20px 10px 20px'
    }

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${String(minutes).padStart(2, '0')}:${String(remainingSeconds).padStart(2, '0')}`;
    };

    useEffect(() => {
        return () => { if (!_.isNil(timerBackToHome)) clearInterval(timerBackToHome) };
    }, [qrContent]);

    return (
        <Container style={containerStyle}>
            <div style={{ textAlign: 'center', alignItems: 'center' }}>
                <QRCode value={qrContent} size={250} style={{ paddingTop: '10px' }} />
                <CountdownTimer initialTime={timeCountDownQrCode} backToHome={backToHome} />
                <p style={{ fontSize: '12px', color: 'red', marginBottom: '10px', marginTop: '-10px' }}> * LƯU Ý: Mã thanh toán chỉ có hiệu lực trong {timeCountDownQrCodeByMinutes} PHÚT.</p>
            </div>
            <Modal
                show={show}
                backdrop="static"
                keyboard={false}
                size='md'
                centered={true}
            >
                <Modal.Body>
                    Đã hết thời gian hiệu lực thanh toán. Quay trở về trang chủ trong {formatTime(timeCountDownBackToHome)} giây
                </Modal.Body>
            </Modal>
        </Container>
    );
}

export default QrImage;