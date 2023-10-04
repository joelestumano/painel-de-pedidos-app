import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import { useState } from "react";
import { BsIconComponent } from "../bs-icon/BsIconComponent";
import { SgButton } from "../SgButton/SgButton";
import { LoginService } from "../../../modules/login/services/LoginService";

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
    }

    return (
        <>
            <Button
                type="button"
                title="offcanvas"
                variant="primary"
                style={{ zIndex: 100 }}
                onClick={toggleShow}
                className="position-fixed top-0 end-0 rounded-end-0 rounded-start-3 mt-5 px-2 shadow"
            >
                <BsIconComponent iconName="List" color="white" size={32} className="align-top" />
            </Button>
            <Offcanvas placement="end" show={show} onHide={handleClose} {...props}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>
                        <BsIconComponent iconName="Gear" size={32} className="align-middle me-1" />
                    </Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <Row>
                        <Col className="col-12">
                            <h4>Área para configurações</h4>
                        </Col>
                        <Col>
                            <SgButton type={"button"} variant="danger" text="sair" onClick={onLogout} />
                        </Col>
                    </Row>
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}