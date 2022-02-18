import ITodo from "../types/ITodo";
import { DONE_TYPE, IN_PROGRESS_TYPE, TODO_TYPE } from "../shared/constants";
import React from "react";

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
}
