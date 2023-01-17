import {IStackPage, TStackAnimation} from "../../types/components";
import {nanoid} from "nanoid";
import {ElementStates} from "../../types/element-states";
import {wait} from "../../utils/utils";

export const initialState:IStackPage = {
  inputValue: '',
  buttonLoaders: {
    addBtn: false,
    deleteBtn: false,
    clearBtn: false,
  },
  buttonBlocks: {
    addBtn: true,
    deleteBtn: false,
    clearBtn: false,
  },
  array: [],
};

export const stackAnimations:TStackAnimation = async (stack, updateState, type) => {
  const array = stack.getArray();
  const arrayLength = array.length-1;
  switch (type) {
  case 'add':
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Changing, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default, top: false}
      })});
    await wait(500);
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Default, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default, top: false}
      })});
    break;
  case 'delete':
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Changing, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default}
      })});
    await wait(500);
    updateState({inputValue: '', array: array.map((number, index) => {
        if(index === arrayLength) return {number, key: nanoid(10), state: ElementStates.Default, top: true};
        return {number, key: nanoid(10), state: ElementStates.Default, top: false}
      })});
    break;
  case 'clear':
    updateState({array});
    break;
  default:
    alert( "LOL" );
  }
}