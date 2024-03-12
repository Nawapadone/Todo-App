import React, { useEffect } from 'react';
import './index.css';
import { useDispatch, useSelector } from "react-redux";
import { getTodoState } from "../../store/selectors";
import { checkTodo, deleteTodo, editTodo, saveTodo, setTodo } from "../../store/actions";
import { deleteTodoList, getTodoList, updateTodoList } from '../../connectDb';
import { Todo } from '../../store/types';

const TodoTable = () => {
    const [todoMessage, setTodoMessage] = React.useState("");
    const [useFilter, setUseFilter] = React.useState("All");
    const todos = useSelector(getTodoState);
    const [useTodos, setUseTodo] = React.useState(todos);
    const dispatch = useDispatch();

    const handleCheck = (event: React.ChangeEvent<HTMLInputElement>) => {
        const index = event.target.value;
        const [todo] = todos.filter((todo) => todo.id === index)
        const updateTodo = { id: todo.id, title: todo.title, completed: !todo.completed };
        dispatch(checkTodo(index));
        updateTodoList(updateTodo)
    };

    const handleDeleteButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const index = event.currentTarget.value;
        dispatch(deleteTodo(index));
        deleteTodoList(index)
    };

    const editTodos = (event: React.MouseEvent<HTMLButtonElement>) => {
        const index = event.currentTarget.value;
        dispatch(editTodo(index));
    };

    const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoMessage(event.target.value);
    };

    const handleSaveButton = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        if (todoMessage) {
            const index = event.currentTarget.value;
            const todo = { id: index, title: todoMessage, completed: false };
            dispatch(saveTodo(todo));
            updateTodoList(todo)
            setTodoMessage("");
        }
    };

    const handleFilter = async (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        const key = event.currentTarget.value;
        switch (key) {
            case 'All':
                getTodos()
                setUseFilter(key)
                break;
            case 'Done':
                await getTodos()
                const done = await useTodos.filter((todo) => todo.completed === true) as unknown as Todo
                dispatch(setTodo(done))
                setUseFilter(key)
                break;
            case 'Undone':
                await getTodos()
                const unDone = await useTodos.filter((todo) => todo.completed === false) as unknown as Todo
                dispatch(setTodo(unDone))
                setUseFilter(key)
                break;
            default:
                break;
        }
    }

    const getTodos = async () => {
        const res = await getTodoList()
        dispatch(setTodo(res))
        setUseTodo(res)
    };

    useEffect(() => {
        getTodos()
    }, []);

    return (
        <div className='container'>
            <div className='flex custom-filter'>
                <div className='roboto-medium' style={{ fontSize: '24px' }}>Task</div>
                <div className="filter-dropdown">
                    <button className="filter-button"><div>{useFilter}</div> <div>&#709;</div></button>
                    <div className="filter-content">
                        <button className="filter-item" value='All' onClick={handleFilter}>All</button>
                        <button className="filter-item" value='Done' onClick={handleFilter}>Done</button>
                        <button className="filter-item" value='Undone' onClick={handleFilter}>Undone</button>
                    </div>
                </div>
            </div>
            {todos.map((todo, key) => {
                return (
                    <div className='flex-card' style={todo.isEdit ? { padding: '0px' } : {}} key={key}>
                        <div className='flex' style={{ width: '100%', height: '100%' }}>
                            {!todo.isEdit ?
                                <input
                                    disabled={todo.isEdit}
                                    type="checkbox"
                                    checked={todo.completed}
                                    onChange={handleCheck}
                                    value={todo.id}
                                /> : ''}
                            {todo.isEdit ?
                                <input
                                    style={{ paddingLeft: '15px' }}
                                    type="text"
                                    placeholder="Add your todo..."
                                    onChange={handleOnChange}
                                    value={todoMessage} /> :
                                <div>{todo.completed ? <del> {todo.title} </del> : todo.title}</div>}
                        </div>
                        {todo.isEdit ?
                            <button className='save-button' value={todo.id} onClick={handleSaveButton}>save</button>
                            : <div className="dropdown">
                                <button className="dropbtn">&#8226;&#8226;&#8226;</button>
                                <div className="dropdown-content">
                                    <button className='dropdown-button' value={todo.id} onClick={editTodos}>Edit</button>
                                    <button className='dropdown-button' style={{ color: "#E07C7C" }} value={todo.id} onClick={handleDeleteButton}>Delete</button>
                                </div>
                            </div>}
                    </div>
                )
            })}
        </div>
    );
};

export default TodoTable;