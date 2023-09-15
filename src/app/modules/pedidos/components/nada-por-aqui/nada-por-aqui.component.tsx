import { Col, Container, Row } from "react-bootstrap";
import "./nada-por-aqui.component.scss";
export function NadaPorAquiComponent({ ...props }) {
    return (
        <Container fluid={true} className="bg-img">
            <Row className="w-100">
                <Col className="col-12 col-md-6 text-center">
                    <label className="fw-semibold bg-white bg-opacity-75 p-2 rounded fs-1">
                        {props.titulo}
                    </label>
                </Col>
            </Row>
        </Container>
    )
}