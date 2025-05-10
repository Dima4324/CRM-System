import style from "./Input.module.scss";

export const Input = ({ className = "", ...props }) => {
  return <input className={`${style.default} ${className}`} {...props} />;
};
