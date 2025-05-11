import style from "./TodosList.module.scss";
import { TodoItem } from "../TodoItem/TodoItem";

export const TodosList = ({ updateTodos, isLoading, todos }) => {
  return (
    <div className={style.todosList}>
      {isLoading ? (
        <h2 className={style.todosListTitle}>Загрузка...</h2>
      ) : todos && todos.length === 0 ? (
        <h2 className={style.emptyList}>Список задач пуст</h2>
      ) : (
        todos &&
        todos.map((todo) => (
          <TodoItem updateTodos={updateTodos} key={todo.id} todo={todo} />
        ))
      )}
    </div>
  );
};
