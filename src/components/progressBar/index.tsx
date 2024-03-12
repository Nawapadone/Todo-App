import './index.css';
import { useEffect, useState } from 'react';
import { getTodoState } from '../../store/selectors';
import { useSelector } from 'react-redux';
import React from "react";


const ProgressBar = () => {
    const todos = useSelector(getTodoState);
    const [progressValue, setProgressValue] = useState(0);
    const [count, setCount] = useState(0);

    const setupValue = () => {
        const value = todos.filter((todo) => todo.completed === true).length
        setProgressValue((value * 100) / todos.length)
        setCount(value)
    }

    useEffect(() => {
        setupValue()
    }, [todos]);

    return (
        <div className='container'>
            <div className='card-progress'>
                <div className='text-header roboto-medium'>Progress</div>
                <div style={{ padding: '0 15px 0 15px' }}>
                    <div className="progress-bar-container">
                        <div className="progress-bar" style={{ width: `${progressValue}%` }}></div>
                    </div>
                </div>
                <div className='text-title roboto-regular'>{count} completed</div>
            </div>
        </div>
    );
};

export default ProgressBar;