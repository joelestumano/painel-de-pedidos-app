import { useNavigate } from "react-router-dom";
import { UseDocumentTitle } from "../../../../shared/hooks/UseDocumentTitleHook";
import { Col, Container, Form, Row } from "react-bootstrap";
import { useSelector } from "react-redux";
import { SubmitHandler, useForm } from "react-hook-form";
import { BsIconComponent } from "../../../../shared/components/bs-icon/BsIconComponent";
import { useEffect, useState } from "react";
import { PedidosApiService } from "../../services/PedidosApiService";
import { PaginateType } from "../../../../shared/types/PaginateType";
import { ClienteType } from "../../../../shared/types/ClienteType";
import { TaxaType } from "../../../../shared/types/TaxaType";
import { SgButton } from "../../../../shared/components/SgButton/SgButton";

type addPedidoType = {
    cliente: string;
    horaDespacho: string;
    isDeliver: boolean;
    /* items: ItemPedidoInterface[] */
    endereco: {
        logradouro: string;
        bairro: string;
        numero: string;
        complemento: string;
        principal?: boolean;
    };
    pagamento: {
        cartaoCredito: number;
        cartaoDebito: number;
        dinheiro: number;
        pix: number;
    }
    obs: string;
    /* status: PedidoStatusEnum; */
    codigo?: string;
    /* taxasEServicos: TaxaServicoInterface[]; */
    valorTotal: number;
}

export const AddPedidoPage: React.FC<{}> = () => {

    UseDocumentTitle("SG - Adicionar pedido");

    const { isOnline } = useSelector(
        (rootReducer: any) => rootReducer.EventosReducer
    );

    const [clientes, setClientes] = useState<ClienteType[]>([]);
    const [taxas, setTaxas] = useState<TaxaType[]>([]);

    const navigate = useNavigate();

    useEffect(() => {
        const carregarClientes = () => {
            PedidosApiService.getClientes()
                .then((resp: PaginateType) => {
                    setClientes(resp.documentos);
                })
                .catch((err) => { });
        }
        const carregarTaxas = () => {
            PedidosApiService.getTaxas()
                .then((resp: PaginateType) => {
                    setTaxas(resp.documentos);
                })
                .catch((err) => { });
        }
        carregarClientes();
        carregarTaxas();
    }, []);

    const getTaxa = (descricao: 'cartaoDebito' | 'cartaoCredito'): TaxaType | undefined => {
        return taxas.find((t: TaxaType) => t.descricao === descricao);
    }

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        getValues,
        resetField,
        formState: { errors },
    } = useForm<addPedidoType>();

    const onSubmit: SubmitHandler<addPedidoType> = async (data) => { }

    const handleClienteChange = (event: any) => {
        const cliente = clientes.find((c: ClienteType) => c._id === event.target.value);
        if (cliente && getValues().isDeliver) {
            setValue('endereco', cliente.enderecos[0], { shouldValidate: true });
        } else {
            resetField('isDeliver');
            resetFieldsEndereco();
        }
    }

    const handleIsDeliverChange = (event: any) => {
        if (event.target.checked) {
            const cliente = clientes.find((c: ClienteType) => c._id === getValues().cliente);
            if (cliente) {
                setValue('endereco', cliente.enderecos[0], { shouldValidate: true });
            }
        } else {
            resetFieldsEndereco();
        }
    }

    const resetFieldsEndereco = () => {
        resetField('endereco.logradouro');
        resetField('endereco.bairro');
        resetField('endereco.numero');
        resetField('endereco.complemento');
    }

    return (<Container
        fluid={true}
        className={`min-vh-100 d-flex flex-column justify-content-start justify-content-md-center ${isOnline ? "" : "bg-danger bg-opacity-25"}`}
    >
        <Row className="flex-row-reverse_">
            <Col className="col-12 col-md-6 d-flex align-items-md-center py-4">
                <Container fluid={false}>
                    <Row className="d-flex justify-content-center">
                        <Col className="col-12 col-md-10">

                            <h1 className="">
                                Adicionar pedido
                            </h1>

                            <Form onSubmit={handleSubmit(onSubmit)} className="text-start p-4 rounded shadow">

                                <Row className={`bg-primary bg-opacity-25 pt-2 pb-3 mb-3 rounded`}>
                                    <Form.Group as={Col} lg={9}>
                                        <label>Cliente</label>
                                        <Form.Select className={`form-select border border-primary fw-semibold ${errors.cliente ? "is-invalid" : ""}`} aria-label="select"
                                            onChangeCapture={(event) => handleClienteChange(event)}
                                            {...register("cliente", {
                                                required: true,
                                            })}>
                                            <option value={''}>Selecione o cliente</option>
                                            {clientes.map((cliente: ClienteType, index: number) => (
                                                <option key={index} value={cliente._id}>{cliente.nome}</option>
                                            ))}
                                        </Form.Select>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={3} className="align-self-end">
                                        <Form.Check type="checkbox" label="Entrega?" className={`text-start ${errors.isDeliver ? "is-invalid" : ""}`} onChangeCapture={(event) => handleIsDeliverChange(event)}
                                            {...register("isDeliver", {
                                                required: false,
                                                disabled: !(getValues().cliente?.length > 0)
                                            })}
                                        />
                                    </Form.Group>
                                </Row>

                                <Row className={`bg-primary bg-opacity-25 pt-2 pb-3 mb-3 rounded ${getValues().isDeliver ? 'block' : 'd-none'}`}>
                                    <Form.Group as={Col} lg={12}>
                                        <label>Logradouro</label>
                                        <input type="text" className={`form-control border border-primary fw-semibold ${errors.endereco?.logradouro ? "is-invalid" : ""}`}
                                            {...register("endereco.logradouro", { required: getValues().isDeliver })} />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={12}>
                                        <label>Bairro</label>
                                        <input type="text" className={`form-control border border-primary fw-semibold ${errors.endereco?.bairro ? "is-invalid" : ""}`}
                                            {...register("endereco.bairro", { required: getValues().isDeliver })} />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={12}>
                                        <label>N°</label>
                                        <input type="text" className={`form-control border border-primary fw-semibold ${errors.endereco?.numero ? "is-invalid" : ""}`}
                                            {...register("endereco.numero", { required: getValues().isDeliver })} />
                                    </Form.Group>
                                    <Form.Group as={Col} lg={12}>
                                        <label>Complemento</label>
                                        <input type="text" className={`form-control border border-primary fw-semibold ${errors.endereco?.complemento ? "is-invalid" : ""}`}
                                            {...register("endereco.complemento", { required: false })} />
                                    </Form.Group>
                                </Row>

                                <Row className={`bg-primary bg-opacity-25 pt-2 pb-3 mb-3 rounded`}>
                                    <Form.Group as={Col} lg={12}>
                                        <label>Pix</label>
                                        <div className="input-group">
                                            <span className="input-group-text border border-primary">
                                                <BsIconComponent iconName="Coin" />
                                            </span>
                                            <input type="text" className="form-control border border-primary fw-semibold"
                                                {...register("pagamento.pix")} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={12}>
                                        <label>Dinheiro</label>
                                        <div className="input-group">
                                            <span className="input-group-text border border-primary">
                                                <BsIconComponent iconName="Cash" />
                                            </span>
                                            <input type="text" className="form-control border border-primary fw-semibold"
                                                {...register("pagamento.dinheiro")} />
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={12}>
                                        <label>Cratão de débito</label>
                                        <div className="input-group">
                                            <span className="input-group-text border border-primary">
                                                <BsIconComponent iconName="CreditCard" />
                                            </span>
                                            <input type="text" className="form-control border border-primary fw-semibold"
                                                {...register("pagamento.cartaoDebito")} />
                                            <span className="input-group-text border border-primary">Taxa: R$ {getTaxa('cartaoDebito')?.valor}</span>
                                        </div>
                                    </Form.Group>
                                    <Form.Group as={Col} lg={12}>
                                        <label>Cratão de crédito</label>
                                        <div className="input-group">
                                            <span className="input-group-text border border-primary">
                                                <BsIconComponent iconName="CreditCardFill" />
                                            </span>
                                            <input type="text" className="form-control border border-primary fw-semibold"
                                                {...register("pagamento.cartaoCredito")} />
                                            <span className="input-group-text border border-primary">Taxa: R$ {getTaxa('cartaoCredito')?.valor}</span>
                                        </div>
                                    </Form.Group>
                                </Row>

                                <SgButton
                                    type="submit"
                                    /*  text={'getTextBtnSubmit()'} */
                                    text={'enviar'}
                                    onSubmit={() => { }}
                                    /*  disabled={btnSubmit === 'enviando'}
                                     variant={getVariantBtnSubmit()} */
                                    variant={'primary'}
                                /*  child={
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
                                 } */
                                />
                            </Form>

                            <a href="/" className="mb-4 text-md-end text-decoration-underline float-end mt-3">
                                <span className="me-1">ir para início</span>
                                <BsIconComponent iconName="HouseFill" />
                            </a>

                        </Col>
                    </Row>
                </Container>
            </Col>
            <Col className="col-md-6 d-none d-md-block bg-primary bg-opacity-25 min-vh-100"></Col>
        </Row>
    </Container>
    );

}