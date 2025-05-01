import style from "./TodosTypes.module.scss";

export const TodosTypes = ({ info, filters, setFilters }) => {
  const handleTypeClick = (e) => {
    if (!filters[e.target.dataset.name]) {
      setFilters({
        all: false,
        inWork: false,
        done: false,
        [e.target.dataset.name]: true,
      });
    }
  };

  return (
    <div className={style.todosTypes}>
      <h2
        data-name="all"
        className={`${style.todosType} ${
          filters.all ? style.todosTypeActive : ""
        }`}
        onClick={handleTypeClick}
      >
        {`Все (${info.all})`}
      </h2>
      <h2
        data-name="inWork"
        className={`${style.todosType} ${
          filters.inWork ? style.todosTypeActive : ""
        }`}
        onClick={handleTypeClick}
      >
        {`В работе (${info.inWork})`}
      </h2>
      <h2
        data-name="done"
        className={`${style.todosType} ${
          filters.done ? style.todosTypeActive : ""
        }`}
        onClick={handleTypeClick}
      >
        {`Сделано (${info.completed})`}
      </h2>
    </div>
  );
};
