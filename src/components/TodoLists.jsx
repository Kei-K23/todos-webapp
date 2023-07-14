import List from "./List";
export default function TodoLists({
  todoLists,
  toggleComplete,
  deleteItem,
  setTodoLists,
}) {
  return (
    <ul
      role="list"
      className="w-10/12  md:w-8/12  lg:w-1/2   list-disc marker:text-sky-600 marker:text-4xl  pl-8 select-none"
    >
      {todoLists.length === 0 && (
        <h1 className="text-white mt-8 text-lg text-center pr-8">
          No list yet!
        </h1>
      )}
      {todoLists.map((todo) => {
        return (
          <List
            key={todo.id}
            {...todo}
            toggleComplete={toggleComplete}
            deleteItem={deleteItem}
            setTodoLists={setTodoLists}
          />
        );
      })}
    </ul>
  );
}

TodoLists.propTypes;
