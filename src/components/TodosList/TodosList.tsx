import style from "./TodosList.module.scss";
import { TodoItem } from "../TodoItem/TodoItem";
import { Todo } from "../../interfaces/todos";

interface TodosListProps {
  updateTodos: () => Promise<void>;
  isLoading: boolean;
  todos: Todo[];
}

export const TodosList: React.FC<TodosListProps> = ({ updateTodos, isLoading, todos }) => {
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
