import catIcon from 'assets/OptionImg1_cat.png';
import dogIcon from 'assets/OptionImg2_dog.png';
import foxIcon from 'assets/OptionImg3_fox.png';
import parrotIcon from 'assets/OptionImg4_parrot.png';

const initialState = {
  options: [
    { value: 'cat', label: '개발하는 고양이', iconSrc: catIcon },
    { value: 'dog', label: '개발하는 강아지', iconSrc: dogIcon },
    { value: 'fox', label: '개발하는 여우', iconSrc: foxIcon },
    { value: 'parrot', label: '개발하는 앵무새', iconSrc: parrotIcon }
  ]
};

const iconOptions = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default iconOptions;
