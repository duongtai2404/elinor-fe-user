import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, ListGroup } from 'react-bootstrap';
import numeral from 'numeral';
import moment from 'moment';
import Divider from '@mui/material/Divider';
import NavigateNextOutlinedIcon from '@mui/icons-material/NavigateNextOutlined';
import _ from 'lodash';

function GeneralInfo({ numPeople, selectedMenu, selectedTimeSlot, userInfo, total, tableName, roomName, changeActivePaymentInfo }) {
    // active để tô màu
    const [isActive, setIsActive] = useState(true);

    const myRef = useRef(null);

    const containerStyle = {
        border: '1px solid #9f8d83',
        borderRadius: '20px',
        padding: '30px 20px 10px 20px'
    }

    const headerMenuStyle = {
        color: '#9f8d83', // Màu chữ trắng
        fontWeight: 'bold'
    };

    useEffect(() => {
        // const handleScroll = () => {
        //     if (myRef.current) {
        //         const height = myRef.current.getBoundingClientRect().height;
        //         const top = myRef.current.getBoundingClientRect().top;
        //         if (top < 0 - (height / 2)) {
        //             setIsActive(false)
        //             changeActivePaymentInfo(true);
        //         } else {
        //             setIsActive(true)
        //             changeActivePaymentInfo(false);
        //         }
        //     }
        // };

        // window.addEventListener('scroll', handleScroll);
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };
    }, [numPeople, selectedMenu, selectedTimeSlot]);



    return (
        <Container ref={myRef} className={`test-transaction ${isActive ? 'scroll' : ''}`} style={containerStyle} >
            {/* <div className='test-transaction'><span>Hover Me!</span></div> */}
            < div className='header-booking-info' style={{ textAlign: 'center', marginBottom: '20px' }}>
                <h1 className='protest-strike-regular' style={{ fontSize: '25px', color: isActive ? 'white' : '' }} >{userInfo?.name}</h1>
                <p style={{ marginTop: '10px', fontSize: '1em', color: isActive ? 'white' : '' }}> {`${userInfo?.phone} - ${userInfo?.email}`}</p>
            </div >
            <Divider className='divide-booking-info' style={{ marginBottom: '15px', color: isActive ? 'white' : '' }}>Thông tin bàn</Divider>
            <Row className='justify-content-center body-booking-info'>
                <Col lg={10} md={10} sm={10} xs={10} >
                    <p style={{ fontSize: '1em', color: isActive ? 'white' : '' }}><span style={{ fontWeight: 'bold' }}> <NavigateNextOutlinedIcon /> Sảnh: </span> {roomName}</p>
                    <p style={{ fontSize: '1em', color: isActive ? 'white' : '' }}><span style={{ fontWeight: 'bold' }}> <NavigateNextOutlinedIcon /> Bàn: </span> {tableName}</p>
                    <p style={{ fontSize: '1em', color: isActive ? 'white' : '' }}><span style={{ fontWeight: 'bold' }}> <NavigateNextOutlinedIcon /> Thời gian: </span> {`${moment(selectedTimeSlot?.from).format('DD/MM/YYYY')}  ${moment(selectedTimeSlot?.from).format('HH:mm')} - ${moment(selectedTimeSlot?.to).format('HH:mm')}`}</p>
                    <p style={{ fontSize: '1em', color: isActive ? 'white' : '' }}><span style={{ fontWeight: 'bold' }}> <NavigateNextOutlinedIcon /> Set Menu: </span> {`${numPeople} người - ${selectedMenu?.name}`}</p>
                    <p style={{ fontSize: '1em', color: isActive ? 'white' : '' }}><span style={{ fontWeight: 'bold' }}> <NavigateNextOutlinedIcon /> Tổng tiền: </span> {numeral(total).format('0,0')} vnđ</p>
                    {/* <MenuButton key={index} item={item} active={selectedMenu?.id === item.id} onItemClick={handleMenuClick} /> */}
                </Col>
                {/* <Col lg={5} md={5} sm={5} xs={5} >
                    <div style={{ marginBottom: '20px', padding: '10px 5px', border: '0.2px solid', borderRadius: '10px', borderColor: '#9f8d83', backgroundColor: 'white' }}>
                        <div className='justify-content-center' style={{ display: 'flex', alignItems: 'center' }}>
                            <div className={`button-menu-list`} style={headerMenuStyle}
                            >
                                {selectedMenu?.name}
                            </div>
                        </div>
                        <ListGroup variant='flush' >
                            {_.map(selectedMenu?.items, (food, index) => (
                                <ListGroup.Item key={index} style={{ fontSize: '12px' }}>{` - ${food?.name}`}</ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                </Col> */}
            </Row>
        </Container >
    );
}

export default GeneralInfo;