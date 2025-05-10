import style from "./TodosList.module.scss";
import { TodoItem } from "../TodoItem/TodoItem";
import { TodosTypes } from "../TodosTypes/TodosTypes";

export const TodosList = ({
  updateTodos,
  isLoading,
  todos,
  filter,
  handleType,
}) => {
  return (
    <div className={style.todosList}>
      {isLoading ? (
        <h2 className={style.todosListTitle}>Загрузка...</h2>
      ) : (
        <>
          {todos && todos.info && (
            <TodosTypes
              info={todos.info}
              filter={filter}
              handleType={handleType}
            />
          )}
          {todos.data && todos.data.length === 0 ? (
            <h2 className={style.emptyList}>Список задач пуст</h2>
          ) : (
            todos.data &&
            todos.data.map((todo) => (
              <TodoItem updateTodos={updateTodos} key={todo.id} todo={todo} />
            ))
          )}
        </>
      )}
    </div>
  );
};
