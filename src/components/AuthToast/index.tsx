import { ToastProps } from "../../@types/Modal";
import { BackDrop, CardWrapper } from "./styles";
import { AiFillLock } from "react-icons/ai";

export const AuthToast = ({
  title,
  description,
  color,
  onClickClose,
}: ToastProps) => (
  <BackDrop>
    <CardWrapper color={color}>
      <header>
        <AiFillLock size={40} />
        <h2>{title}</h2>
      </header>
      <div>
        <p>{description}</p>
      </div>

      <footer>
        <button onClick={onClickClose}>Close</button>
      </footer>
    </CardWrapper>
  </BackDrop>
);
