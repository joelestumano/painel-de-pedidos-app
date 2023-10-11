import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { UseDocumentTitle } from "../../../shared/hooks/UseDocumentTitleHook";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountService, ResetPassType } from "../service/AccountService";
import { useNavigate } from "react-router-dom";
import { BsIconComponent } from "../../../shared/components/bs-icon/BsIconComponent";
import { SgButton } from "../../../shared/components/SgButton/SgButton";
import { useState } from "react";

export const ResetPasswordPage: React.FC<{}> = () => {

    UseDocumentTitle("SG - Redefinir senha");

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    const [btnSubmit, setBtnSubmit] = useState<'parado' | 'enviando' | 'checado' | 'invalid-token' | 'falhou'>('parado');
    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<ResetPassType>();

    const onSubmit: SubmitHandler<ResetPassType> = async (data) => {
        setBtnSubmit('enviando');
        await AccountService.resetPassword(data).then((res) => {
            setBtnSubmit("checado");
            setTimeout(() => {
                navigate("/");
            }, 750);
        }).catch((error) => {
            if (error?.response?.status === 400) {
                setBtnSubmit('invalid-token');
            } else {
                setBtnSubmit('falhou')
            }
        }).finally(() => { });
    };

    const getTextBtnSubmit = (): string => {
        switch (btnSubmit) {
            case 'enviando':
                return 'enviando'
            case 'checado':
                return 'senha redefinida'
            case 'invalid-token':
                return 'token inválido'
            case 'falhou':
                return 'um erro ocorreu'
            default: return 'enviar'
        }
    }

    const getVariantBtnSubmit = (): "success" | "danger" | "primary" => {
        switch (btnSubmit) {
            case 'checado':
                return 'success'
            case 'invalid-token':
                return 'danger'
            case 'falhou':
                return 'danger'
            default: return 'primary'
        }
    }

    const getBsIconBtnSubmit = (): JSX.Element | null => {
        switch (btnSubmit) {
            case 'checado':
                return <BsIconComponent iconName="CheckLg" />
            case 'invalid-token':
                return <BsIconComponent iconName="XOctagon" />
            case 'falhou':
                return <BsIconComponent iconName="BugFill" />
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
                                    Redefinir senha
                                </h1>

                                <p className="">
                                    Certifique-se de inserir <strong>corretamente</strong> todas as informações solicitadas para prossiguir com o envio.
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
                                    <input
                                        className={`form-control my-3 my-lg-3 border border-primary fw-semibold ${errors.password ? "is-invalid" : ""
                                            }`}
                                        type="password"
                                        {...register("password", { required: true, minLength: 6 })}
                                        placeholder={"Senha"}
                                    />

                                    <input
                                        className={`form-control my-3 my-lg-3 border border-primary fw-semibold ${errors.confirmPassword ? "is-invalid" : ""
                                            }`}
                                        type="password"
                                        {...register("confirmPassword", { required: true, minLength: 6 })}
                                        placeholder={"Confirme sua senha"}
                                    />

                                    <input
                                        className={`form-control my-3 my-lg-3 border border-primary fw-semibold ${errors.token ? "is-invalid" : ""
                                            }`}
                                        type="text"
                                        {...register("token", { required: true })}
                                        placeholder={"Token"}
                                    />

                                    {/*  <a href="/forgot-password" className="mb-4 text-md-end text-decoration-underline">
                                        <span className="me-1">esqueceu sua senha?</span>
                                        <BsIconComponent iconName="PersonFillExclamation" />
                                    </a> */}

                                    {<SgButton
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
                                    />}
                                </Form>

                                <p className="mt-3">
                                </p>

                                <a href="/login" className="mb-4 text-md-end text-decoration-underline float-end">
                                    <span className="me-1">ir para login</span>
                                    <BsIconComponent iconName="PersonFillLock" />
                                </a>
                            </Col>
                        </Row>
                    </Container>

                </Col>
                <Col className="col-md-6 d-none d-md-block bg-primary bg-opacity-25 min-vh-100"></Col>
            </Row>
        </Container>
    )
}