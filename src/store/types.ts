import { UnknownAction } from "redux";

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    isEdit?: boolean;
}

export interface TodoState {
    todos: Todo[];
}

export enum TodoActionType {
    SET_TODO = 'SET_TODO',
    ADD_TODO = "ADD_TODO",
    CHECK_TODO = "CHECK_TODO",
    DELETE_TODO = "DELETE_TODO",
    EDIT_TODO = "EDIT_TODO",
    SAVE_TODO = "SAVE_TODO",
}
export type TodoAction = TodoActionType;

export interface TodoActionInterface extends UnknownAction {
    type: TodoAction;
    payload: any;
}