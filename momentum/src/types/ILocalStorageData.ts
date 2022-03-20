import ITodo from "./ITodo";

export default interface ILocalStorageData {
  userName?: string;
  city?: string;
  todos?: ITodo[];
}
