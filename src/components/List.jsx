import { useState } from "react";

export default function List({
  id,
  completed,
  task,
  toggleComplete,
  deleteItem,
  setTodoLists,
}) {
  const [edit, setEdit] = useState(false);
  const [editItem, setEditItem] = useState(task);

  function toggleEdit() {
    edit === true ? setEdit(false) : setEdit(true);
  }

  function updateNewItem(e) {
    e.preventDefault();
    setTodoLists((currentTodoLists) => {
      return currentTodoLists.map((todo) => {
        if (todo.id === id) {
          return { ...todo, task: editItem };
        }
        return todo;
      });
    });
    toggleEdit();
  }

  return (
    <li key={id} className="group/item text-white my-2  text-xl ">
      {edit === true && (
        <form onSubmit={updateNewItem}>
          <input
            onBlur={updateNewItem}
            className="text-slate-500"
            type="text"
            value={editItem}
            autoFocus
            onChange={(e) => setEditItem(e.target.value)}
          />
        </form>
      )}
      {edit === false && (
        <div>
          <input
            className="peer mr-2"
            type="checkbox"
            id={id}
            checked={completed}
            onChange={(e) => toggleComplete(id, e.target.checked)}
          />
          <label
            className="mr-8 peer-checked:line-through peer-checked:text-slate-400"
            htmlFor={id}
          >
            {task}
          </label>
          <button
            onClick={() => deleteItem(id)}
            className="mr-4 text-lg hidden px-2 py-1 rounded-lg bg-red-500 group-hover/item:inline-block hover:bg-red-700 hover:text-slate-300 transition-all ease-in"
          >
            Delete
          </button>
          <button
            onClick={toggleEdit}
            className="text-lg hidden px-2 py-1 rounded-lg bg-blue-500 group-hover/item:inline-block hover:bg-blue-700 hover:text-slate-300 transition-all ease-in"
          >
            Edit
          </button>
        </div>
      )}
    </li>
  );
}

List.propTypes;
