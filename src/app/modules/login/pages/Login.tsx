import { useEffect, useState } from "react";
import { Col, Container, Form, Row, Spinner } from "react-bootstrap";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { SgButton } from "../../../shared/components/SgButton/SgButton";
import axios from "axios";
import { LoginService, LoginType } from "../services/LoginService";

export const LoginPage: React.FC<{}> = () => {
    const navigate = useNavigate();
    const [enviando, setEnviando] = useState(false);
    const [token, setToken] = useState("");

    useEffect(() => {
        const obterEToken = async () => {
            await configAxiosWithToken(token);
        };

        obterEToken().then(() => {
            if (token && token.length) {
                navigate("/");
            }
        })
    }, [token, navigate]);

    const configAxiosWithToken = async (token: string) => {
        return new Promise<void>((resolve) => {
            axios.defaults.headers.common = {
                ...axios.defaults.headers.common,
                Authorization: `Bearer ${token}`,
            };
            resolve();
        });
    };

    const {
        register,
        handleSubmit,
        //watch,
        formState: { errors },
    } = useForm<LoginType>();

    const onSubmit: SubmitHandler<LoginType> = async (data) => {
        try {
            setEnviando(true);
            const response = await LoginService.login(data);
            setToken(response.access_token);
        } catch (error) {
            console.log(error);
        } finally {
            setEnviando(false);
        }
    };

    return (
        <Container
            fluid={true}
            className={`min-vh-100 d-flex flex-column align-items-center justify-content-start justify-content-md-center py-4 py-md-0
         ${true ? "" : "bg-danger bg-opacity-25"}`}
        >
            <Row className="justify-content-center mb-2">
                <Col className="col-sm-12">
                    <h2 className="text-center px-2 p-lg-0 text-uppercase fs-bebas-neue lh-1">
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
        </Container>
    );
};
