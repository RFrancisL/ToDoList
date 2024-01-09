import { useEffect, useState } from "react"
import '../styles/listTasks.css'
export default function TasksList({ task, setTask, addToLocalStorage }) {
    
    const [ editTaskId, setEditTaskId ] = useState(null)
    const [ editTaskTitle, setEditTaskTitle ] = useState('')
    const [ editTaskContent, setEditTaskContent ] = useState('')

    const editedTask = (id) => {
        setEditTaskId(id)
        {/*const taskEdited = task.find((tas) => tas.id === id): Utiliza el método find para buscar la tarea 
        dentro del array 'task' que coincida con el id recibido como parámetro. 
        Encuentra la tarea específica en función de su identificación única.*/}
        const taskEdited = task.find((tas) => tas.id === id)
        setEditTaskTitle(taskEdited.title)
        setEditTaskContent(taskEdited.content)
    }

    {/*const newTask = task.filter((tas) => tas.id !== id): Utiliza el método filter en el array 'task' para 
    crear un nuevo array llamado 'newTask'. Este nuevo array contendrá todas las tareas excepto 
    la tarea que coincide con el id proporcionado. La condición tas.id !== id asegura que solo las tareas 
    cuyo id no coincida con el id proporcionado se incluyan en el nuevo array.*/}
    const deleteTask = (id) => {
        const newTask = task.filter((tas) => tas.id !== id)
        setTask(newTask)
        localStorage.setItem('task', JSON.stringify(newTask))
    }

    const handleUpdate = () => {

        {/*Recorro cada elemento del array 'task'. Para cada elemento tas dentro del array task, 
        se verifica si la id de la tarea es igual a editTaskId (la tarea que se está editando).
        Si coincide, crea un nuevo objeto (una nueva versión de la tarea) usando el operador de propagación 
        (...tas para copiar las propiedades existentes) y actualiza las propiedades title y content con 
        los valores almacenados en editTaskTitle y editTaskContent, respectivamente. 
        Si la condición no se cumple, simplemente devuelve la tarea sin cambios.**/}
        const updateTask = task.map((tas) => 
            tas.id === editTaskId ? { ...tas, title: editTaskTitle, content: editTaskContent } : tas
        )
        setTask(updateTask)
        setEditTaskId(null)
        setEditTaskTitle('')
        setEditTaskContent('')
        localStorage.setItem('task', JSON.stringify(updateTask))
    }


    useEffect(() => {
        const savedTask = localStorage.getItem('task');
        //verifico si savedTask es null o undefined
        if (savedTask) {
            try {
                const parsedTask = JSON.parse(savedTask)
                setTask(parsedTask) //Actualizar el estado de las tareas con los datos del localStorage
            } catch (error) {
                console.error("Error parsing task from localStorage:", error);
                localStorage.removeItem('task');
            }
        }
    }, []);

    
    return(
        <>
            <div>
                {task.length === 0 ? (
                    <h1 className="AnyTask">There is not any task. Add more tasks!</h1>
                ) : (
                <ul className="GlobalTask">
                    {task.map((tas) => (
                    <div key={tas.id} className="SingleTask">
                        {editTaskId === tas.id ? (
                        <div>
                            <h1>Edit Task</h1>
                            <form onSubmit={handleUpdate}>
                                <label>
                                    <h1>Task Title</h1>
                                    <input
                                    type="text"
                                    value={editTaskTitle}
                                    onChange={(event) => setEditTaskTitle(event.target.value)}
                                    />
                                </label>
                                <label>
                                    <h1>Write the task</h1>
                                    <textarea
                                    value={editTaskContent}
                                    onChange={(event) => setEditTaskContent(event.target.value)}
                                    />
                                </label>
                                <button type="submit">Update Task</button>
                            </form>
                        </div>
                        ) : (
                        <div className="cardTask">
                            <button onClick={() => editedTask(tas.id)} className="cardEditBtn">✏</button>
                            <button type="button" onClick={()=>deleteTask(tas.id)} className="cardBtn">🗑</button>
                            <h1 className="cardTitle">{tas.title}</h1>
                            <p className="cardContent">{tas.content}</p>
                        </div>
                        )}
                    </div>
                    ))}
                </ul>
            )}
            </div>
        </>
    )
}