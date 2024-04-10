import React, { Fragment, useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Col, Row } from 'react-bootstrap';


function Menu(props) {

    const { siteInfo = {} } = props;

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const script = document.createElement('script');

        script.src = "assets/js/main.js";
        script.async = true;

        document.body.appendChild(script);


        const timeout = setTimeout(() => {
            setIsVisible(false);
        }, 1000)

        return () => {
            // window.removeEventListener('load', handleWindowLoad);
            clearTimeout(timeout);
            document.body.removeChild(script);
        }
    }, []);

    return (
        <Fragment>
            {isVisible && (
                <div id="preloder">
                    <div className="loader"></div>
                </div>
            )}

            <div className="offcanvas-menu-overlay"></div>

            <header className="header-section">
                <div className="top-nav">
                    <div className="container">
                        <Row>
                            <Col lg={6} md={6} sm={6} xs={6}>

                                <ul className="tn-left">
                                    <li><i className="fa fa-phone"></i> {siteInfo.phoneNumber}</li>
                                    <li className="hover-black"><a className="hover-black" target="_blank" href={siteInfo.facebook} style={{ color: '#eabe6c' }}><i className="fa fa-envelope"></i> Elinor</a></li>
                                </ul>
                            </Col>
                            <Col lg={6} md={6} sm={6} xs={6}>
                                <div className="tn-right">
                                    <div className="top-social" >
                                        <a href={siteInfo.facebook} target="_blank"><i className="fa fa-facebook-official" style={{ color: '#eabe6c' }}></i></a>
                                        <a href={siteInfo.instagram} target="_blank"><i className="fa fa-instagram" style={{ color: '#eabe6c' }}></i></a>
                                        <a href={siteInfo.tiktok} target="_blank"><i className="fa fa-tumblr-square" style={{ color: '#eabe6c' }}></i></a>
                                    </div>
                                    {/* <a href="#" className="bk-btn">Đặt ngay</a> */}
                                </div>
                            </Col>
                        </Row>
                    </div>
                </div>
                <div className="menu-item">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-4">
                            </div>
                            <div className="col-lg-6">
                                <div className="logo">
                                    <Link to="/">
                                        <img src="assets/img/logo/logo.jpg" alt="" />
                                    </Link>
                                </div>
                            </div>
                            <div className="col-lg-2">
                            </div>
                            {/* <div className="col-lg-7">
                                <div className="nav-menu">
                                    <nav className="mainmenu">
                                        <ul>
                                            <li className="active"><Link to="/">Trang chủ</Link></li>
                                            <li><Link to="/homestay">Home stay</Link></li>
                                            <li><Link to="/contact">Liên hệ</Link></li>
                                        </ul>
                                    </nav>
                                </div>
                            </div> */}
                        </div>
                    </div>
                </div>
            </header>
        </Fragment>
    )
}

export default Menu;