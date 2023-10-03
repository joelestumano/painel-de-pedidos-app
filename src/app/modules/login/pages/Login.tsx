import { useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap"
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SgButton } from "../../../shared/components/SgButton/SgButton";
import { ApiService } from "../../../services/ApiService";

type inputs = {
    email: string;
    password: string;
};

export const LoginPage: React.FC<{}> = () => {

    const navigate = useNavigate();
    const [enviando, setEnviando] = useState(false);

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<inputs>();

    const onSubmit: SubmitHandler<inputs> = async (data) => {
        try {
            setEnviando(true);
            const response = await ApiService.create().post('/auth/login', data);
            console.log(response.data);
            //navigate("/");
        } catch (error) {
            console.log(error);
        } finally {
            setEnviando(false);
        }
    }

    return (
        <Container fluid={true} className={`min-vh-100 d-flex flex-column align-items-center justify-content-start justify-content-md-center
         ${true ? '' : 'bg-danger bg-opacity-25'}`}>
            <Row className="justify-content-center">
                <Col className="col-sm-12">
                    <h2 className="text-center px-2 p-lg-0 text-uppercase fs-bebas-neue lh-1 fs-custom_a">
                        Login
                    </h2>
                </Col>
            </Row>
            <Form onSubmit={handleSubmit(onSubmit)} className="text-center">
                <input
                    className={`form-control my-3 my-lg-2 border border-primary fw-semibold ${errors.email ? "is-invalid" : ""
                        }`}
                    type="text"
                    {...register("email", { required: true })}
                    placeholder={"E-mail"}
                />
                <input
                    className={`form-control my-3 my-lg-2 border border-primary fw-semibold ${errors.password ? "is-invalid" : ""
                        }`}
                    type="text"
                    {...register("password", { required: true })}
                    placeholder={"Senha"}
                />

                <SgButton type="submit" text={enviando ? "enviando..." : "enviar"} onSubmit={() => { }} disabled={enviando}
                    child={enviando ?
                        <Spinner className=""
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                        />
                        : null} />

            </Form>
        </Container>
    )
}