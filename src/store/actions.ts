import { Todo, TodoActionType, TodoActionInterface } from "./types";

export function setTodo(todo: Todo): TodoActionInterface {
    return {
        type: TodoActionType.SET_TODO,
        payload: todo,
    };
}

export function addTodo(todo: Todo): TodoActionInterface {
    return {
        type: TodoActionType.ADD_TODO,
        payload: todo,
    };
}

export function deleteTodo(index: string): TodoActionInterface {
    return {
        type: TodoActionType.DELETE_TODO,
        payload: index,
    };
}

export function checkTodo(index: string): TodoActionInterface {
    return {
        type: TodoActionType.CHECK_TODO,
        payload: index,
    };
}

export function editTodo(index: string): TodoActionInterface {
    return {
        type: TodoActionType.EDIT_TODO,
        payload: index,
    };
}

export function saveTodo(todo: Todo): TodoActionInterface {
    return {
        type: TodoActionType.SAVE_TODO,
        payload: todo,
    };
}