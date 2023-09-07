export type Pedido = {
  cliente: {
    nome: string;
    whatsapp: string;
  };
  codigo: string;
  createdAt: string;
  horaDespacho: string;
  isDeleted: boolean;
  isDeliver: boolean;
  items: { bannerUrl: string; descricao: string; valor: number }[];
  obs: string;
  pagamento: { cartao: Number; dinheiro: Number; pix: number };
  status: string;
};
