import { createPortal } from "react-dom";
import { deleteTodo } from "../../api/deleteTodo";
import { updataTodo } from "../../api/updateTodo";
import { Button } from "../Button/Button";
import style from "./TodoItem.module.scss";
import { useState } from "react";
import { EditModal } from "../EditModal/EditModal";

export const TodoItem = ({ todo, todoCompleteFlag, setTodoCompleteFlag }) => {
  const [isChecked, setIsChecked] = useState(todo.isDone);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const ClickDeleteTodoButton = async () => {
    setIsLoading(true)
    await deleteTodo(todo.id);
    setTodoCompleteFlag(!todoCompleteFlag);
    setIsLoading(false)
  };

  const handleCheckbox = async () => {
    const bodyRequest = {
      isDone: !isChecked,
    };

    await updataTodo(todo.id, bodyRequest);

    setIsChecked(!isChecked);
    setTodoCompleteFlag(!todoCompleteFlag);
  };

  const handleOpenModal = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={style.todoItem}>
      <div className={style.checkbox}>
        <input
          className={style.checkboxInput}
          type="checkbox"
          onChange={handleCheckbox}
          checked={isChecked}
        />
        <label
          className={`${style.checkboxLabel} ${
            isChecked ? style.checkboxLabelClicked : ""
          }`}
        >
          {todo.title}
        </label>
      </div>
      <div className={style.buttons}>
        <Button className={style.editButton} onClick={handleOpenModal} />
        <Button
          className={style.deleteButton}
          onClick={ClickDeleteTodoButton}
          disabled={isLoading}
        />
      </div>
      {isOpen &&
        createPortal(
          <EditModal title={todo.title} handleOpenModal={handleOpenModal} id={todo.id} todoCompleteFlag={todoCompleteFlag} setTodoCompleteFlag={setTodoCompleteFlag}/>,
          document.body
        )}
    </div>
  );
};
