import React, { useRef, useState, useEffect } from 'react';
import { Container, Row, Col, Button, Modal, Form } from 'react-bootstrap';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import _ from 'lodash';

function FormBooking({ existUserInfo, changeUserInfo, checkIsValid }) {
    const [userInfo, setUserInfo] = useState({
        name: '',
        phone: '',
        email: '',
        note: ''
    });

    const [errorUserInfo, setErrorUserInfo] = useState({
        name: '',
        phone: '',
        email: '',
        note: ''
    });

    const onChangeValue = (e) => {
        const { name, value } = e.target;
        if (name === 'phone') {
            const numberRegex = /^[0-9]{0,11}$/;
            if (!numberRegex.test(value)) return;
        }
        setUserInfo((prevData) => ({ ...prevData, [name]: value }));
        changeUserInfo({
            ...userInfo,
            [name]: value
        });
    }

    const checkError = (fieldName) => {
        let errorMessage = ''
        switch (fieldName) {
            case 'name': {
                if (_.isEmpty(userInfo?.name)) {
                    errorMessage = 'Vui lòng nhập tên của bạn.'
                }

                break;
            }
            case 'phone': {
                if (_.isEmpty(userInfo?.phone)) {
                    errorMessage = 'Vui lòng nhập số điện thoại của bạn.'
                } else {
                    // kiểm tra định dạng sdt
                    const phoneRegex = /^(0[2-9]|84[2-9]|\+84[2-9])\d{8,9}$/;
                    if (!phoneRegex.test(userInfo?.phone)) errorMessage = 'Số điện thoại không đúng định dạng'
                }

                break;
            }
            case 'email': {
                if (_.isEmpty(userInfo?.email)) {
                    errorMessage = 'Vui lòng nhập email của bạn.'
                } else {
                    // check định dạng email
                    const emailRegex = /^[a-zA-Z0-9._-]+@(gmail\.com|icloud\.com)$/;
                    if (!emailRegex.test(userInfo?.email)) errorMessage = 'Email không đúng định dạng. (Định dạng đúng: ...@gmail.com hoặc ...@icloud.com)'
                }
                break;
            }
            default:
                break;
        }
        setErrorUserInfo((prevData) => ({
            ...prevData,
            [fieldName]: errorMessage
        }));

        // kiểm tra đã valid các ô input hết chưa
        let validError = {
            ...errorUserInfo,
            [fieldName]: errorMessage
        }
        // kiểm tra còn lỗi error k
        validError = _.pickBy(validError, (value) => !_.isEmpty(value))
        // kiểm tra đã nhập đủ thông tin chưa
        let validUserInfo = _.pick(userInfo, ['email', 'name', 'phone'])
        validUserInfo = _.pickBy(validUserInfo, (value) => _.isEmpty(value));
        if (_.isEmpty(validError) && _.isEmpty(validUserInfo)) {
            checkIsValid(true)
        } else {
            checkIsValid(false)
        };
    }

    useEffect(() => {
        setUserInfo(existUserInfo);
    }, [existUserInfo]);


    return (
        <Box
            component="form"
            noValidate
            autoComplete="off"
        >
            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{ marginBottom: '30px' }}>
                <AccountCircleOutlinedIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
                <TextField value={userInfo.name} onBlur={() => checkError('name')} onChange={onChangeValue} name='name' required color='warning' fullWidth label="Tên " variant="standard" error={!_.isEmpty(errorUserInfo?.name)} helperText={errorUserInfo?.name} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{ marginBottom: '30px' }}>
                <LocalPhoneOutlinedIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
                <TextField value={userInfo.phone} onBlur={() => checkError('phone')} onChange={onChangeValue} name='phone' required color='warning' fullWidth label="Số điện thoại " variant="standard" error={!_.isEmpty(errorUserInfo?.phone)} helperText={errorUserInfo?.phone} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{ marginBottom: '30px' }}>
                <EmailOutlinedIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />
                <TextField value={userInfo.email} onBlur={() => checkError('email')} onChange={onChangeValue} name='email' required color='warning' fullWidth label="Email " variant="standard" error={!_.isEmpty(errorUserInfo?.email)} helperText={errorUserInfo?.email} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'flex-end' }} style={{ marginBottom: '30px' }}>
                <EditNoteOutlinedIcon sx={{ color: 'action.active', mr: 2, my: 0.5 }} />

                <TextField value={userInfo.note} onChange={onChangeValue} name='note' color='warning' fullWidth label="Ghi chú" multiline rows={2} variant="standard" />
            </Box>

        </Box>
    );
}

function UserInformationBooking({ userInfo, changeUserInfo, checkIsValid }) {
    const containerStyle = {
        border: '2px solid #dfa974',
        borderRadius: '20px',
        padding: '30px 20px 10px 20px'
    }

    return (
        <Container style={containerStyle}>
            <div style={{ textAlign: 'center', marginBottom: '30px' }}>
                <h3 className='protest-strike-regular' style={{ color: '' }} >Thông tin xác nhận đặt bàn</h3>
            </div>
            <div style={{ textAlign: 'left', color: 'white' }}>
                <FormBooking existUserInfo={userInfo} changeUserInfo={changeUserInfo} checkIsValid={checkIsValid} />
                {/* <ItemReview content='- Số người: 2' />
                <ItemReview content='- Loại combo: Tên combo' />
                <ItemReview content='- Thành tiền: 450,000 vnđ' /> */}

            </div>
        </Container>
    );
}

export default UserInformationBooking;