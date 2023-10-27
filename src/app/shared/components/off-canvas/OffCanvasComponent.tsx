import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import { useState } from "react";
import { BsIconComponent } from "../bs-icon/BsIconComponent";
import { SgButton } from "../SgButton/SgButton";
import { LoginService } from "../../../modules/login/services/LoginService";
import { useSelector } from "react-redux";

export const OffCanvasComponent: React.FC<{}> = () => {
    const props = {
        scroll: true,
        backdrop: true,
    };

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const toggleShow = () => setShow((s) => !s);

    const onLogout = () => {
        LoginService.logout();
    };

    const { usuario } = useSelector(
        (rootReducer: any) => rootReducer.UsuarioReducer
    );

    return (
        <>
            <Button
                type="button"
                title="SG - Painel"
                variant="primary"
                style={{ zIndex: 100 }}
                onClick={toggleShow}
                className="position-fixed top-0 end-0 rounded-end-0 rounded-start-3 mt-5 shadow"
            >
                <BsIconComponent
                    iconName="List"
                    color="white"
                    size={24}
                    className="align-top"
                />
            </Button>
            <Offcanvas placement="end" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title className="">
                        <a className="text-md-start text-decoration-none bg-warning rounded-circle" href="/sg-painel">
                            <BsIconComponent
                                iconName="HouseFill"
                                size={32}
                                className="align-middle me-2"
                            />
                        </a>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body className="d-flex flex-column">
                    <Row>
                        <Col className="col-12">
                            <nav className="d-flex flex-column">
                                <a href="/sg-painel/forgot-password" className="my-1 text-md-start text-decoration-underline">
                                    <span className="me-1">esqueceu sua senha?</span>
                                    <BsIconComponent iconName="PersonFillExclamation" />
                                </a>
                                <a href="/sg-painel/reset-password" className="my-1 text-md-start text-decoration-underline">
                                    <span className="me-1">redefinir senha</span>
                                    <BsIconComponent iconName="PersonFillUp" />
                                </a>

                                <a href="/sg-admin" className="my-1 text-md-start text-decoration-underline">
                                    <span className="me-1">admin</span>
                                    <BsIconComponent iconName="PersonBoundingBox" />
                                </a>
                            </nav>
                        </Col>
                    </Row>
                    {usuario ?
                        <div className="d-flex justify-content-end fixed-bottom position-absolute p-2 bg-danger bg-opacity-25">
                            <div className="d-flex justify-content-between align-items-center w-100">
                                <span className="px-2">{usuario.nome}</span>
                                <SgButton
                                    type={"button"}
                                    variant="danger"
                                    text="sair"
                                    onClick={() => { onLogout(); handleClose() }}
                                />
                            </div>
                        </div>
                        : null}
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
