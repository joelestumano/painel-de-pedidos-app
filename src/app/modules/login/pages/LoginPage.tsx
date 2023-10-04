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

export const LoginPage: React.FC<{}> = () => {

    UseDocumentTitle("SG - Login");

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    const navigate = useNavigate();
    const [enviando, setEnviando] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => { }, []);

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<LoginType>();

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        try {
            setEnviando(true);
            await LoginService.login(data).then((res) => {
                var userDecoded = jwt_decode(res.access_token);
                dispatch({
                    type: UsuarioActionTypeEnum.SET_USUARIO,
                    payload: userDecoded
                })
                navigate("/");
            });
        } catch (error) {
            console.log(error);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <Container
            fluid={true}
            className={`min-vh-100 d-flex flex-column justify-content-start justify-content-md-center py-4 py-md-0
         ${isOnline ? "" : "bg-danger bg-opacity-25"}`}
        >
            <Row className="">
                <Col className="col-12 col-md-6 d-flex align-items-md-center">
                    <Container fluid={false}>
                        <Row className="d-flex justify-content-center">
                            <Col className="col-12 col-md-6 ">
                                <Row className="justify-content-center mb-2">
                                    <Col className="col-sm-12">
                                        <h2 className="text-center px-2 p-lg-0 text-captalize fs-bebas-neue lh-1 title-login">
                                            Login
                                        </h2>
                                    </Col>
                                </Row>
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

                                    <SgButton
                                        type="submit"
                                        text={enviando ? "enviando..." : "enviar"}
                                        onSubmit={() => { }}
                                        disabled={enviando}
                                        child={
                                            enviando ? (
                                                <Spinner
                                                    className=""
                                                    as="span"
                                                    animation="border"
                                                    size="sm"
                                                    role="status"
                                                    aria-hidden="true"
                                                />
                                            ) : null
                                        }
                                    />
                                </Form>
                            </Col>
                        </Row>
                    </Container>
                </Col>
                <Col className="col-md-6 d-none d-md-block bg-primary bg-opacity-25 vh-100"></Col>
            </Row>
        </Container>
    );
};
