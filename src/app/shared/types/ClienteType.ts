export type ClienteType = {
    _id: string;
    nome: string;
    enderecos: EnderecoType[];
};

type EnderecoType = {
    bairro: string;
    complemento: string;
    logradouro: string;
    numero: string;
    principal: boolean;
};
