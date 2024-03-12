import React from "react";
import './index.css';
import { useDispatch } from "react-redux";
import { addTodo } from "../../store/actions";
import { v4 as uuidv4 } from 'uuid';
import { addTodoList } from "../../connectDb";

const Todo = () => {
    const [todoMessage, setTodoMessage] = React.useState("");
    const dispatch = useDispatch();

    const handleButtonClick = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter' && todoMessage) {
            const todo = { id: uuidv4(), title: todoMessage, completed: false };
            addTodoList(todo)
            dispatch(addTodo(todo));
            setTodoMessage("");
        }
    };

    const handeOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setTodoMessage(event.target.value);
    };

    return (
        <div className="container">
            <div className="flex-input">
                <input
                    style={{ paddingLeft: '15px' }}
                    type="text"
                    aria-label="todo-input"
                    placeholder="Add your todo..."
                    onChange={handeOnChange}
                    value={todoMessage}
                    onKeyDown={(event) => handleButtonClick(event)}
                />
            </div>
        </div>
    );
};

export default Todo;