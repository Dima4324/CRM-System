import style from "./AddTodo.module.scss";
import { Button } from "../Button/Button";
import { FC, useState } from "react";
import { addTodo } from "../../api/todos";
import { Input } from "../Input/Input";

interface AddTodoProps {
  updateTodos: () => Promise<void>;
}

export const AddTodo: FC<AddTodoProps> = ({ updateTodos }) => {
  const [inputValue, setInputValue] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onChangeInputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
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
      isDone: false,
    };

    await addTodo(bodyRequest);
    await updateTodos();

    setInputValue("");
    setError("");

    setIsLoading(false);
  };

  return (
    <form className={style.addTodoForm} onSubmit={handleAddTodo}>
      <div className={style.inputContainer}>
        <Input
          type="text"
          name="title"
          placeholder="Введите задачу..."
          value={inputValue}
          className={style.input}
          onChange={onChangeInputValue}
          min={2}
          max={64}
        />
        {error && <p className={style.errorMessage}>{error}</p>}
      </div>
      <Button className={style.button} disabled={isLoading}>
        Добавить
      </Button>
    </form>
  );
};
