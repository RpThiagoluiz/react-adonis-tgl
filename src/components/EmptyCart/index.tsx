import { Container } from "./styles";
import { MdRemoveShoppingCart } from "react-icons/md";

export const EmptyCart = () => (
  <Container>
    <MdRemoveShoppingCart />
    <span>Carrinho Vazio...</span>
  </Container>
);
