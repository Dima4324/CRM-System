import { useState } from "react";
import style from "./EditModal.module.scss";
import { initialStateBodyRequest } from "../../utils/constants";
import { updataTodo } from "../../api/updateTodo";
import { Button } from "../Button/Button";

export const EditModal = ({ title, handleOpenModal, id, todoCompleteFlag, setTodoCompleteFlag }) => {
  const [editTodoInputValue, setEditTodoInputValue] = useState(title);
  const [validInput, setValidInput] = useState({
    isValid: false,
    message: "",
    isLoading: false,
  });

  const changeInputValue = (e) => {
    setEditTodoInputValue(e.target.value);
  };

  const SubmitForm = async (e) => {
    e.preventDefault();

    if (editTodoInputValue.length < 2) {
      setValidInput({
        ...validInput,
        isValid: false,
        message: "Минимальная длина 2 символа",
      });
      return;
    }

    if (editTodoInputValue.length > 64) {
      setValidInput({
        ...validInput,
        isValid: false,
        message: "Максимальная длина 64 символа",
      });
      return;
    }

    setValidInput({
      ...validInput,
      isLoading: true,
    });

    const bodyRequest = {
      title: editTodoInputValue,
    };

    await updataTodo(id, bodyRequest);

    
    setTodoCompleteFlag(!todoCompleteFlag);
    
    handleOpenModal();
  };

  return (
    <div
      className={style.overlay}
      onClick={(e) => e.target === e.currentTarget && handleOpenModal()}
    >
      <div className={style.modal}>
        <form onSubmit={SubmitForm}>
          <input
            type="text"
            className={style.editTodoInput}
            value={editTodoInputValue}
            onChange={changeInputValue}
          />
          <Button className={style.editTodoSubmit} disabled={validInput.isLoading}>Редактировать</Button>
        </form>
        {!validInput.isValid && <p>{validInput.message}</p>}
        <Button className={style.closeButton} onClick={handleOpenModal}>Закрыть</Button>
      </div>
    </div>
  );
};
