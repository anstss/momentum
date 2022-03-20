import React, { useEffect, useState } from "react";
import "./todo.scss";
import ITodo from "../../types/ITodo";
import { DONE_TYPE, IN_PROGRESS_TYPE, TODO_TYPE } from "../../shared/constants";
import { TodoService } from "../../services/todo-service";

const todoService = new TodoService();

const Todo = () => {
  const [fullTodoList, setFullTodoList] = useState<ITodo[]>([]);
  const [currentTodoList, setCurrentTodoList] = useState<ITodo[]>([]);
  const [todoType, setTodoType] = useState<string>(TODO_TYPE);
  const [todoMenuVisibility, setTodoMenuVisibility] = useState<boolean>(false);
  const [newTodo, setNewTodo] = useState<string>("");

  const {
    filterTodo,
    hideItemMenu,
    changeTodoType,
    toggleItemMenuVisibility,
    changeTodoDoneState,
    getTodosFromLocalStorage,
    addTodo,
  } = todoService;

  const handleChangeTodoVisibility = (
    event: React.MouseEvent<Element, MouseEvent>
  ) => {
    setTodoMenuVisibility(!todoMenuVisibility);
    hideItemMenu(event, fullTodoList);
  };

  const handleShowToDoByType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const type = event.target.value;
    setTodoType(type);
    const newList = hideItemMenu(event, fullTodoList);
    if (!newList) return;
    setFullTodoList(newList);
  };

  const handleChangeTodoType = (id: number) => {
    const newTodoList = changeTodoType(fullTodoList, id);
    if (!newTodoList.length) return;
    setFullTodoList(toggleItemMenuVisibility(newTodoList, id));
  };

  const handleChangeTodoDoneState = (id: number) => {
    const newTodoList = changeTodoDoneState(fullTodoList, id);
    if (!newTodoList.length) return;
    setFullTodoList(newTodoList);
  };

  const handleChangeItemMenuVisibility = (id: number) => {
    setFullTodoList(toggleItemMenuVisibility(fullTodoList, id));
  };

  const handleChangeNewTodo = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value);
  };

  const handleAddTodo = () => {
    addTodo(newTodo, todoType);
    setFullTodoList(getTodosFromLocalStorage());
    setNewTodo("");
  };

  useEffect(() => {
    setFullTodoList(getTodosFromLocalStorage());
  }, []);

  useEffect(() => {
    setCurrentTodoList(filterTodo(fullTodoList, todoType));
  }, [fullTodoList, todoType]);

  useEffect(() => {
    const helper = () => {
      return (e: React.MouseEvent<HTMLDivElement, MouseEvent> | MouseEvent) => {
        const newList = hideItemMenu(e, fullTodoList);
        if (!newList) return;
        setFullTodoList(newList);
      };
    };
    document.body.addEventListener("click", helper);
    return () => {
      document.body.removeEventListener("click", helper);
    };
  }, [fullTodoList]);

  return (
    <section className="todo col s6 m2 right-align">
      <span className={"icon"} onClick={handleChangeTodoVisibility}>
        Todo
      </span>
      <div
        className={`todo__container card-panel ${
          todoMenuVisibility ? "" : "hidden"
        }`}
      >
        <div className="input-field todo__select">
          <select onChange={handleShowToDoByType}>
            <option value={TODO_TYPE}>To Do</option>
            <option value={IN_PROGRESS_TYPE}>In Progress</option>
            <option value={DONE_TYPE}>Done</option>
          </select>
        </div>
        <ul className="collection black-text left-align todo__list">
          {currentTodoList.map((todo: ITodo) => {
            const { id, text, type, done, showMenu } = todo;

            return (
              <li className="collection-item todo__item" key={`${id}`}>
                <div
                  className={`card-panel todo__item-menu ${
                    showMenu ? "" : "hidden"
                  }`}
                >
                  <div
                    data-item-menu={true}
                    className={"collection-item menu-item"}
                  >
                    Edit
                  </div>
                  <div
                    data-item-menu={true}
                    className={"collection-item menu-item"}
                    onClick={() => handleChangeTodoType(id)}
                  >{`Move to ${
                    type === TODO_TYPE ? "In Progress" : "To Do"
                  }`}</div>
                  <div
                    data-item-menu={true}
                    className={"collection-item menu-item"}
                  >
                    Delete
                  </div>
                </div>
                <div>
                  <label>
                    <input
                      type="checkbox"
                      className="filled-in"
                      checked={done}
                      onClick={() => handleChangeTodoDoneState(id)}
                    />
                    <span className={`todo__text ${done ? "done" : ""}`}>
                      {text}
                    </span>
                  </label>
                  <span className="secondary-content">
                    <i
                      data-item-menu={true}
                      className="material-icons icon"
                      onClick={() => handleChangeItemMenuVisibility(id)}
                    >
                      more_vert
                    </i>
                  </span>
                </div>
              </li>
            );
          })}
        </ul>
        <div className={"left-align"}>
          <span className="input-field">
            <input
              placeholder="Add new todo"
              id="first_name"
              type="text"
              className="todo__input__elem input-add-edit"
              value={newTodo}
              onChange={handleChangeNewTodo}
            />
          </span>
          <i
            className="material-icons icon secondary-content"
            onClick={handleAddTodo}
          >
            add
          </i>
        </div>
      </div>
    </section>
  );
};

export default Todo;
