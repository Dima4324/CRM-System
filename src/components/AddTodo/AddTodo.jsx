import style from "./AddTodo.module.scss";
import { Button } from "../Button/Button";
import { useState } from "react";
import { addTodo } from "../../api/addTodo";
import { initialStateBodyRequest } from "../../utils/constants";

export const AddTodo = ({ todoCompleteFlag, setTodoCompleteFlag }) => {
  const [bodyRequest, setBodyRequest] = useState(initialStateBodyRequest);
  const [validInput, setValidInput] = useState({
    isValid: false,
    message: "",
    isLoading: false,
  });

  const changeInputValue = (e) => {
    setBodyRequest({...bodyRequest, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (bodyRequest.title.length < 2) {
      setValidInput({
        ...validInput,
        isValid: false,
        message: "Минимальная длина 2 символа",
      });
      return;
    }

    if (bodyRequest.title.length > 64) {
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

    await addTodo(bodyRequest);
    setTodoCompleteFlag(!todoCompleteFlag);
    setBodyRequest(initialStateBodyRequest);

    setValidInput({
      ...validInput,
      isLoading: false,
      isValid: true,
    });
  };

  return (
    <form className={style.addTodoForm} onSubmit={handleSubmit}>
      <div className={style.inputContainer}>
        <input
          type="text"
          name="title"
          placeholder="Введите задачу..."
          value={bodyRequest.title}
          onChange={changeInputValue}
          className={style.input}
          min={2}
          max={64}
        />
        {!validInput.isValid && (
          <p className={style.errorMessage}>{validInput.message}</p>
        )}
      </div>
      <Button className={style.button} text="Добавить" disabled={validInput.isLoading}>Добавить</Button>
    </form>
  );
};
