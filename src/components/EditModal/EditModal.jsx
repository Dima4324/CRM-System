import { useState } from "react";
import style from "./EditModal.module.scss";
import { updataTodo } from "../../api/todos";
import { Button } from "../Button/Button";

export const EditModal = ({
  updateTodos,
  title,
  handleToggleModal,
  id,
}) => {
  const [inputValue, setInputValue] = useState(title);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  

  return (
    <div
      className={style.overlay}
      onClick={handleToggleModal}
    >
      <div className={style.modal}>
        <form onSubmit={submitForm}>
          <input
            type="text"
            className={style.editTodoInput}
            value={inputValue}
            onChange={onChangeInputValue}
          />
          <Button
            className={style.editTodoSubmit}
            disabled={isLoading}
          >
            Редактировать
          </Button>
        </form>
        {!error && <p>{error}</p>}
        <Button className={style.closeButton} onClick={handleToggleModal}>
          Закрыть
        </Button>
      </div>
    </div>
  );
};
