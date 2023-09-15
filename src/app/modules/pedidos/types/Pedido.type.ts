import { ItemPedidoType } from "./ItemPedido.type";

export type PedidoType = {
  cliente: {
    nome: string;
    whatsapp: string;
  };
  codigo: string;
  createdAt: string;
  horaDespacho: string;
  isDeleted: boolean;
  isDeliver: boolean;
  items: ItemPedidoType[];
  obs: string;
  pagamento: { cartao: Number; dinheiro: Number; pix: number };
  status: string;
};


