import { TodoInfo, TodosFilter } from "../../types/todos";
import { Button } from "../Button/Button";
import style from "./TodosTypes.module.scss";

interface TodosTypesProps {
  info: TodoInfo;
  filter: TodosFilter;
  handleType: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const TodosTypes: React.FC<TodosTypesProps> = ({ info, filter, handleType }) => {

  return (
    <div className={style.todosTypes}>
      <Button
        data-name="all"
        className={`${style.todosType} ${
          filter === "all" ? style.todosTypeActive : ""
        }`}
        onClick={handleType}
      >
        {`Все (${info.all})`}
      </Button>
      <Button
        data-name="inWork"
        className={`${style.todosType} ${
          filter === "inWork" ? style.todosTypeActive : ""
        }`}
        onClick={handleType}
      >
        {`В работе (${info.inWork})`}
      </Button>
      <Button
        data-name="completed"
        className={`${style.todosType} ${
          filter === "completed" ? style.todosTypeActive : ""
        }`}
        onClick={handleType}
      >
        {`Сделано (${info.completed})`}
      </Button>
    </div>
  );
};
