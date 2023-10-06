import { useSelector } from "react-redux";
import { UseDocumentTitle } from "../../../shared/hooks/UseDocumentTitleHook";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";

export const AccountPage: React.FC<{}> = () => {

    UseDocumentTitle("SG - Conta de usuário");

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    useEffect(() => { }, []);

    return (
        <Container
            fluid={true}
            className={`min-vh-100 d-flex flex-column justify-content-start justify-content-md-center py-4 py-md-0
            ${isOnline ? "" : "bg-danger bg-opacity-25"}`}
        >
            <Row className="flex-row-reverse">
                <Col className="col-12 col-md-6 d-flex align-items-md-center">
                    <Container fluid={false}>
                        <Row className="d-flex justify-content-center">
                            <Col className="col-12 col-md-6 ">

                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col className="col-md-6 d-none d-md-block bg-primary bg-opacity-25 vh-100"></Col>
            </Row>
        </Container>
    );
};
