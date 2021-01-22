import React from "react";
import axios from "axios";

interface Props {
  todolist: any[];
  viewCompleted: boolean;
  completedHandler: (id: number) => void;
  selectedItem: (item: any) => void;
  removeItem: (id: number) => void
}
function App({ todolist, viewCompleted, selectedItem, removeItem }: Props) {
  const deleteHandler = async (id: number) => {
    try {
      const data = await axios.delete(`http://localhost:8000/api/todos/${id}`);
      await data && removeItem(id)
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="App">
      {todolist
        .filter((todo) => todo.completed === viewCompleted)
        .map((item) => (
          <div key={item.id} className="App__list">
            <h2>{item.title}</h2>
            <p>{item.description}</p>
            <button onClick={selectedItem.bind(null, item)}>Edit</button>
            <button onClick={deleteHandler.bind(null, item?.id)}>Delete</button>
          </div>
        ))}
    </div>
  );
}

export default App;
