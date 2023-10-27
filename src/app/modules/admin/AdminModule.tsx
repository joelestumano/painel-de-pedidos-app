import { useNavigate } from "react-router-dom";
import { UseDocumentTitle } from "../../shared/hooks/UseDocumentTitleHook";
import { useEffect, useState } from "react";
import { LoadingComponent } from "../../shared/components/loading/LoadingComponent";
import { Container, Nav, Navbar } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NadaPorAquiComponent } from "../painel/pedidos/components/nada-por-aqui/NadaPorAquiComponent";

export const AdminModule: React.FC<{}> = () => {
    UseDocumentTitle("SG Admin");

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
                        <Navbar expand="lg" className="bg-black navbar-dark m-0">
                            <Container>
                                <Navbar.Brand onClick={() => { navigate('/sg-admin') }} role="button">SG - Admin</Navbar.Brand>
                                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                <Navbar.Collapse id="basic-navbar-nav">
                                    <Nav className="me-auto">
                                        <Nav.Link onClick={() => { navigate('/sg-painel') }} >SG - Painel</Nav.Link>
                                        {/* <Nav.Link href="#link">Link</Nav.Link>
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
                                        </NavDropdown> */}
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
