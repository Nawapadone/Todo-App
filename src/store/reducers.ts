import { TodoState, TodoActionType, TodoActionInterface } from "./types";

const initialState: TodoState = {
    todos: [],
};

export function todoReducer(state = initialState, action: TodoActionInterface): TodoState {
    switch (action.type) {
        case TodoActionType.SET_TODO:
            return { todos: [...action.payload] };
        case TodoActionType.ADD_TODO:
            return { todos: [...state.todos, action.payload] };
        case TodoActionType.DELETE_TODO:
            return { todos: state.todos.filter((todo) => todo.id !== action.payload) };
        case TodoActionType.CHECK_TODO:
            return {
                todos: state.todos.map((todo) =>
                    todo.id === action.payload ? { id: todo.id, title: todo.title, completed: !todo.completed } : todo
                ),
            };
        case TodoActionType.EDIT_TODO:
            return {
                todos: state.todos.map((todo) =>
                    todo.id === action.payload ? { id: todo.id, title: todo.title, completed: todo.completed, isEdit: !todo.isEdit } : todo
                ),
            };
        case TodoActionType.SAVE_TODO:
            return {
                todos: [...state.todos.map((todo) =>
                    todo.id === action.payload.id ? { ...action.payload } : todo
                )]
            };
        default:
            return state;
    }
}