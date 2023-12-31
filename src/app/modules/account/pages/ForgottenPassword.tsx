import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { SgButton } from "../../../shared/components/SgButton/SgButton";
import { BsIcon } from "../../../shared/components/BsIcon/BsIcon";
import { AccountService } from "../service/AccountService";
import { useNavigate } from "react-router-dom";

export const ForgottenPasswordPage: React.FC<{}> = () => {

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    const [btnSubmit, setBtnSubmit] = useState<'parado' | 'enviando' | 'checado' | 'not-found' | 'falhou'>('parado');
    const navigate = useNavigate();
    useEffect(() => { }, []);

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<{ email: string }>();

    const onSubmit: SubmitHandler<{ email: string }> = async (data) => {
        setBtnSubmit('enviando');
        await AccountService.forgottenPassword(data).then((res) => {
            setBtnSubmit("checado");
            setTimeout(() => {
                navigate("/");
            }, 750);
        }).catch((error) => {
            if (error?.response?.status === 404) {
                setBtnSubmit('not-found')
            } else {
                setBtnSubmit('falhou')
            }
        }).finally(() => { });
    }

    const getTextBtnSubmit = (): string => {
        switch (btnSubmit) {
            case 'enviando':
                return 'enviando'
            case 'checado':
                return 'email enviado'
            case 'not-found':
                return 'email não encontrado'
            case 'falhou':
                return 'um erro ocorreu'
            default: return 'enviar'
        }
    }

    const getVariantBtnSubmit = (): "success" | "danger" | "primary" => {
        switch (btnSubmit) {
            case 'checado':
                return 'success'
            case 'not-found':
                return 'danger'
            case 'falhou':
                return 'danger'
            default: return 'primary'
        }
    }

    const getBsIconBtnSubmit = (): JSX.Element | null => {
        switch (btnSubmit) {
            case 'checado':
                return <BsIcon iconName="CheckLg" />
            case 'not-found':
                return <BsIcon iconName="XOctagon" />
            case 'falhou':
                return <BsIcon iconName="BugFill" />
            default: return null
        }
    }

    return (
        <Container
            fluid={true}
            className={`min-vh-100 d-flex flex-column justify-content-start justify-content-md-center
            ${isOnline ? "" : "bg-danger bg-opacity-25"}`}
        >
            <Row className="flex-row-reverse">
                <Col className="col-12 col-md-6 d-flex align-items-md-center py-4">
                    <Container fluid={false}>
                        <Row className="d-flex justify-content-center">
                            <Col className="col-12 col-md-8">

                                <h1 className="">
                                    Prezado(a) usuário(a)
                                </h1>

                                <p className="">
                                    Se você esqueceu sua senha de acesso ao nosso sistema, você pode redefini-la através do seu e-mail.
                                </p>
                                <p className="">
                                    Certifique-se de usar o <strong> endereço de e-mail cadastrado em seu perfil</strong>.
                                </p>

                                <Form onSubmit={handleSubmit(onSubmit)} className="bg-primary bg-opacity-25 p-4 rounded shadow">

                                    <FormGroup className="mb-2">
                                        <label className="text-capitalize fw-semibold">email</label>
                                        <input
                                            className={`form-control border border-primary ${errors.email ? "is-invalid" : ""
                                                }`}
                                            type="text"
                                            {...register("email", {
                                                required: true,
                                                pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                                            })}
                                            placeholder={"Ex.: seunome@mail.com"}
                                        />
                                    </FormGroup>

                                    <FormGroup className="mt-3 text-center">
                                        <SgButton
                                            type="submit"
                                            text={getTextBtnSubmit()}
                                            onSubmit={() => { }}
                                            disabled={btnSubmit === 'enviando'}
                                            variant={getVariantBtnSubmit()}
                                            child={
                                                btnSubmit === 'enviando' ?
                                                    <Spinner
                                                        className=""
                                                        as="span"
                                                        animation="border"
                                                        size="sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    />
                                                    : getBsIconBtnSubmit()
                                            }
                                        />
                                    </FormGroup>
                                </Form>

                                <p className="mt-3">
                                    Ao enviar seu e-mail, uma mensagem com instruções para redefinição de senha será enviada para o seu <strong>endereço de e-mail cadastrado em seu perfil.</strong>  Portanto, é importante verificar em seguida sua caixa de entrada e/ou pasta de spam para encontrar o e-mail. Ele deve chegar em alguns minutos.
                                </p>

                                <a href="/sg-painel/login" className="mb-4 text-md-end text-decoration-underline float-end">
                                    <span className="me-1">Ir para login</span>
                                    <BsIcon iconName="PersonFillLock" />
                                </a>

                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col className="col-md-6 d-none d-md-block bg-primary bg-opacity-25 min-vh-100"></Col>
            </Row>
        </Container>
    );
};
