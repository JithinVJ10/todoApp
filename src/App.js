import { useState, useRef, useEffect } from "react";
import "./App.css";

function App() {
  //useStage which is hook to include a particular data to components
  const [toDos, setToDos] = useState([]);
  const [toDo, setToDo] = useState("");
  const [editId, setEditId] = useState(0);

  // function to add new todo list
  const addTolist = () => {
    if (toDo !== "") {
      setToDos([...toDos, { id: Date.now(), text: toDo, status: false }]);
      setToDo("");
    }
  };

  // useRef hook is used to directly access a DOM
  const inputRef = useRef("null");

  useEffect(() => {
    inputRef.current.focus();
  });

  const remove = (id) => {
    setToDos(toDos.filter((item) => item.id !== id));
  };

  // strike function
  const strikeList = (id) => {
    let completed = toDos.map((list) => {
      if (list.id === id) {
        return { ...list, status: !list.status };
      }
      return list;
    });
    setToDos(completed);
  };

  //edit function
  const editItem = (id) => {
    const editlist = toDos.find((list) => id === list.id);
    setToDo(editlist.text);
    setEditId(editlist.id);
  };

  // update fuction
  const updateList = (id) => {
    const editLists = toDos.find((list) => list.id === id);
    const update = toDos.map((item) =>
      item.id === editLists.id
        ? (item = { id: item.id, text: toDo })
        : (item = { id: item.id, text: item.text })
    );
    setToDos(update);
    setEditId(0);
    setToDo("");
  };

  const clearAll = () =>{
    if (toDos.length >= 0) {
      setToDos([])
      
    }
  }

  return (
    <div className="main">
        <div className="app">
        <div className="mainHeading">
          <h1>ToDo List App</h1>
        </div>
        <div className="subHeading">
          <br />
        </div>
        <div className="input">
          <input
            value={toDo}
            ref={inputRef}
            onChange={(e) => setToDo(e.target.value)}
            type="text"
            placeholder="Add item..."
            maxLength={30}
          />
          {toDo ? (
            editId ? (
              <i
                onClick={() => updateList(editId)}
                className="fa-solid fa-arrows-rotate"
              ></i>
            ) : (
              <i onClick={addTolist} className="fas fa-plus"></i>
            )
          ) : ("")}
        </div>

        <div className="todos">
          {toDos.length <= 0 && (
            <p style={{ color: "Red" }}> No Data! Add something </p>
          )}
          {toDos.map((data) => {
            return (
              <div className="todo" id={data.status ? "list-item" : ""}>
                <div className="left">
                  <input type="checkbox" onClick={() => strikeList(data.id)} />
                  <p>{data.text}</p>
                </div>
                <div className="right">
                  <i
                    className="fa-solid fa-pen-to-square"
                    title="Edit"
                    onClick={() => editItem(data.id)}
                  ></i>
                  <i
                    className="fa-solid fa-trash"
                    title="Remove"
                    onClick={() => remove(data.id)}
                  ></i>
                </div>
              </div>
            );
          })}
        </div>
        <div className="all-clear">
        <button className="clear-btn" onClick={clearAll} > Clear </button>
        </div>
      </div>
    </div>
    
  );
}

export default App;
