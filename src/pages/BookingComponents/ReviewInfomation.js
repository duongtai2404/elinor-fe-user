import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal } from 'react-bootstrap';
import numeral from 'numeral';
import moment from 'moment';




function ItemReview({ content }) {
    const [isActive, setIsActive] = useState(false);
    const myRef = useRef(null);
    useEffect(() => {
        const handleScroll = () => {
            if (myRef.current) {
                const top = myRef.current.getBoundingClientRect().top;
                if (top < 300) setIsActive(true)
                else setIsActive(false)

            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);
    const fatherStyle = {
        minWidth: '1em',
        backgroundColor: '#eebb89',
        borderRadius: '10px',
        marginBottom: '10px',
        alignItems: 'center',
        display: 'flex',
        height: '4em'
    }

    const childStyle = {
        color: 'white',
        paddingLeft: '20px',
        fontSize: '18px',
        fontWeight: 'bold'
    }

    return (
        <div ref={myRef} style={fatherStyle} className={`${isActive ? 'item-review-booking' : ''}`}>
            <p style={childStyle}> {content}</p>
        </div>
    );
}

function ReviewInformationBooking({ numPeople, selectedMenu, selectedTimeSlot }) {
    const containerStyle = {
        border: '1px solid #dfa974',
        borderRadius: '20px',
        backgroundColor: '#dfa974',
        padding: '30px 20px 10px 20px'
    }


    useEffect(() => {
    }, [numPeople, selectedMenu, selectedTimeSlot]);



    return (
        <Container style={containerStyle}>
            <div style={{ textAlign: 'center' }}>
                <h1 className='protest-strike-regular' style={{ color: 'white' }} >Elinor - Fine dining & more</h1>
                <p style={{ color: 'white', marginTop: '20px', fontSize: '1.2em' }}> {`${moment(selectedTimeSlot?.from).format('DD/MM/YYYY')} - ${moment(selectedTimeSlot?.from).format('HH:mm')}`}</p>
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