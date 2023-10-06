import "./LoginPage.scss";
import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SgButton } from "../../../shared/components/SgButton/SgButton";
import { LoginService, LoginType } from "../services/LoginService";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { UsuarioActionTypeEnum } from "../../../../redux/usuario/UsuarioActionTypeEnum";
import { UseDocumentTitle } from "../../../shared/hooks/UseDocumentTitleHook";
import { BsIconComponent } from "../../../shared/components/bs-icon/BsIconComponent";

export const LoginPage: React.FC<{}> = () => {

    UseDocumentTitle("SG - Login");

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    const navigate = useNavigate();
    const [btnSubmit, setBtnSubmit] = useState<'parado' | 'enviando' | 'checado' | 'unauthorized' | 'falhou'>('parado');
    const dispatch = useDispatch();

    useEffect(() => { }, []);

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<LoginType>();

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        setBtnSubmit('enviando');
        await LoginService.login(data).then((res) => {
            setBtnSubmit("checado");
            setTimeout(() => {
                var userDecoded = jwt_decode(res.access_token);
                dispatch({
                    type: UsuarioActionTypeEnum.SET_USUARIO,
                    payload: userDecoded
                })
                LoginService.setToken(res);
                navigate("/");
            }, 750);
        }).catch((error) => {
            if (error?.response?.status === 401) {
                setBtnSubmit('unauthorized')
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
                return 'conectado'
            case 'unauthorized':
                return 'não autorizado'
            case 'falhou':
                return 'um erro ocorreu'
            default: return 'enviar'
        }
    }

    const getVariantBtnSubmit = (): "success" | "danger" | "primary" => {
        switch (btnSubmit) {
            case 'checado':
                return 'success'
            case 'unauthorized':
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
            case 'unauthorized':
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
            <Row className="">
                <Col className="col-12 col-md-6 d-flex align-items-md-center py-4">
                    <Container fluid={false}>
                        <Row className="d-flex justify-content-center">
                            <Col className="col-12 col-md-8">

                                <h2 className="text-center px-2 p-lg-0 text-captalize fs-bebas-neue lh-1 title-login">
                                    Login
                                </h2>
                                <p className="">
                                    Utilize seu <strong> endereço de e-mail e senha cadastrados em seu perfil</strong> para ter acesso ao SG-Painel.
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

                                    <a href="/forgotten-password" className="nav-link mb-4 text-md-end text-decoration-underline">
                                        <span className="me-1">esqueceu sua senha?</span>
                                        <BsIconComponent iconName="PersonFillExclamation" />
                                    </a>

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
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col className="col-md-6 d-none d-md-block bg-primary bg-opacity-25 min-vh-100"></Col>
            </Row>
        </Container>
    );
};