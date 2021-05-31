export interface ModalProps {
  title: string;
  description: string;
  color: string;
  onClickClose: React.MouseEventHandler<HTMLButtonElement>;
  handleSvgError?: boolean;
}

export interface ToastProps {
  title: string;
  description: string;
  color: string;
  handleSvgError: boolean;
  onClickClose: React.MouseEventHandler<HTMLButtonElement>;
}
