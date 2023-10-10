import { Col, Container, Row } from "react-bootstrap";
import { UseDocumentTitle } from "../../../shared/hooks/UseDocumentTitleHook";
import { useSelector } from "react-redux";

export const ResetPasswordPage: React.FC<{}> = () => {

    UseDocumentTitle("SG - Redefinir senha");

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    return (
        <Container
            fluid={true}
            className={`min-vh-100 d-flex flex-column justify-content-start justify-content-md-center
            ${isOnline ? "" : "bg-danger bg-opacity-25"}`}
        >
            <Row className="flex-row-reverse">
                <Col className="col-12 col-md-6 d-flex align-items-md-center py-4">
                    Redefinir senha
                </Col>
                <Col className="col-md-6 d-none d-md-block bg-primary bg-opacity-25 min-vh-100"></Col>
            </Row>
        </Container>
    )
}