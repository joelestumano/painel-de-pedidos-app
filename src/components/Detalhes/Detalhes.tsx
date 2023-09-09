import { Card, Col, Row } from "react-bootstrap"
import "./Detalhes.scss";

export const Detalhes = ({ ...props }) => {

    return (
        <Card className="h-100 border-0 px-2 bg-transparent">
            <Row className={`h-100 border-0 rounded-chat-start bg-primary bg-opacity-10`}>
                <Col className="col-md-12 p-3">
                    <p className="fw-semibold">Obs: {props.pedido.obs}</p>
                </Col>
            </Row>
        </Card>
    )
}