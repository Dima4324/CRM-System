import { useState } from "react";
import { AddTodo, TodosList } from "../../components/index";
import style from "./TodosPage.module.scss";

export const TodosPage = () => {
  const [todoCompleteFlag, setTodoCompleteFlag] = useState(false);
  return (
    <main className={style.todosPage}>
      <AddTodo
        todoCompleteFlag={todoCompleteFlag}
        setTodoCompleteFlag={setTodoCompleteFlag}
      />
      <TodosList
        todoCompleteFlag={todoCompleteFlag}
        setTodoCompleteFlag={setTodoCompleteFlag}
      />
    </main>
  );
};
