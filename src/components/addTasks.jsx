import React, { useEffect, useState } from "react";
import '../styles/addTasks.css'

export default function AddTask({task, setTask}) {
    const [taskName, setTaskName] = useState('');
    const [taskContent, setTaskContent] = useState('');
    const [showCreateTask, setShowCreateTask] = useState(false)

    const addToLocalStorage = (task) => {
        localStorage.setItem('task', JSON.stringify(task))
    }


    const handleSubmit = (event) => {
        event.preventDefault()
        const newTask = {
            id: crypto.randomUUID(),
            title: taskName,
            content: taskContent
        }

        setTask([...task, newTask]);
        setTaskName('');
        setTaskContent('');
        setShowCreateTask(false)
        addToLocalStorage([...task, newTask])
    }
    
    return(
        <div className="global">
            {!showCreateTask ? (
                <div className="btn-add">
                    <button type="submit" className="btn-newTask" onClick={() => setShowCreateTask(true)}>+</button>
                    <h3>New Task</h3>
                </div>
            ):(
                <form onSubmit={handleSubmit} className="form">
                    <label>
                        <h1 className="title">Task Title</h1>
                            <input 
                                type="text"
                                placeholder="Task Title"
                                className="input"
                                value={taskName}
                                onChange={(event)=>setTaskName(event.target.value)}
                            />
                    </label>
                    <label>
                        <h1 className="title">Write the task</h1>
                            <textarea 
                                type="text"
                                placeholder="Write a Task"
                                className="input"
                                value={taskContent}
                                onChange={(event)=>setTaskContent(event.target.value)}
                            />
                    </label>
                    <button type="submit" className="btn">ADD TASK</button>
                    <button type="submit" className="btn" onClick={() => setShowCreateTask(false)}>✖</button>
                </form>
            )}
        </div>
    )
}
