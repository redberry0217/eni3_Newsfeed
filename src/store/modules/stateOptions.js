const initialState = {
  options: [
    { value: '개발자 취준생', label: '개발자 취준생' },
    { value: '학생(전공/비전공)', label: '학생(전공/비전공)' },
    { value: '현업 개발자/튜터', label: '현업 개발자/튜터' },
    { value: '취미로 개발하는 사람', label: '취미로 개발하는 사람' },
    { value: '재야의 무림고수', label: '재야의 무림고수' }
  ]
};

const stateOptions = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default stateOptions;
