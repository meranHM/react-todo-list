import { useState } from "react"
import TaskList from "./TaskList"
import { nanoid } from "nanoid"

/* 
 -saving tasks from users into state (done)
 -displaying saved tasks from state as a li (done)
 -adding checkboxes next to each task (done)
 -adding functionality to checkboxes to change checked tasks in state (done)
 -adding a delete button next to each task (done)
 -adding functionality to delete buttons to delete tasks from tasksList (done)
 -filter tasks by completed and pending status
 -adding a section for buttons to add filtering tasks
 -
*/

export default function Dashboard() {
    //State Values
    const [tasksList, setTasksList] = useState([])


    //Grabbing tasks from task-form and putting it in the tasksList state array
    function addTasks(formData) {
        const newTask = formData.get("task")
        setTasksList(prevTasksList => [...prevTasksList, {
            id: nanoid(),
            task: newTask,
            checked: false
        }])
    }

    //Controlling checkboxes in our state
    function handleCheckboxChange(id) {
        setTasksList(prevTasksList => prevTasksList.map(taskObj => (
            taskObj.id === id ? {...taskObj, checked: !taskObj.checked} : taskObj
        )))
    }

    //Delete button functionality
    function handleDelete(id) {
        setTasksList(prevTasksList => prevTasksList.filter(taskObj => taskObj.id !== id))
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
            <TaskList 
                tasksList={tasksList}
                handleCheckboxChange={handleCheckboxChange}
                handleDelete={handleDelete}
            />
        </main>
    )
}