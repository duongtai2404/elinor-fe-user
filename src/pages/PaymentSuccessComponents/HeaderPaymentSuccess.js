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
            main: '#eabe6c',
        },
    },
});

function HeaderPaymentSuccess({ }) {
    const navigate = useNavigate();

    const navigateToHome = () => {
        try {
            navigate('/', {});
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => { }, []);

    return (
        <Container>
            <Row style={{ marginBottom: '30px' }}>
                <Col xs={6} md={6} sm={6}>
                    <ThemeProvider theme={theme}>

                        <Button
                            sx={{
                                color: '#eabe6c',
                            }}
                            onClick={navigateToHome}
                            startIcon={<KeyboardBackspaceOutlinedIcon />}
                        >
                            Trang chủ
                        </Button>
                    </ThemeProvider>
                </Col>

            </Row>
        </Container>
    );
}

export default HeaderPaymentSuccess;