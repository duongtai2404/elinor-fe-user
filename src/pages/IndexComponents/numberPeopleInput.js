import React, { useState } from 'react';
import { Form, Row, Col } from 'react-bootstrap';

const NumberOfPeopleInput = ({ change }) => {
    const [count, setCount] = useState(2);
    const [isIncreaseClicked, setIsIncreaseClicked] = useState(false);
    const [isDecreaseClicked, setIsDecreaseClicked] = useState(false);

    const handleIncrease = (e) => {
        e.preventDefault();
        const newCount = count + 1;
        if (newCount > 8) return;

        setCount(newCount);
        setIsIncreaseClicked(true);
        setIsDecreaseClicked(false);
        setTimeout(() => setIsIncreaseClicked(false), 200);
        change(newCount);
    };

    const handleDecrease = (e) => {
        e.preventDefault();

        if (count > 1) {
            const newCount = count - 1;
            setCount(newCount);
            setIsDecreaseClicked(true);
            setIsIncreaseClicked(false);
            setTimeout(() => setIsDecreaseClicked(false), 200);
            change(newCount);

        }
    };

    return (
        <div className="counter-input-container" style={{ paddingBottom: '15px' }}>
            <Form.Group controlId="counterInput" style={{ backgroundColor: '#dfa974', padding: '10px', borderRadius: '10px' }}>
                <Row>
                    <Col xs={3} md={3} sm={3} className='d-flex' style={{ marginTop: '10px' }}>
                        <p style={{ color: 'white', fontSize: '18px', fontWeight: 'bold' }} >Số người: </p>
                    </Col>
                    <Col xs={9} md={9} sm={9} className='d-flex' >
                        <div className="input-group" style={{ border: '1px solid hsl(0, 0%, 80%)', borderRadius: '4px', borderColor: '#dfa974', backgroundColor: 'white' }}>
                            <button
                                onClick={handleDecrease}
                                className={`border-0 bold-text-button ${isDecreaseClicked ? 'bold-button' : ''}`}
                                style={{ backgroundColor: 'transparent', color: 'black', width: '50px', fontSize: '25px' }}
                            >
                                -
                            </button>
                            <Form.Control
                                style={{ backgroundColor: 'transparent', paddingTop: '15px', color: 'black' }}
                                className='text-center border-0'
                                type="text"
                                value={count}
                                readOnly
                            />
                            <button
                                onClick={handleIncrease}
                                className={`border-0 bold-text-button ${isIncreaseClicked ? 'bold-button' : ''}`}
                                style={{ backgroundColor: 'transparent', color: 'black', width: '50px', fontSize: '22px' }}
                            >
                                +
                            </button>
                        </div>
                    </Col>
                </Row>
            </Form.Group>
        </div>
    );
};

export default NumberOfPeopleInput;