import { TodoInfo, TodosFilter } from "../../types/todos";
import { Button } from "../Button/Button";
import style from "./TodosTypes.module.scss";

interface TodosTypesProps {
  info: TodoInfo;
  filter: TodosFilter;
  handleFilterTodo: (filter: TodosFilter) => void;
}

export const TodosTypes: React.FC<TodosTypesProps> = ({ info, filter, handleFilterTodo }) => {

  return (
    <div className={style.todosTypes}>
      <Button
        data-name="all"
        className={`${style.todosType} ${
          filter === "all" ? style.todosTypeActive : ""
        }`}
        onClick={() => handleFilterTodo("all")}
      >
        {`Все (${info.all})`}
      </Button>
      <Button
        data-name="inWork"
        className={`${style.todosType} ${
          filter === "inWork" ? style.todosTypeActive : ""
        }`}
        onClick={() => handleFilterTodo("inWork")}
      >
        {`В работе (${info.inWork})`}
      </Button>
      <Button
        data-name="completed"
        className={`${style.todosType} ${
          filter === "completed" ? style.todosTypeActive : ""
        }`}
        onClick={() => handleFilterTodo("completed")}
      >
        {`Сделано (${info.completed})`}
      </Button>
    </div>
  );
};
