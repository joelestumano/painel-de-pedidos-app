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
                title="Opções & configurações"
                variant="primary"
                style={{ zIndex: 100 }}
                onClick={toggleShow}
                className="position-fixed top-0 end-0 rounded-end-0 rounded-start-3 mt-5 px-2 shadow"
            >
                <BsIconComponent
                    iconName="List"
                    color="white"
                    size={32}
                    className="align-top"
                />
            </Button>
            <Offcanvas placement="end" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <div className="d-flex flex-row">
                            <BsIconComponent
                                iconName="Gear"
                                size={32}
                                className="align-middle me-2"
                            />
                            <h2 className="mb-0">Opções & configurações</h2>
                        </div>
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        {usuario ? (
                            <Col className="col-12">
                                <p className="fs-2">{usuario.nome}</p>
                                <SgButton
                                    type={"button"}
                                    variant="danger"
                                    text="sair"
                                    onClick={() => { onLogout(); handleClose() }}
                                />
                            </Col>
                        ) : null}

                        <Col className="col-12 mt-3">
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">
                                    <a href="/forgot-password" className="mb-2 text-md-start text-decoration-underline">
                                        <span className="me-1">esqueceu sua senha?</span>
                                        <BsIconComponent iconName="PersonFillExclamation" />
                                    </a>
                                </li>
                                <li className="list-group-item">
                                    <a href="/reset-password" className="mb-2 text-md-start text-decoration-underline">
                                        <span className="me-1">redefinir senha</span>
                                        <BsIconComponent iconName="PersonFillUp" />
                                    </a>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
};
