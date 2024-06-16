import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../../index";
import { Navbar, Container, Button } from "react-bootstrap";
import MusicPlayer from "../Home/MusicPlayer/MusicPlayer";

const AppNavbar: React.FC = () => {
    const navigate = useNavigate();
    const { store } = useContext(Context);

    return (
        <Navbar bg="dark" variant="dark">
            <Container>
                <Navbar.Brand>W2 WorkWave</Navbar.Brand>
                <Navbar.Toggle />
                <Navbar.Collapse className="justify-content-center">
                    <MusicPlayer/>
                </Navbar.Collapse>
                <Navbar.Collapse className="justify-content-end">
                    <Navbar.Text>
                        <Button variant="outline-light" onClick={() => store.logout()}>
                            Log out
                        </Button>
                    </Navbar.Text>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default AppNavbar;
