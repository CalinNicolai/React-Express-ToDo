import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import './FooterStyle.css'; // Подключаем CSS для стилей футера

const Footer: React.FC = () => {
    return (
        <footer className="footer bg-dark text-light">
            <Container>
                <Row>
                    <Col>
                        <p className="text-center">© 2023 W2 WorkWave</p>
                    </Col>
                </Row>
            </Container>
        </footer>
    )
}

export default Footer;