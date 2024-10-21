function NavSearch() {
  return (
    <div className="bg-white flex border px-2 py-1 rounded-full  overflow-hidden  mx-auto ">
      <input
        type="email"
        placeholder="ویلا شمال..."
        className="w-full outline-none bg-white  pl-4 text-sm"
      />
      <button
        type="button"
        className="bg-primary  transition-all text-white text-sm rounded-full px-5 py-1.5">
        جستجو
      </button>
    </div>
  );
}

export default NavSearch;
