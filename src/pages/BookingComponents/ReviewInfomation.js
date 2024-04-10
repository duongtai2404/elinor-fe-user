import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import numeral from 'numeral';
import moment from 'moment';




function ItemReview({ content }) {
    // const [isActive, setIsActive] = useState(false);
    // const myRef = useRef(null);
    useEffect(() => {
        // const handleScroll = () => {
        //     if (myRef.current) {
        //         const top = myRef.current.getBoundingClientRect().top;
        //         if (top < 300) setIsActive(true)
        //         else setIsActive(false)

        //     }
        // };

        // window.addEventListener('scroll', handleScroll);
        // return () => {
        //     window.removeEventListener('scroll', handleScroll);
        // };
    }, []);
    const fatherStyle = {
        minWidth: '1em',
        backgroundColor: '#18392B',
        borderRadius: '10px',
        marginBottom: '10px',
        alignItems: 'center',
        display: 'flex',
        height: '4em'
    }

    const childStyle = {
        color: '#eabe6c',
        paddingLeft: '20px',
        fontSize: '18px',
        fontWeight: 'bold'
    }

    return (
        <div style={fatherStyle} className={''}>
            <p style={childStyle}> {content}</p>
        </div>
    );
}

function ReviewInformationBooking({ numPeople, selectedMenu, selectedTimeSlot }) {
    const containerStyle = {
        border: '1px solid #2a5a46',
        borderRadius: '20px',
        backgroundColor: '#2a5a46',
        padding: '30px 20px 10px 20px'
    }


    useEffect(() => {
    }, [numPeople, selectedMenu, selectedTimeSlot]);



    return (
        <Container style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <h1 className='protest-strike-regular' style={{ color: '#eabe6c' }} >Elinor - Fine dining & more</h1>
                <p style={{ color: '#eabe6c', marginTop: '20px', fontSize: '1.2em' }}> {`${moment(selectedTimeSlot?.from).format('DD/MM/YYYY')} - ${moment(selectedTimeSlot?.from).format('HH:mm')}`}</p>
            </div>
            <div style={{ textAlign: 'left', color: 'white' }}>
                <ItemReview content={`- Số người: ${numPeople}`} />
                <ItemReview content={`- Tên Menu: ${selectedMenu?.name}`} />
                <ItemReview content={`- Thành tiền: ${numeral(selectedMenu?.price).format('0,0')} vnđ`} />

            </div>
        </Container>
    );
}

export default ReviewInformationBooking;