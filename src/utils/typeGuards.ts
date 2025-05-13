import { TodosFilter } from "../types/todos"

export const isTodosFilter = (filter: string | undefined): filter is TodosFilter => {
    return filter === "all" || filter === "completed" || filter === "inWork";
}