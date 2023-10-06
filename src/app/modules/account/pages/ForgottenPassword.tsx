import { useSelector } from "react-redux";
import { UseDocumentTitle } from "../../../shared/hooks/UseDocumentTitleHook";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";

export const ForgottenPasswordPage: React.FC<{}> = () => {

    UseDocumentTitle("SG - Conta de usuário");

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    const [btnSubmit, setBtnSubmit] = useState<'parado' | 'enviando' | 'checado' | 'unauthorized' | 'falhou'>('parado');
    useEffect(() => { }, []);

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<{ email: string }>();

    const onSubmit: SubmitHandler<{ email: string }> = async (data) => { }

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

                                <h1 className="">
                                    Prezado(a) usuário(a)
                                </h1>

                                <p className="">
                                    Se você esqueceu sua senha de acesso ao nosso sistema, você pode facilmente recuperá-la através do seu e-mail.
                                </p>

                                <Form
                                    onSubmit={handleSubmit(onSubmit)}
                                    className="text-center bg-primary bg-opacity-25 p-4 rounded shadow"
                                >
                                    <input
                                        className={`form-control my-3 my-lg-3 border border-primary fw-semibold ${errors.email ? "is-invalid" : ""
                                            }`}
                                        type="text"
                                        {...register("email", {
                                            required: true,
                                            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                        })}
                                        placeholder={"E-mail"}
                                    />
                                </Form>

                                <p className="mt-3">
                                    Ao enviar seu e-mail, uma mensagem de recuperação de senha será enviada para o <strong>endereço de e-mail cadastrado em seu perfil.</strong> Por favor, verifique sua caixa de entrada e/ou pasta de spam para encontrar o e-mail. Ele deve chegar em alguns minutos.
                                </p>

                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col className="col-md-6 d-none d-md-block bg-primary bg-opacity-25 vh-100"></Col>
            </Row>
        </Container>
    );
};
