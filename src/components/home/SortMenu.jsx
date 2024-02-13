import styled from 'styled-components';
import { GrSort } from 'react-icons/gr';

function SortMenu({ changeSort }) {
  const onChangeHandler = (e) => {
    changeSort(e.target.value);
  };

  return (
    <MainTopSection>
      <SelectWrap>
        <GrSort />
        <Select onChange={onChangeHandler} defaultValue={'latest'}>
          <Option value="latest">최신순</Option>
          <Option value="popular">인기순</Option>
        </Select>
      </SelectWrap>
    </MainTopSection>
  );
}

const MainTopSection = styled.div`
  display: flex;
  justify-content: flex-end;
  margin: 1rem;
`;

const SelectWrap = styled.div`
  position: relative;

  svg {
    position: absolute;
    left: 0.7rem;
    top: 0.7rem;
  }
`;

const Select = styled.select`
  border: 2px solid #c7c7c7;
  border-radius: 10px;
  padding: 0.5rem 0.5rem 0.5rem 2rem;
  font-size: 100%;
  min-width: 100px;
`;

const Option = styled.option`
  border: none;
`;

export default SortMenu;
