import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, ListGroup } from 'react-bootstrap';
import CopyButton from './CopyButton';
import numeral from 'numeral';

function PaymentInformation({ paymentInfo, isActivePaymentInfo }) {

    const containerStyle = {
        border: '1px solid #9f8d83',
        borderRadius: '20px',
        padding: '30px 20px 10px 20px'
    }

    useEffect(() => {

    }, [isActivePaymentInfo, paymentInfo]);

    return (
        <Container className={`test-transaction ${isActivePaymentInfo ? 'scroll' : ''}`} style={containerStyle}>
            <div className='payment-information'>
                <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                    <h1 className='protest-strike-regular' style={{ fontSize: '25px', color: isActivePaymentInfo ? 'white' : '#9f8d83' }} >Nội dung chuyển khoản</h1>
                </div>
                <ListGroup variant='flush'>
                    <ListGroup.Item className='none-border'>
                        <Row >
                            <Col lg={3} md={3} sm={3} xs={3} >
                            </Col>
                            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }} style={{ textAlign: 'center' }} >
                                <span style={{ fontSize: '15px', color: isActivePaymentInfo ? 'white' : '', textAlign: 'left' }}>{paymentInfo?.bankInfo?.number}</span>
                            </Col>
                            <Col lg={3} md={3} sm={3} xs={3} style={{ textAlign: 'right' }}>
                                <CopyButton textToCopy={paymentInfo?.bankInfo?.number} />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className='none-border'>
                        <Row>
                            <Col lg={2} md={2} sm={2} xs={2} >
                            </Col>
                            <Col lg={{ span: 8 }} md={{ span: 8 }} sm={{ span: 8 }} xs={{ span: 8 }} style={{ textAlign: 'center' }} >
                                <span style={{ fontSize: '15px', color: isActivePaymentInfo ? 'white' : '' }}>{paymentInfo?.bankInfo?.fullName}</span>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className='none-border' style={{ textAlign: 'center', color: isActivePaymentInfo ? 'white' : '' }}>
                        <Row>
                            <Col lg={2} md={2} sm={2} xs={2} >
                            </Col>
                            <Col lg={{ span: 9 }} md={{ span: 9 }} sm={{ span: 9 }} xs={{ span: 9 }} style={{ textAlign: 'center' }} >
                                <span style={{ fontSize: '15px', color: isActivePaymentInfo ? 'white' : '' }}>{paymentInfo?.bankInfo?.bankName}</span>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className='none-border' style={{ color: isActivePaymentInfo ? 'white' : '' }} >
                        <Row>
                            <Col lg={3} md={3} sm={3} xs={3} style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '12px', fontWeight: 'bold' }}>Nội dung :</span>
                            </Col>
                            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }} style={{ textAlign: 'center' }} >
                                <span style={{ fontSize: '14px' }}> {paymentInfo?.bankInfo?.content}</span>
                            </Col>
                            <Col lg={3} md={3} sm={3} xs={3} style={{ textAlign: 'right' }}>
                                <CopyButton textToCopy={paymentInfo?.bankInfo?.content} />
                            </Col>
                        </Row>
                    </ListGroup.Item>
                    <ListGroup.Item className='none-border' style={{ color: isActivePaymentInfo ? 'white' : '' }}>
                        <Row>
                            <Col lg={3} md={3} sm={3} xs={3} style={{ textAlign: 'right' }}>
                                <span style={{ fontSize: '13px', fontWeight: 'bold' }}>Số tiền:</span>
                            </Col>
                            <Col lg={{ span: 6 }} md={{ span: 6 }} sm={{ span: 6 }} xs={{ span: 6 }} style={{ textAlign: 'center' }} >
                                <span> {numeral(paymentInfo?.amount).format('0,0')} vnđ</span>
                            </Col>
                        </Row>
                    </ListGroup.Item>
                </ListGroup>
                <span style={{ fontSize: '12px', color: 'red', fontWeight: isActivePaymentInfo ? 'bold' : '' }}> * Mã QR chỉ cung cấp cho thanh toán lần này, vui lòng không sao lưu sử dụng cho những lần thanh toán sau.</span>
            </div>
        </Container >
    );
}

export default PaymentInformation;