import React, {useMemo, useReducer} from "react";
// ui
import {Input} from "../ui/input/input";
import {Button} from "../ui/button/button";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import {Circle} from "../ui/circle/circle";
// компоненты
import {IStackPage} from "../../types/components";
//стили
import styles from "./stack-page.module.css";
//вспомогательные
import {initialState, Stack, stackAnimations} from "./utils";
import {wait} from "../../utils/utils";
import {SHORT_DELAY_IN_MS} from "../../constants/delays";

export const StackPage: React.FC = () => {

  const stack = useMemo(() => new Stack<string>(), []);
  const [state, updateState] = useReducer<(state: IStackPage, updates: any) => IStackPage>(
    (state, updates) => ({ ...state, ...updates }),
    initialState
  );

  const inputHandler = (evt: React.FormEvent<HTMLInputElement>) => {
    let input = evt.target as HTMLInputElement;
    input.value
      ? updateState({ buttonBlocks: {...state.buttonBlocks, addBtn: false, deleteBtn: false, clearBtn: false}, inputValue: input.value})
      : updateState({ buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: true, clearBtn: true }, inputValue: input.value})
  };

  const buttonAddHandler = async () => {
    stack.push(state.inputValue);
    updateState({buttonLoaders: {...state.buttonLoaders, addBtn: true}, buttonBlocks: {...state.buttonBlocks, deleteBtn: true, clearBtn: true} });
    stackAnimations(stack, updateState, 'add');
    await wait(SHORT_DELAY_IN_MS);
    await updateState({buttonLoaders: {...state.buttonLoaders, addBtn: false}, buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: false, clearBtn: false} });
  };

  const buttonDeleteHandler = async() => {
    stack.pop();
    updateState({buttonLoaders: {...state.buttonLoaders, deleteBtn: true}, buttonBlocks: {...state.buttonBlocks, addBtn: true, clearBtn: true} });
    stackAnimations(stack, updateState, 'delete');
    const flag = stack.getArray().length;
    await wait(SHORT_DELAY_IN_MS);
    flag > 0
      ? await updateState({buttonLoaders: {...state.buttonLoaders, deleteBtn: false}, buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: false, clearBtn: false} })
      : await updateState({buttonLoaders: {...state.buttonLoaders, deleteBtn: false}, buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: true, clearBtn: true} });
  };
  const buttonClearHandler = async () => {
    stack.clear();
    updateState({buttonLoaders: {...state.buttonLoaders, clearBtn: true}, buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: true} });
    stackAnimations(stack, updateState, 'clear');
    await wait(SHORT_DELAY_IN_MS);
    await updateState({buttonLoaders: {...state.buttonLoaders, clearBtn: false}, buttonBlocks: {...state.buttonBlocks, addBtn: true, deleteBtn: true, clearBtn: true} });
  };
  return (
    <SolutionLayout title="Стек">
      <div className={styles.mainWrapper}>
        <div className={styles.panel}>
          <div className={styles.wrapper}>
            <Input
              maxLength={4}
              extraClass={styles.input}
              onChange={inputHandler}
              type={"text"} isLimitText
              value={state.inputValue}
            />
            <Button
              text={"Добавить"}
              isLoader={state.buttonLoaders.addBtn}
              disabled={state.buttonBlocks.addBtn}
              linkedList={"small"}
              onClick={buttonAddHandler}
              testData={'buttonAdd'}
            />
            <Button
              text={"Удалить"}
              isLoader={state.buttonLoaders.deleteBtn}
              disabled={state.buttonBlocks.deleteBtn}
              linkedList={"small"}
              onClick={buttonDeleteHandler}
              testData={'buttonDelete'}
            />
          </div>
          <Button
            text={"Очистить"}
            isLoader={state.buttonLoaders.clearBtn}
            disabled={state.buttonBlocks.clearBtn}
            linkedList={"small"}
            onClick={buttonClearHandler}
            testData={'buttonClear'}
          />
        </div>
        <ul className={styles.circles}>
          {state.array && state.array.map(circle => <Circle state={circle.state} key={circle.key} letter={circle.number} head={circle.top ? 'top': ''}/>)}
        </ul>
      </div>
    </SolutionLayout>
  );
};
