import { useEffect, useState } from "react";
import { AddTodo, TodosList, TodosTypes } from "../../components/index";
import style from "./TodosPage.module.scss";
import { getTodos } from "../../api/todos";

export const TodosPage = () => {
  const [todos, setTodos] = useState([]);
  const [info, setInfo] = useState({});
  const [filter, setFilter] = useState("all");
  const [isLoading, setIsloading] = useState(false);

  const handleType = (e) => {
    setFilter(e.target.dataset.name);
  };
  
  const updateTodos = async () => {
    setIsloading(true);
    
    const todos = await getTodos(filter);
    
    setTodos(todos.data);
    setInfo(todos.info);

    setIsloading(false);
  };

  useEffect(() => {
    updateTodos();
  }, [filter]);

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
