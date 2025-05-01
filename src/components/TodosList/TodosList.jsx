import style from "./TodosList.module.scss";
import { TodoItem } from "../TodoItem/TodoItem";
import { TodosTypes } from "../TodosTypes/TodosTypes";
import { useEffect, useState } from "react";
import { initialStateTodosTypes } from "../../utils/constants";
import { getTodos } from "../../api/getTodos";

export const TodosList = ({ todoCompleteFlag, setTodoCompleteFlag }) => {
  const [todosFiltered, setTodosFiltered] = useState([]);
  const [filters, setFilters] = useState(initialStateTodosTypes);
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const fetchTodos = async () => {
      const todos = await getTodos();

      setTodos(todos);

      setTodosFiltered(
        todos.data.filter((todo) => {
          if (filters.all) {
            return true;
          }
          if (filters.inWork) {
            return todo.isDone === false;
          }
          if (filters.done) {
            return todo.isDone === filters.done;
          }
        })
      );
    };

    fetchTodos();
  }, [todoCompleteFlag, filters]);

  return (
    <div className={style.todosList}>
      {Object.values(todos).length === 0 ? (
        <h2 className={style.todosListTitle}>Загрузка</h2>
      ) : (
        <>
          {todos.info && (
            <TodosTypes
              info={todos.info}
              filters={filters}
              setFilters={setFilters}
            />
          )}
          {todosFiltered.length === 0 ? (
            <h2 className={style.emptyList}>Список задач пуст</h2>
          ) : (
            todosFiltered.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                todoCompleteFlag={todoCompleteFlag}
                setTodoCompleteFlag={setTodoCompleteFlag}
              />
            ))
          )}
        </>
      )}
    </div>
  );
};
