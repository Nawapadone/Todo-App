import { Todo } from "./store/types";

const apiUrl = `http://localhost:3001/todos/`;

export async function getTodoList() {
    try {
        const response = await fetch(apiUrl)
        return await response.json();
    } catch (error) {
        console.log(error)
    }
};

export async function addTodoList(todo: Todo) {
    try {
        const response = await fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
};

export async function updateTodoList(todo: Todo) {
    try {
        const response = await fetch(`${apiUrl}${todo.id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
        });
        return await response.json();
    } catch (error) {
        console.log(error)
    }
};

export async function deleteTodoList(id: string) {
    try {
        const response = await fetch(`${apiUrl}${id}`, {
            method: 'DELETE',
        });
        return await response.ok;
    } catch (error) {
        console.log(error)
    }
};


