import axios from 'axios';
import moment from 'moment';
import _, { head } from 'lodash';
import React, { useState, useEffect } from 'react';
import { Table, Spinner } from 'react-bootstrap';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import LinearProgress from '@mui/material/LinearProgress';

const theme = createTheme({
    palette: {
        primary: {
            main: '#dfa974',
        },
    },
});


const TimeTable = ({ numPeople, onSelectedTimeSlot }) => {
    const [loading, setLoading] = useState(false);
    const [initLoading, setInitLoading] = useState(false);

    // data cho bảng table
    const [data, setData] = useState([]);

    // data cho mục header của table
    const [headerValue, setHeaderValue] = useState([]);

    // thời gian được chọn
    const [selectedTime, setSelectedTime] = useState({});

    const [startDate, setStartDate] = useState(new Date());

    const fetchDay = 10;

    const covertDayOfWeek = (dayOfWeek) => {
        const convertedValue = (parseInt(dayOfWeek, 10)) % 7;
        return convertedValue === 0 ? 'CN' : (convertedValue + 1).toString();
    }

    const handleOnClickItem = (date, time) => {
        let newSelectedTime = {
            date,
            ...time
        };
        if (selectedTime?.date === date && selectedTime?.timeString === time?.timeString) {
            newSelectedTime = {};
        }

        setSelectedTime(newSelectedTime);
        onSelectedTimeSlot(newSelectedTime);
    }

    const checkClick = (date, time) => {
        if (selectedTime.date === date && selectedTime?.timeString === time?.timeString) return true;

        return false;
    }

    const fetchData = async ({ isInit }) => {
        try {
            // set loading cho lần đầu tiền
            if (isInit) {
                setInitLoading(true);
                setTimeout(() => {
                    setInitLoading(false);
                }, 1000);
            };

            // set loading cho mỗi lần scroll table
            setLoading(true);

            const from = moment(startDate).toISOString();
            let to = moment(startDate).add(fetchDay, 'days').toISOString();

            const data = {
                customerNumber: numPeople,
                from,
                to
            }

            let response = await axios.post(`${process.env.REACT_APP_URL_BACKEND || 'http://10.8.103.27:3000'}/room/checkAvailable`, data);
            response = response?.data

            if (response?.code === 1000) {
                const responseData = response?.data;

                if (isInit) {
                    const defaultTimeSlot = [{
                        timeString: '17:30 - 19:30'
                    }, {
                        timeString: '20:00 - 22:00'
                    }];
                    // init header cho table
                    const header = ['Thứ', 'Ngày'];
                    _.forEach(responseData?.[0]?.timeSlot || defaultTimeSlot, (timeSlotItem) => {
                        header.push(timeSlotItem?.timeString);
                    })

                    setHeaderValue(header)
                }

                let newData = [];
                _.forEach(responseData, (data) => {
                    const obj = {
                        date1: covertDayOfWeek(moment(data?.day).format('e')),
                        date2: moment(data?.day).format('DD-MM-YYYY'),
                        time1: _.pick(data?.timeSlot?.[0], ['from', 'to', 'isAvailable', 'timeString']),
                        time2: _.pick(data?.timeSlot?.[1], ['from', 'to', 'isAvailable', 'timeString'])
                    };
                    newData.push(obj);
                });

                setData((prevData) => [...prevData, ...newData]);

                setStartDate(moment(to).add(1, 'days'));
            }

        } catch (error) {
            console.log(`[ERROR] => call api /room/checkAvailable error ${error.message} -- ${JSON.stringify(error)}`);
        }
        setLoading(false);
        // handleScrollToPosition(returnData.scrollIndex)
        // return returnData;
    };

    useEffect(() => {
        fetchData({ isInit: true });

    }, [numPeople]); // Run only on mount

    const handleScroll = (e) => {
        const { scrollTop, clientHeight, scrollHeight } = e.currentTarget;
        // Check if the user has scrolled to the bottom
        if (scrollHeight - scrollTop <= clientHeight + 10 && !loading) {
            fetchData({ isInit: false });
        }
    };

    // const handleScrollToPosition = (index) => {
    //     if (index > 0) {
    //         setTimeout(() => {
    //             const project = document.getElementById(`go-to-${index}`);
    //             if (project) {
    //                 project.scrollIntoView({ behavior: 'smooth' });
    //             }
    //         }, 1000);
    //     }
    // }

    return (
        <>
            {initLoading ?
                <Box sx={{ display: 'flex' }}>
                    <ThemeProvider theme={theme}>
                        <Box sx={{ width: '100%' }}>
                            <LinearProgress />
                        </Box>
                    </ThemeProvider>
                </Box> :
                <div className="infinite-scroll-table" onScroll={handleScroll} style={{ fontFamily: 'Cabin' }}>
                    <Table striped bordered hover style={{ fontSize: '10px' }}>
                        <thead className="table-detail-time-booking">
                            <tr>
                                {headerValue.map((item, index) => (
                                    <th key={index}  >{item}</th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {data.map((item, index) => (
                                <tr key={index}>

                                    <td className='sticky-column'>{item.date1}</td>

                                    <td className='sticky-column2' style={{ left: '10px' }}>{item.date2}</td>
                                    <td>{((item.time1.isAvailable === false ? (<div className='available-item'>''</div>) : (<div onClick={() => handleOnClickItem(item.date2, item.time1)} className={`inAvailable-item ${checkClick(item.date2, item.time1) ? 'click-available-item' : ''}`}>''</div>)))}</td>
                                    <td>{((item.time2.isAvailable === false ? (<div className='available-item'>''</div>) : (<div onClick={() => handleOnClickItem(item.date2, item.time2)} className={`inAvailable-item ${checkClick(item.date2, item.time2) ? 'click-available-item' : ''}`} >''</div>)))}</td>

                                </tr>
                            ))}
                        </tbody>
                    </Table>
                    {loading && (
                        <div className="loading-spinner">
                            <Spinner animation="border" variant="primary" />
                        </div>
                    )}
                </div>}
        </>
    );
};

export default TimeTable;