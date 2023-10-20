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

    const navigate = useNavigate();
    useEffect(() => {
        const carregarClientes = () => {
            PedidosApiService.getClientes()
                .then((resp: PaginateType) => {
                    setClientes(resp.documentos);
                })
                .catch((err) => { });
        }
        carregarClientes();
    }, []);

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

    const clienteChange = (event: any) => {
        const cliente = clientes.find((c: ClienteType) => c._id === event.target.value);
        if (cliente && getValues().isDeliver) {
            setValue('endereco', cliente.enderecos[0]);

        } else {
            resetField('endereco.logradouro');
            resetField('endereco.bairro');
            resetField('endereco.numero');
            resetField('endereco.complemento');
        }
    }

    const isDeliverChange = (event: any) => {
        if (event.target.checked) {
            const cliente = clientes.find((c: ClienteType) => c._id === getValues().cliente);
            if (cliente) {
                setValue('endereco', cliente.enderecos[0]);
            }
        } else {
            resetField('endereco.logradouro');
            resetField('endereco.bairro');
            resetField('endereco.numero');
            resetField('endereco.complemento');
        }
    }

    return (<Container
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
                                Adicionar pedido
                            </h1>

                            <Form
                                onSubmit={handleSubmit(onSubmit)}
                                className="text-center bg-primary bg-opacity-25 p-4 rounded shadow"
                            >
                                <Form.Group className="my-2">
                                    <Form.Select className="form-control border border-primary fw-semibold" aria-label="select"
                                        onChangeCapture={(event) => clienteChange(event)}
                                        {...register("cliente", {
                                            required: true,
                                        })}>
                                        <option value={'null'}>Selecione o cliente</option>
                                        {clientes.map((cliente: ClienteType, index: number) => (
                                            <option key={index} value={cliente._id}>{cliente.nome}</option>
                                        ))}
                                    </Form.Select>
                                </Form.Group>
                                <Form.Group className="my-2">
                                    <Form.Check type="checkbox" label="Entrega?" className="text-start" onChangeCapture={(event) => isDeliverChange(event)}
                                        {...register("isDeliver", {
                                            required: true,
                                        })}
                                    />
                                </Form.Group>

                                <hr />
                                <Form.Group className="my-2 text-start">
                                    <label>Logradouro</label>
                                    <input type="text" className="form-control border border-primary fw-semibold"
                                        {...register("endereco.logradouro", { required: true })} />
                                </Form.Group>
                                <Form.Group className="my-2 text-start">
                                    <label>Bairro</label>
                                    <input type="text" className="form-control border border-primary fw-semibold"
                                        {...register("endereco.bairro", { required: true })} />
                                </Form.Group>
                                <Form.Group className="my-2 text-start">
                                    <label>N°</label>
                                    <input type="text" className="form-control border border-primary fw-semibold"
                                        {...register("endereco.numero", { required: true })} />
                                </Form.Group>
                                <Form.Group className="my-2 text-start">
                                    <label>Complemento</label>
                                    <input type="text" className="form-control border border-primary fw-semibold"
                                        {...register("endereco.complemento", { required: true })} />
                                </Form.Group>

                                <hr />
                                <Form.Group className="my-2 text-start">
                                    <label>Pix</label>
                                    <div className="input-group">
                                        <span className="input-group-text border border-primary">
                                            <BsIconComponent iconName="Coin" />
                                        </span>
                                        <input type="text" className="form-control border border-primary fw-semibold"
                                            {...register("pagamento.pix", { required: true })} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="my-2 text-start">
                                    <label>Dinheiro</label>
                                    <div className="input-group">
                                        <span className="input-group-text border border-primary">
                                            <BsIconComponent iconName="Cash" />
                                        </span>
                                        <input type="text" className="form-control border border-primary fw-semibold"
                                            {...register("pagamento.dinheiro", { required: true })} />
                                    </div>
                                </Form.Group>
                                <Form.Group className="my-2 text-start">
                                    <label>Cratão de débito</label>
                                    <div className="input-group">
                                        <span className="input-group-text border border-primary">
                                            <BsIconComponent iconName="CreditCard" />
                                        </span>
                                        <input type="text" className="form-control border border-primary fw-semibold"
                                            {...register("pagamento.cartaoDebito", { required: true })} />
                                        <span className="input-group-text border border-primary">+ taxa: R$ 1</span>
                                    </div>
                                </Form.Group>
                                <Form.Group className="my-2 text-start">
                                    <label>Cratão de crédito</label>
                                    <div className="input-group">
                                        <span className="input-group-text border border-primary">
                                            <BsIconComponent iconName="CreditCardFill" />
                                        </span>
                                        <input type="text" className="form-control border border-primary fw-semibold"
                                            {...register("pagamento.cartaoCredito", { required: true })} />
                                        <span className="input-group-text border border-primary">+ taxa: R$ 2.50</span>
                                    </div>
                                </Form.Group>


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