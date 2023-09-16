export default interface ITodoModel {
  id: number;
  todo_date: string;
  done_date?: string;
  todo_content: string;
  status: number;
}