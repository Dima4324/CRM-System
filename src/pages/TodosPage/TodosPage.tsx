import { useCallback, useEffect, useState } from "react";
import { AddTodo, TodosList, TodosTypes } from "../../components";
import style from "./TodosPage.module.scss";
import { getTodos } from "../../api/todos";
import { Todo, TodoInfo, TodosFilter } from "../../types/todos";

export const TodosPage = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [info, setInfo] = useState<TodoInfo>({
    all: 0,
    completed: 0,
    inWork: 0,
  });
  const [filter, setFilter] = useState<TodosFilter>("all");
  const [isLoading, setIsloading] = useState(false);

  const handleFilterTodo = (filter: TodosFilter): void => {
      setFilter(filter);
  };

  const updateTodos = useCallback(async (): Promise<void> => {
    try {
      setIsloading(true);

      const todos = await getTodos(filter);

      setTodos(todos.data);

      if (todos.info) {
        setInfo(todos.info);
      }
    } catch (error) {
      alert(error);
    } finally {
      setIsloading(false);
    }
  }, [filter]);

  useEffect(() => {
    updateTodos();
  }, [filter, updateTodos]);

  return (
    <main className={style.todosPage}>
      <AddTodo updateTodos={updateTodos} />
      <TodosTypes
        info={info}
        filter={filter}
        handleFilterTodo={handleFilterTodo}
      />
      <TodosList
        updateTodos={updateTodos}
        isLoading={isLoading}
        todos={todos}
      />
    </main>
  );
};
