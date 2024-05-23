import React, { useState } from 'react';
import _ from 'lodash';
import { Container, Row, Col, Button, ListGroup, Accordion } from 'react-bootstrap';
import numeral from 'numeral';


function MenuButton({ item, onItemClick, active }) {
    const [isDancing, setIsDancing] = useState(false);

    const itemClick = (item) => {
        onItemClick(item);
        setIsDancing(true);
        setTimeout(() => {
            setIsDancing(false);
        }, 1000);
    }

    const buttonStyle = {
        color: 'white', // Màu chữ trắng
        backgroundColor: '#eabe6c', // Màu nền theo ý muốn của bạn
        borderColor: '#eabe6c', // Màu viền theo ý muốn của bạn
        marginBottom: '10px'
    };

    const disableBtn = {
        color: '#eabe6c', // Màu chữ trắng
        backgroundColor: 'transparent', // Màu nền theo ý muốn của bạn
        borderColor: '#eabe6c', // Màu viền theo ý muốn của bạn
        marginBottom: '10px'
    };

    return (
        <div style={{ marginBottom: '20px', padding: '10px', border: '0.2px solid', borderRadius: '7px', borderColor: '#eabe6c', backgroundColor: 'white' }}>
            <div className='justify-content-center' style={{ alignItems: 'center', backgroundColor: 'white' }}>
                <Button className={`button-menu-list ${isDancing ? 'special-transition' : ''}`} style={active ? buttonStyle : disableBtn}
                    onClick={() => itemClick(item)}
                >
                    {item?.name} - {item?.price}
                </Button>
            </div>
            <ListGroup variant='flush' >
                {_.map(item?.items, (food, index) => (
                    <ListGroup.Item key={index} style={{ fontSize: '12px' }}>{` - ${food?.name}`}</ListGroup.Item>
                ))}
            </ListGroup>
        </div>
    );
}

function MenuList({ data, selectedMenuItems }) {
    const [selectedMenu, setSelectedMenu] = React.useState(null);

    const handleMenuClick = (menu) => {
        setSelectedMenu(menu);
        selectedMenuItems(menu)
    };

    return (
        <Container>
            <Row className='justify-content-center'>
                {_.map(data, (item, index) => (
                    <Col xs={6} md={6} sm={6} >
                        <MenuButton key={index} item={item} active={selectedMenu?.id === item.id} onItemClick={handleMenuClick} />
                    </Col>
                ))}
                {/* <Col>
                    <h2>Selected Menu</h2>
                    {selectedMenu && (
                        <div>
                            <h3>{selectedMenu.name} - ${selectedMenu.price}</h3>
                            <h4>Available Foods:</h4>
                            <FoodList foods={selectedMenu.foods} />
                        </div>
                    )}
                </Col> */}
            </Row>
        </Container>
    );
}

export default MenuList;