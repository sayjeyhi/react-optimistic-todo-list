export interface Todo {
  id: string;
  val: string;
  done: boolean;
  dateCreated: Date;
  adding?: boolean;
  toggling?: boolean;
  deleting?: boolean;
}

export interface TodosState {
  [key: string]: Todo;
}
