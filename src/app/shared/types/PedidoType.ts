import { PedidoItemType } from "./ItemPedidoType";

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
  items: PedidoItemType[];
  obs: string;
  pagamento: { cartao: Number; dinheiro: Number; pix: number };
  status: string;
};


