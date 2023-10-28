import "./LoginPage.scss";
import { useEffect, useState } from "react";
import { Col, Container, Form, FormGroup, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SgButton } from "../../../../shared/components/SgButton/SgButton";
import { LoginService, LoginType } from "../services/LoginService";
import { useDispatch, useSelector } from "react-redux";
import jwt_decode from "jwt-decode";
import { UsuarioActionTypeEnum } from "../../../../../redux/usuario/UsuarioActionTypeEnum";
import { BsIcon } from "../../../../shared/components/BsIcon/BsIcon";

export const LoginPage: React.FC<{}> = () => {

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
                return <BsIcon iconName="CheckLg" />
            case 'unauthorized':
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

                                    <FormGroup className="mb-2">
                                        <label className="text-capitalize fw-semibold">senha</label>
                                        <input
                                            className={`form-control border border-primary  ${errors.password ? "is-invalid" : ""
                                                }`}
                                            type="password"
                                            {...register("password", { required: true, minLength: 6 })}
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

                                <a href="/sg-painel/forgot-password" className="mb-4 text-md-end text-decoration-underline float-end mt-3">
                                    <span className="me-1">Esqueceu sua senha?</span>
                                    <BsIcon iconName="PersonFillExclamation" />
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