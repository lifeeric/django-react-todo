import React from "react";
import { useState, useEffect, useRef } from "react";
import "./App.css";
import Todo from "./todo";
import axios from "./axios";
import Edit from "./edit";

// const todoItems = [
//   {
//     id: 1,
//     title: "Go to Market",
//     description: "Buy ingredients to prepare dinner",
//     completed: true,
//   },
//   {
//     id: 2,
//     title: "Study",
//     description: "Read Algebra and History textbook for upcoming test",
//     completed: false,
//   },
//   {
//     id: 3,
//     title: "Sally's books",
//     description: "Go to library to rent sally's books",
//     completed: true,
//   },
//   {
//     id: 4,
//     title: "Article",
//     description: "Write article on how to use django with react",
//     completed: false,
//   },
// ];

function App() {
  const [viewCompleted, setviewCompleted] = useState<boolean>(false);
  const [todolist, setTodolist] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const titleRef = useRef<null | HTMLInputElement>(null);
  const desRef = useRef<null | HTMLInputElement>(null);
  const [selected, setSelected] = useState<undefined | IItem>(undefined);
  const [addItem, setAddItem] = useState<undefined | string>(undefined);

  useEffect(() => {
    const getTodo = async () => {
      try {
        const todos = await axios.get("api/todos");
        await setTodolist(todos.data);
        setLoading(false);
      } catch (error) {
        throw new Error(error);
      }
    };
    getTodo();
  }, []);

  const viewCompletedHandler = (
    status:
      | React.MouseEvent<HTMLButtonElement, MouseEvent>
      | boolean
      | undefined
  ) => {
    if (status) setviewCompleted(true);
    else setviewCompleted(false);
  };

  const updateHandler = (
    id: React.MouseEvent<HTMLButtonElement, MouseEvent> | number | undefined
  ): void => {
    const title = titleRef.current && titleRef.current!.value;
    const desc = desRef.current && desRef.current!.value;
  };

  const completedHandler = (id: number) => {
    const newTodolist = [...todolist];
    newTodolist[id].completed = newTodolist[id].completed ? false : true;
    console.log(newTodolist);
    setTodolist(newTodolist);
  };

  if (loading) return <h1>Loading...</h1>;

  const selectedItemHandler = (item: any) => {
    console.log(item);
    setSelected(item);
  };

  const updateItemHandler = (item: IItem): void => {
    const newTodo = [...todolist];
    newTodo[item.id!] = item;
    setTodolist(newTodo);
    setSelected(undefined);
  };

  const removeItemHandler = (id: number): void => {
    setTodolist((todolist) => todolist.filter((todo) => todo.id !== id));
  };

  const addNewTaskHandler = () => {
    setSelected({ title: "", description: "", completed: false });
    setAddItem("Add");
  };

  const addingItemHandler = (item: IItem) => {
    setTodolist((todolist) => todolist.concat(item));
    setSelected(undefined);
    setAddItem(undefined)
  };

  const closeHandler = (): void => {
    setSelected(undefined);
  };

  return (
    <div className="App">
      <button className="add" onClick={addNewTaskHandler.bind(null, false)}>Add new</button>
      <button onClick={viewCompletedHandler.bind(null, true)}>Complete</button>
      <button onClick={viewCompletedHandler.bind(null, false)}>
        incompelete
      </button>

      <div className="App__todo">
        <Todo
          todolist={todolist}
          viewCompleted={viewCompleted}
          completedHandler={completedHandler}
          selectedItem={selectedItemHandler}
          removeItem={removeItemHandler}
        />
      </div>

      <Edit
        item={selected}
        updateItem={updateItemHandler}
        close={closeHandler}
        addItem={addItem}
        addingItem={addingItemHandler}
      />
    </div>
  );
}

export default App;
