import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event'
import '@testing-library/jest-dom'
import App from './App';
import { Provider } from 'react-redux';
import configureStore from './store';
import * as ActionsImports from './store/actions';
import { TodoActionType, TodoState } from './store/types';
import { todoReducer } from './store/reducers';

const setup = () => {
  const utils = render((
    <Provider store={configureStore()}>
      <App />
    </Provider>
  ));
  const input = screen.getByLabelText('todo-input') as HTMLInputElement
  return {
    input,
    ...utils,
  }
}

test('Should Add Todo list', () => {
  const { input } = setup()
  fireEvent.change(input, { target: { value: 'hello world' } })
  expect(input.value).toBe('hello world')
});

test('should Add an action with ADD_TODO type', () => {
  const initialState: TodoState = {
    todos: [],
  };
  const action = { type: TodoActionType.ADD_TODO, payload: { todo: 'hello world', completed: false } };

  const nextState = todoReducer(initialState, action);

  expect(nextState).toEqual({ todos: [{ todo: 'hello world', completed: false }] });
});

test('should Delete an action with DELETE_TODO type', () => {
  const initialState: TodoState = {
    todos: [{ id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', title: 'hello world', completed: false }],
  };
  const action = { type: TodoActionType.DELETE_TODO, payload: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' };

  const nextState = todoReducer(initialState, action);

  expect(nextState).toEqual({ todos: [] });
});

test('should Check an action with CHECK_TODO type', () => {
  const initialState: TodoState = {
    todos: [{ id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', title: 'hello world', completed: false }],
  };
  const action = { type: TodoActionType.CHECK_TODO, payload: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed' };

  const nextState = todoReducer(initialState, action);

  console.log(nextState)

  expect(nextState).toEqual({ todos: [{ id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', title: 'hello world', completed: true }] });
});

test('should save an action with SAVE_TODO type', () => {
  const initialState: TodoState = {
    todos: [{ id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', title: 'hello world', completed: false }],
  };
  const action = { type: TodoActionType.SAVE_TODO, payload: { id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed', title: 'Wake up', completed: false } };

  const nextState = todoReducer(initialState, action);

  expect(nextState).toEqual({
    todos: [
      {
        id: '1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed',
        title: 'Wake up',
        completed: false
      }
    ]
  });
});


