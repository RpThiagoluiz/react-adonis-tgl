import { ModalProps } from "../../@types/Modal";
import { BackDrop, CardWrapper } from "./styles";
import { IoChatbubbles, IoCloseCircleSharp } from "react-icons/io5";

export const ModalError = ({
  title,
  description,
  color,
  onClickClose,
}: ModalProps) => (
  <BackDrop>
    <CardWrapper color={color}>
      <header>
        <IoChatbubbles size={40} />
        <h2>{title}</h2>
      </header>
      <div>
        <p>{description}</p>
      </div>

      <footer>
        <button onClick={onClickClose}>
          Close
          <IoCloseCircleSharp size={15} />
        </button>
      </footer>
    </CardWrapper>
  </BackDrop>
);
