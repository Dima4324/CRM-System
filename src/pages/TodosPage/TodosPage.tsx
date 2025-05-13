import { useCallback, useEffect, useState } from "react";
import { AddTodo, TodosList, TodosTypes } from "../../components";
import style from "./TodosPage.module.scss";
import { getTodos } from "../../api/todos";
import { Todo, TodoInfo } from "../../interfaces/todos";

export const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsloading] = useState(false);

  const handleType = (e: React.MouseEvent<HTMLButtonElement>): void => {
    const name = (e.target as HTMLButtonElement).dataset.name;
    if (name) {
      setFilter(name);
    }
  };

  const updateTodos = useCallback(async (): Promise<void> => {
    setIsloading(true);

    const todos = await getTodos(filter);

    setTodos(todos.data);

    if (todos.info) {
      setInfo(todos.info);
    }

    setIsloading(false);
  }, [filter]);
  

  useEffect(() => {
    updateTodos();
  }, [filter, updateTodos]);

  return (
    <main className={style.todosPage}>
      <AddTodo updateTodos={updateTodos} />
      <TodosTypes info={info} filter={filter} handleType={handleType} />
      <TodosList
        updateTodos={updateTodos}
        isLoading={isLoading}
        todos={todos}
      />
    </main>
  );
};
