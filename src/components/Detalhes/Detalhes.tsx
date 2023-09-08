import { Card, Col, Row } from "react-bootstrap"

export const Detalhes = ({ ...props }) => {

    return (
        <Card className="h-100 border-0 p-2 bg-transparent">
            <Row className={`h-100 rounded-end bg-primary bg-opacity-10`}>
                <Col className="col-md-12 p-3">
                    <p className="">Área para mais detalhes do pedido...</p>
                    <p className="fw-semibold">Obs: {props.pedido.obs}</p>
                </Col>
            </Row>
        </Card>
    )
}