export default function Input({ onSubmit, newItem, setNewItem }) {
  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(newItem);
    setNewItem("");
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mt-8  w-10/12  md:w-8/12  lg:w-1/2 flex justify-center items-center flex-col"
    >
      <input
        type="text"
        value={newItem}
        onChange={(e) => setNewItem(e.target.value)}
        placeholder="note down something!"
        className="w-full text-xl border-2  shadow-md shadow-sky-300 mb-8 px-2 py-1 focus:outline-none focus:ring-2 focus:ring-sky-300"
      />
      <button
        className="w-full text-white bg-sky-300 font-semibold text-lg px-2 py-1 transition-all ease-in hover:bg-sky-500 disabled:bg-sky-900"
        type="submit"
        disabled={newItem === "" ? true : false}
      >
        Add
      </button>
    </form>
  );
}

Input.propTypes;
