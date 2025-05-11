import { deleteTodo, updataTodo } from "../../api/todos";
import { Button } from "../Button/Button";
import style from "./TodoItem.module.scss";
import { useState } from "react";
import { Input } from "../Input/Input";

export const TodoItem = ({ updateTodos, todo }) => {
  const [isChecked, setIsChecked] = useState(todo.isDone);
  const [inputValue, setInputValue] = useState(todo.title);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const onChangeInputValue = (e) => {
    setInputValue(e.target.value);
  };

  const handleToggleIsEditing = () => {
    setIsEditing(!isEditing);

    if (isEditing) {
      setInputValue(todo.title);
      setError("");
    }
  };

  const handleDeleteTodo = async () => {
    setIsLoading(true);

    await deleteTodo(todo.id);
    await updateTodos();

    setIsLoading(false);
  };

  const handleCheckbox = async () => {
    const bodyRequest = {
      isDone: !isChecked,
    };

    await updataTodo(todo.id, bodyRequest);
    await updateTodos();

    setIsChecked(!isChecked);
  };

  const handleConfirmEditTodo = async (e) => {
    e.preventDefault();

    if (inputValue.length < 2) {
      setError("Минимальная длина 2 символа");
      return;
    } else if (inputValue.length > 64) {
      setError("Максимальная длина 64 символа");
      return;
    }

    setIsLoading(true);

    const bodyRequest = {
      title: inputValue,
    };

    await updataTodo(todo.id, bodyRequest);
    await updateTodos();

    handleToggleIsEditing();

    setIsLoading(false);
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
        {isEditing ? (
          <div className={style.editTodoContainer}>
            <Input
              className={style.editTodoInput}
              type="text"
              name="title"
              placeholder="Редактируйте задачу..."
              value={inputValue}
              onChange={onChangeInputValue}
              min={2}
              max={64}
            />
            {error && <p className={style.error}>{error}</p>}
          </div>
        ) : (
          <label
            className={`${style.checkboxLabel} ${
              isChecked ? style.checkboxLabelClicked : ""
            }`}
          >
            {todo.title}
          </label>
        )}
      </div>
      <div className={style.buttons}>
        {isEditing ? (
          <>
            <Button
              className={style.editTodoSubmit}
              onClick={handleConfirmEditTodo}
              disabled={isLoading}
            />
            <Button
              className={style.editTodoCancel}
              onClick={handleToggleIsEditing}
              disabled={isLoading}
            />
          </>
        ) : (
          <>
            <Button
              className={style.editButton}
              onClick={handleToggleIsEditing}
            />
            <Button
              className={style.deleteButton}
              onClick={handleDeleteTodo}
              disabled={isLoading}
            />
          </>
        )}
      </div>
    </div>
  );
};
