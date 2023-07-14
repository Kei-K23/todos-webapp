import { useEffect, useState } from "react";
import Input from "./components/Input";

import TodoLists from "./components/TodoLists";
import Footer from "./components/Footer";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todoLists, setTodoLists] = useState(() => {
    const storedValue = localStorage.getItem("Items");

    if (storedValue === null) return [];

    return JSON.parse(storedValue);
  });

  // const [filterTodoLists, setFilterTodoLists] = useState(todoLists);

  useEffect(() => {
    localStorage.setItem("Items", JSON.stringify(todoLists));
    // setFilterTodoLists([...todoLists]);
  }, [todoLists]);

  function addItem(item) {
    setTodoLists((currentTodoLists) => {
      return [
        ...currentTodoLists,
        {
          id: crypto.randomUUID(),
          task: item,
          completed: false,
        },
      ];
    });
  }

  function toggleComplete(id, completed) {
    setTodoLists((currentTodoLists) => {
      return currentTodoLists.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteItem(id) {
    setTodoLists((currentTodoLists) => {
      return currentTodoLists.filter((todo) => todo.id !== id);
    });
  }

  return (
    <>
      <div className="flex w-full min-h-screen bg-gray-900 justify-start items-center flex-col box-border">
        <h1 className="text-white text-2xl mt-10">Note down something!</h1>
        <Input onSubmit={addItem} newItem={newItem} setNewItem={setNewItem} />

        <TodoLists
          todoLists={todoLists}
          deleteItem={deleteItem}
          setTodoLists={setTodoLists}
          toggleComplete={toggleComplete}
        />
      </div>
      <Footer />
    </>
  );
}
