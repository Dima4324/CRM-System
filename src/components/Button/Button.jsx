import style from "./Button.module.scss";

export const Button = ({ className = "", children, ...props }) => {
  return (
    <button className={`${style.default} ${className}`} {...props}>{children}</button>
  );
};
