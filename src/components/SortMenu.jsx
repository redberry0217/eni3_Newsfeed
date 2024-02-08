import styled from 'styled-components';

function SortMenu({ changeSort }) {
  const onChangeHandler = (e) => {
    changeSort(e.target.value);
  };

  return (
    <MainTopSection>
      <Select onChange={onChangeHandler} defaultValue={'latest'}>
        <option value="latest">최신순</option>
        <option value="popular">인기순</option>
      </Select>
    </MainTopSection>
  );
}

const MainTopSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;

const Select = styled.select`
  border: 1px solid #7f7f7f;
  border-radius: 10px;
  font-size: 100%;
  padding: 0.3rem;
`;

export default SortMenu;
