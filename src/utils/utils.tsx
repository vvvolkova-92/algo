import {IArrayColumns} from "../types/components";

type Tswap = (array: any[], i: number, min: number) => void;
type TSwapColumns = (array: IArrayColumns[], i: number, min: number) => void;
type TCompare = (a: string, b: string) => number;
// ф-ия для правильно вывода окончания в подсказке к инпуту
export const declination = (count: number | undefined) => {
  const array = ['символ', 'символа', 'символов'];
  if (count) {
    count = Math.abs(count) % 100;
    let c1 = count % 10;
    if (count > 10 && count < 20) return array[2];
    if (c1 > 1 && c1 < 5) return array[1];
    if (c1 == 1) return array[0];
  }
  return array[2];
};

// ф-ия ожидания между анимациями
export const wait  = (ms: number) => {
  return new Promise( resolve => setTimeout(resolve, ms));
};

//менять местами эл-ты массива
export const swap:Tswap = (array, i, min) => {
  //копия значения по индексу  i
  const copy = array[i];
  array[i] = array[min];
  array[min] = copy;
};

export const swapColumns:TSwapColumns = (array, i, min) => {
  //копия значения по индексу  i
  const copy = array[i].number;
  array[i].number = array[min].number;
  array[min].number = copy;
};

// ф-ия для сравнения
export const compare:TCompare = (a, b) => {
  if (a === b) return 0;
  return a < b ? -1 : 1;
};