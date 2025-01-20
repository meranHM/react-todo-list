import { useState, useEffect } from "react"
import TaskList from "./TaskList"
import { nanoid } from "nanoid"

/* 
 -saving tasks from users into state (done)
 -displaying saved tasks from state as a li (done)
 -adding checkboxes next to each task (done)
 -adding functionality to checkboxes to change checked tasks in state (done)
 -adding a delete button next to each task (done)
 -adding functionality to delete buttons to delete tasks from tasksList (done)
 -filter tasks by completed and pending status (done)
 -adding a section for buttons to add filtering tasks (done)
 -adding a description input for each task
 -adding a calender for each task
*/

export default function Dashboard() {
    //State Values
    const [tasksList, setTasksList] = useState([])
    const [filterStatus, setFilterStatus] = useState("all")

    //Derived Values
    const filteredTasks = 
            filterStatus === "all" ? tasksList : tasksList.filter(task => filterStatus === "completed" ? task.checked : !task.checked)

    //Grabbing tasks from task-form and putting it in the tasksList state 
    function addTasks(formData) {
        const newTask = formData.get("task")
        if (newTask === "") {
            return
        } else {
            setTasksList(prevTasksList => [...prevTasksList, {
                id: nanoid(),
                task: newTask.trim(),
                checked: false,
                description: ""
            }])
        }
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

    //Grabbing tasks description from description-from and adding in the tasksList state
    function handleDescription(id, formData) {
        const newDesc = formData.get("description")
                setTasksList(prevTasksList => prevTasksList.map(taskObj => (
                id === taskObj.id ? {...taskObj, description: newDesc} : taskObj
            ))) 
    }

    console.log(tasksList)
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
                <button className="add-task-btn">ADD</button>
            </form>
            {tasksList.length > 0 && (
                <section className="tasks-section">
                    <section className="filter-container">
                        <span>
                            Filter By:
                            <button
                                onClick={() => setFilterStatus("completed")}
                                className={filterStatus === "completed" ? "active-filter" : ""}
                            >
                                Completed Tasks
                            </button>
                            <button
                                onClick={() => setFilterStatus("pending")}
                                className={filterStatus === "pending" ? "active-filter" : ""}
                            >
                                Pending Tasks
                            </button>
                            <button
                                onClick={() => setFilterStatus("all")}
                                className={filterStatus === "all" ? "active-filter" : ""}
                            >
                                All
                            </button>
                        </span>
                    </section>
                    <TaskList 
                    tasksList={filteredTasks}
                    handleCheckboxChange={handleCheckboxChange}
                    handleDelete={handleDelete}
                    handleDescription={handleDescription}
                    />
                </section>
            )}
        </main>
    )
}