import { ItemPedido } from "./ItemPedido";

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
  items: ItemPedido[];
  obs: string;
  pagamento: { cartao: Number; dinheiro: Number; pix: number };
  status: string;
};


