import style from "./Button.module.scss"


export const Button = ({ onClick, className = '', text = '', disabled, children }) => {
    return (
         <button className={`${style.default} ${className}`} onClick={onClick} disabled={disabled}>{children}</button>
    )
}