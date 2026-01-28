import { ReactNode } from "react";
import './index.css'

type ButtonProps = {
  children: ReactNode;
  className?: string;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button className={`button ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
};

export default Button;