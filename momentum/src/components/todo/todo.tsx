import React, { useEffect, useState } from "react";
import "./todo.scss";

const TODO_TYPE = "to-do";
const IN_PROGRESS_TYPE = "in-progress";
const DONE_TYPE = "done";

interface ITodo {
  id: number;
  text: string;
  type: typeof TODO_TYPE | typeof IN_PROGRESS_TYPE;
  done: boolean;
}

const todos: ITodo[] = [
  {
    id: 8641166,
    text: "My todo 1",
    type: "to-do",
    done: false,
  },
  {
    id: 8864115166,
    text: "My todo tototototo",
    type: "to-do",
    done: false,
  },
  {
    id: 864184776166,
    text: "My todo 9846516",
    type: "in-progress",
    done: true,
  },
  {
    id: 8645635631166,
    text: "My todo 1sefeff",
    type: "in-progress",
    done: false,
  },
];

const Todo = () => {
  const [fullTodoList, setFullTodoList] = useState<ITodo[]>([]);
  const [currentTodoList, setCurrentTodoList] = useState<ITodo[]>([]);
  const [todoType, setTodoType] = useState<string>(TODO_TYPE);

  useEffect(() => {
    setFullTodoList(todos);
  }, []);

  useEffect(() => {
    setCurrentTodoList(filterTodo(fullTodoList, todoType));
  }, [fullTodoList, todoType]);

  const handleShowToDoByType = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const type = event.target.value;
    setTodoType(type);
  };

  //FULL LIST TODOS!!!!!!!!!!!!
  const filterTodo = (list: ITodo[], type: string) => {
    return list.filter((todo: ITodo) => {
      if (type === TODO_TYPE || type === IN_PROGRESS_TYPE)
        return todo.type === type;
      if (type === DONE_TYPE) return todo.done;
    });
  };

  const handleChangeTodoType = (id: number) => {
    const newTodoList = changeTodoType(fullTodoList, id);
    if (!newTodoList.length) return;
    setFullTodoList(newTodoList);
  };

  const changeTodoType = (list: ITodo[], id: number): ITodo[] => {
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

  const handleChangeTodoDoneState = (id: number) => {
    const newTodoList = changeTodoDoneState(fullTodoList, id);
    if (!newTodoList.length) return;
    setFullTodoList(newTodoList);
  };

  const changeTodoDoneState = (list: ITodo[], id: number): ITodo[] => {
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

  return (
    <section className="todo col s6 m2 right-align">
      <span className={"icon"}>Todo</span>
      <div className={"todo__container card-panel"}>
        <div className="input-field todo__select">
          <select onChange={handleShowToDoByType}>
            <option value={TODO_TYPE}>To Do</option>
            <option value={IN_PROGRESS_TYPE}>In Progress</option>
            <option value={DONE_TYPE}>Done</option>
          </select>
        </div>
        <ul className="collection black-text left-align todo__list">
          {currentTodoList.map((todo: ITodo) => {
            const { id, text, type, done } = todo;

            return (
              <li className="collection-item todo__item" key={`${id}${text}`}>
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
                    <i className="material-icons icon">mode_edit</i>
                    {type === TODO_TYPE ? (
                      <i
                        className="material-icons icon tooltipped"
                        data-position="top"
                        data-tooltip="Move to In Progress"
                        onClick={() => handleChangeTodoType(id)}
                      >
                        call_received
                      </i>
                    ) : (
                      <i
                        className="material-icons icon tooltipped"
                        data-position="top"
                        data-tooltip="Move to To Do"
                        onClick={() => handleChangeTodoType(id)}
                      >
                        call_made
                      </i>
                    )}
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
            />
          </span>
          <i className="material-icons icon secondary-content">add</i>
        </div>
      </div>
    </section>
  );
};

export default Todo;
