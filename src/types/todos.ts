export interface TodoRequest {
  title?: string;
  isDone?: boolean;
}

export interface Todo {
  id: number;
  title: string;
  created: string;
  isDone: boolean;
}

export interface TodoInfo {
  all: number;
  completed: number;
  inWork: number;
}

export interface MetaResponse<T, N> {
  data: T[];
  info?: N;
  meta: {
    totalAmount: number;
  };
}

export enum TodosFilter {
  ALL = "all",
  COMPLETED = "completed",
  IN_WORK = "inWork",
}

// export type TodosFilter = "all" | "completed" | "inWork";


// export const isTodosFilter = (filter: string | undefined): filter is TodosFilter => {
//   return filter === "all" || filter === "completed" || filter === "inWork";
// }

export interface valuesInputForm {
  title: string
}