import { useState } from "react"
import TaskList from "./TaskList"
import { nanoid } from "nanoid"

export default function Dashboard() {
    const [tasksList, setTasksList] = useState([])

    function addTasks(formData) {
        const newTask = formData.get("task")
        setTasksList(prevTasksList => [...prevTasksList, {
            id: nanoid(),
            task: newTask
        }])
    }


    return (
        <main className="main">
            <form action={addTasks} 
                className="task-form"
            >
                <label className="task-field">
                    Add a new task:
                    <input type="text" 
                           placeholder="e.g. Exercise"
                           name="task"
                           aria-label="Add task"
                    />
                </label>
                <button className="add-task-btn">Add</button>
            </form>
            <TaskList tasksList={tasksList}/>
        </main>
    )
}