import { Col, Container, Form, Row } from "react-bootstrap";
import { UseDocumentTitle } from "../../../shared/hooks/UseDocumentTitleHook";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { AccountService, ResetPassType } from "../service/AccountService";
import { useNavigate } from "react-router-dom";
import { BsIconComponent } from "../../../shared/components/bs-icon/BsIconComponent";

export const ResetPasswordPage: React.FC<{}> = () => {

    UseDocumentTitle("SG - Redefinir senha");

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    const navigate = useNavigate();

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<ResetPassType>();

    const onSubmit: SubmitHandler<ResetPassType> = async (data) => {
        //setBtnSubmit('enviando');
        await AccountService.resetPassword(data).then((res) => {
            //setBtnSubmit("checado");
            setTimeout(() => {

                //LoginService.setToken(res);
                //navigate("/");
            }, 750);
        }).catch((error) => {
            if (error?.response?.status === 401) {
                // setBtnSubmit('unauthorized')
            } else {
                // setBtnSubmit('falhou')
            }
        }).finally(() => { });
    };

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
                                        className={`form-control mt-3 mt-lg-3 mb-2 border border-primary fw-semibold ${errors.password ? "is-invalid" : ""
                                            }`}
                                        type="password"
                                        {...register("password", { required: true, minLength: 6 })}
                                        placeholder={"Senha"}
                                    />

                                    <input
                                        className={`form-control mt-3 mt-lg-3 mb-2 border border-primary fw-semibold ${errors.confirmPassword ? "is-invalid" : ""
                                            }`}
                                        type="password"
                                        {...register("confirmPassword", { required: true, minLength: 6 })}
                                        placeholder={"Confirme sua senha"}
                                    />

                                    <input
                                        className={`form-control mt-3 mt-lg-3 mb-2 border border-primary fw-semibold ${errors.token ? "is-invalid" : ""
                                            }`}
                                        type="text"
                                        {...register("token", { required: true })}
                                        placeholder={"Token"}
                                    />

                                    {/*  <a href="/forgot-password" className="nav-link mb-4 text-md-end text-decoration-underline">
                                        <span className="me-1">esqueceu sua senha?</span>
                                        <BsIconComponent iconName="PersonFillExclamation" />
                                    </a> */}

                                    {/* <SgButton
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
                                    /> */}
                                </Form>

                                <p className="mt-3">

                                </p>

                                <a href="/login" className="nav-link mb-4 text-md-end text-decoration-underline">
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