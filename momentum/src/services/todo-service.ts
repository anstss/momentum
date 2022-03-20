import ITodo from "../types/ITodo";
import {
  DONE_TYPE,
  IN_PROGRESS_TYPE,
  LOCAL_STORAGE_KEY,
  TODO_TYPE,
} from "../shared/constants";
import React from "react";
import ILocalStorageData from "../types/ILocalStorageData";

export class TodoService {
  //FULL LIST TODOS!!!!!!!!!!!!
  filterTodo = (list: ITodo[], type: string) => {
    return list.filter((todo: ITodo) => {
      if (type === TODO_TYPE || type === IN_PROGRESS_TYPE)
        return todo.type === type;
      if (type === DONE_TYPE) return todo.done;
    });
  };

  changeTodoType = (list: ITodo[], id: number): ITodo[] => {
    const todoIndex = list.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return list;
    const newType =
      list[todoIndex].type === TODO_TYPE ? IN_PROGRESS_TYPE : TODO_TYPE;
    return [
      ...list.slice(0, todoIndex),
      {
        ...list[todoIndex],
        type: newType,
      },
      ...list.slice(todoIndex + 1),
    ];
  };

  changeTodoDoneState = (list: ITodo[], id: number): ITodo[] => {
    const todoIndex = list.findIndex((todo) => todo.id === id);
    if (todoIndex === -1) return list;
    const newDoneState = !list[todoIndex].done;
    return [
      ...list.slice(0, todoIndex),
      {
        ...list[todoIndex],
        done: newDoneState,
      },
      ...list.slice(todoIndex + 1),
    ];
  };

  toggleItemMenuVisibility = (list: ITodo[], id: number) => {
    const todoIndex = list.findIndex((todo) => todo.id === id);
    const menuIsVisible = list[todoIndex].showMenu;
    const hiddenMenuList = list.map((todo) => {
      return {
        ...todo,
        showMenu: false,
      };
    });
    return [
      ...hiddenMenuList.slice(0, todoIndex),
      {
        ...hiddenMenuList[todoIndex],
        showMenu: !menuIsVisible,
      },
      ...hiddenMenuList.slice(todoIndex + 1),
    ];
  };

  hideItemMenu = (
    event:
      | React.MouseEvent<Element, MouseEvent>
      | MouseEvent
      | React.ChangeEvent<HTMLSelectElement>,
    list: ITodo[]
  ) => {
    const target = event.target as HTMLElement;
    if (!target) return;
    if (target.dataset.itemMenu) return;
    return list.map((todo) => {
      return {
        ...todo,
        showMenu: false,
      };
    });
  };

  getTodosFromLocalStorage = (): ITodo[] => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    let todos: ITodo[] = [];
    if (data) {
      const dataObj: ILocalStorageData = JSON.parse(data);
      todos = dataObj.todos ? dataObj.todos : [];
    }
    return todos;
  };

  saveTodosToLocalStorage = (todos: ITodo[]): void => {
    const data = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (data) {
      const oldData: ILocalStorageData = JSON.parse(data);
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify({
          ...oldData,
          todos,
        })
      );
      return;
    }
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({ todos }));
  };

  addTodo = (todoName: string, todoType: string) => {
    const todo: ITodo = {
      id: Date.now(),
      text: todoName,
      type:
        todoType === TODO_TYPE || todoType === IN_PROGRESS_TYPE
          ? todoType
          : TODO_TYPE,
      done: false,
      showMenu: false,
    };
    const todos = this.getTodosFromLocalStorage();
    const updatedTodos = [...todos, todo];
    this.saveTodosToLocalStorage(updatedTodos);
  };
}
