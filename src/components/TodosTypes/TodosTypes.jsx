import style from "./TodosTypes.module.scss";

export const TodosTypes = ({ info, filter, handleType }) => {

  return (
    <div className={style.todosTypes}>
      <p
        data-name="all"
        className={`${style.todosType} ${
          filter === "all" ? style.todosTypeActive : ""
        }`}
        onClick={handleType}
      >
        {`Все (${info.all})`}
      </p>
      <p
        data-name="inWork"
        className={`${style.todosType} ${
          filter === "inWork" ? style.todosTypeActive : ""
        }`}
        onClick={handleType}
      >
        {`В работе (${info.inWork})`}
      </p>
      <p
        data-name="completed"
        className={`${style.todosType} ${
          filter === "completed" ? style.todosTypeActive : ""
        }`}
        onClick={handleType}
      >
        {`Сделано (${info.completed})`}
      </p>
    </div>
  );
};
