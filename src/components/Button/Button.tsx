import style from "./Button.module.scss";

interface ButtonProps {
  className: string;
  children?: React.ReactNode;
  onClick?: (e: React.MouseEvent<HTMLButtonElement> ) => void | Promise<void>;
  disabled?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ className = "", children, ...props }) => {
  return (
    <button className={`${style.default} ${className}`} {...props}>
      {children}
    </button>
  );
};
