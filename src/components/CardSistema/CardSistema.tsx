import { Card, Col, Row } from "react-bootstrap";
import { Bells } from "../Bells/Bells";

export const CardSistema = ({ ...props }) => {
    return (
        <Card className="h-100 border-0 p-2 bg-transparent">
            <Row className={`h-100 bg-primary bg-opacity-25 shadow rounded`}>
                <Col className="col-md-6 p-3">
                    <Row>
                        <Col>
                            <Bells></Bells>
                        </Col>
                    </Row>
                    <Row className="mt-2">
                        <Col>
                            <label className="position-relative w-auto bg-white rounded px-2 py-1 fw-semibold">
                                Pedidos pendentes
                                <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-success fs-5">
                                    {props.paginate.totalDocumentos}
                                    <span className="visually-hidden">
                                        {props.paginate.totalDocumentos}
                                    </span>
                                </span>
                            </label>
                        </Col>
                    </Row>
                </Col>
                <Col className="col-md-6 p-3">
                    
                </Col>
            </Row>
        </Card>
    );
};