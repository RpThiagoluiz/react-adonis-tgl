export interface ErrorProps {
  title: string;
  description: string;
  color: string;
  active: boolean;
  redirect?: boolean;
  handleSvgError?: boolean;
}
