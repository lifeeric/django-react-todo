import React from "react";
import { useState, useEffect, useRef } from "react";
import axios from "axios";

interface Props {
  item: IItem | undefined;
  updateItem: (item: IItem) => void;
  close: () => void;
  addItem?: undefined | string;
  addingItem: (item: IItem) => void;
}
function Modal({ item, updateItem, close, addItem, addingItem }: Props) {
  const titleRef = useRef<null | HTMLInputElement | string | any>(null);
  const desRef = useRef<null | HTMLInputElement | string | any>(null);
  const [checked, setChecked] = useState<undefined | boolean>(
    item?.completed || false
  );
  console.log(checked, " Checked");
  useEffect(() => {
    if (titleRef.current) titleRef.current.value = item?.title;
    if (desRef.current) desRef.current.value = item?.description;
  }, [item]);

  const updateHandler = async () => {
    const title = titleRef.current && titleRef.current!.value;
    const desc = desRef.current && desRef.current!.value;

    try {
      if (addItem) {
        const todo = {
          title,
          description: desc,
          completed: checked,
        };
        const data = await axios.post("http://localhost:8000/api/todos/", todo);

        (await data) && addingItem(data.data);
      } else {
        const data = await axios.put(
          `http://localhost:8000/api/todos/${item?.id}/`,
          {
            title,
            description: desc,
            completed: checked,
          }
        );
        (await data) && updateItem(data.data);
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  const checkboxHandler = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(e.target.checked);
  };

  if (!item) return null;

  return (
    <>
      <div className="backdrop" onClick={close}></div>
      <div className="modal">
        <div key={item?.id} className="App__edit">
          <input className="App__input" type="input" ref={titleRef} />
          <input className="App__input" type="" ref={desRef} />
          <input
            className="App__checkbox"
            type="checkbox"
            checked={checked}
            onChange={checkboxHandler}
          />
          <button onClick={updateHandler}>{addItem ? "Add" : "Update"}</button>
        </div>
      </div>
    </>
  );
}

export default React.memo(Modal);
