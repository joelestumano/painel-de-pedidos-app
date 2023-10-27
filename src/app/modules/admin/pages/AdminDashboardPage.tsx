import { useNavigate } from "react-router-dom";
import { UseDocumentTitle } from "../../../shared/hooks/UseDocumentTitleHook";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../../shared/components/loading/LoadingComponent";
import { NadaPorAquiComponent } from "../../pedidos/components/nada-por-aqui/NadaPorAquiComponent";
import { Col, Container, Nav, NavDropdown, Navbar, Row } from "react-bootstrap";
import { useSelector } from "react-redux";

export const AdminDashboardPage: React.FC<{}> = () => {
    UseDocumentTitle("SG Admin - Dashboard");

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setTimeout(() => {
            setLoading(false);
        }, 500);
    });

    return (
        <>
            {loading ? (
                <LoadingComponent />
            ) : (
                <>
                    {true ? (
                        <Navbar expand="lg" className="bg-black navbar-dark">
                            <Container>
                                <Navbar.Brand href="#home">SG - Admin</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link href="#home">Home</Nav.Link>
                                        <Nav.Link href="#link">Link</Nav.Link>
                                        <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.2">
                                                Another action
                                            </NavDropdown.Item>
                                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                            <NavDropdown.Divider />
                                            <NavDropdown.Item href="#action/3.4">
                                                Separated link
                                            </NavDropdown.Item>
                                        </NavDropdown>
                                    </Nav>
                                </Navbar.Collapse>
                            </Container>
                        </Navbar>
                    ) : (
                        <NadaPorAquiComponent titulo="Nada por aqui! (Dashboard)" />
                    )}
                </>
            )}
        </>
    );
};
