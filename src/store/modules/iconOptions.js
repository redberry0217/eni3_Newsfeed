import catIcon from 'assets/OptionImg1_cat.png';
import dogIcon from 'assets/OptionImg2_dog.png';
import foxIcon from 'assets/OptionImg3_fox.png';
import parrotIcon from 'assets/OptionImg4_parrot.png';

const SET_ICON_OPTIONS = 'iconOptions/SET_ICON_OPTIONS';
const ADD_ICON_OPTION = 'iconOptions/ADD_ICON_OPTION';
const SET_AVATAR_OPTION = 'iconOptions/SET_AVATAR_OPTION';

export const setIconOptions = (options) => ({
  type: SET_ICON_OPTIONS,
  payload: options.map((option) => ({
    ...option,
    iconsrc: option.iconsrc
  }))
});

export const addIconOption = (option) => ({
  type: ADD_ICON_OPTION,
  payload: option
});

export const setAvatarOption = (avatar) => ({
  type: SET_AVATAR_OPTION,
  payload: avatar
});
export const initialIconOptions = {
  iconOptions: [
    {
      value: 'cat',
      token: '470bf4b0-975d-4d2b-a924-a78554a2b97c',
      label: '개발하는 고양이',
      iconsrc: catIcon
    },
    {
      value: 'dog',
      token: 'b593ab1e-e003-4bc4-807e-dfc24f8cddd2',
      label: '개발하는 강아지',
      iconsrc: dogIcon
    },
    {
      value: 'fox',
      token: '993991da-ce15-4cf8-8b5d-29460c321528',
      label: '개발하는 여우',
      iconsrc: foxIcon
    },
    {
      value: 'parrot',
      token: '92bdc951-4be2-44d5-8406-ccee96feb8ed',
      label: '개발하는 앵무새',
      iconsrc: parrotIcon
    }
  ]
};

const iconOptions = (state = initialIconOptions, action) => {
  switch (action.type) {
    case SET_ICON_OPTIONS:
      return {
        ...state,
        iconOptions: action.payload
      };
    case ADD_ICON_OPTION:
      return {
        ...state,
        iconOptions: [...state.iconOptions, action.payload]
      };
    case SET_AVATAR_OPTION:
      return { ...state, selectedAvatar: action.payload };
    default:
      return state;
  }
};

export default iconOptions;
