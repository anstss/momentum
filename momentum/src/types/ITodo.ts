import { IN_PROGRESS_TYPE, TODO_TYPE } from "../shared/constants";

export default interface ITodo {
  id: number;
  text: string;
  type: typeof TODO_TYPE | typeof IN_PROGRESS_TYPE;
  done: boolean;
  showMenu: boolean;
}
