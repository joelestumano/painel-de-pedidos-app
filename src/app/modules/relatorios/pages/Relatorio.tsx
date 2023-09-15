import { Col, Container, Row } from "react-bootstrap"

export const RelatorioPage: React.FC<{}> = () => {

    return (
        <Container fluid={true} className={`${true ? '' : 'bg-danger bg-opacity-25'}`}>
            <Row>
                <Col className="col-12 col-md-8">
                    relatório works!
                </Col>
            </Row>
        </Container>
    )
}