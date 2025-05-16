import style from "./Input.module.scss";

interface InputProps {
  className?: string;
  type: string;
  name?: string;
  ref?: React.Ref<HTMLInputElement>;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void | Promise<void>;
  min?: number;
  max?: number;
  checked?: boolean;
}

export const Input: React.FC<InputProps> = ({ className = "", ...props }) => {
  return <input className={`${style.default} ${className}`} {...props}/>;
};
