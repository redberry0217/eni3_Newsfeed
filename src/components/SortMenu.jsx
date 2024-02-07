function SortMenu({ changeSort }) {
  const onChangeHandler = (e) => {
    changeSort(e.target.value);
  };

  return (
    <>
      <div>
        <select onChange={onChangeHandler}>
          <option value="latest" selected>
            최신순
          </option>
          <option value="popular">인기순</option>
        </select>
      </div>
    </>
  );
}

export default SortMenu;
