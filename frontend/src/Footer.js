import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

function Footer() {
    return (
        <footer className="footer">
            <Container>
                <Row>
                    <Col className="text-center">
                        <p>&copy; 2025 Mammoth Rumble. Author: Aime Cesaire Mugishawayo. All rights reserved.</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    );
}

export default Footer;
