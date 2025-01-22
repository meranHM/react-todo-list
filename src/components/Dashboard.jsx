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
 -adding a description input for each task (done)
 -adding a calender for each task
 -adding localStorage features
 -completing README.md descriptions
*/

export default function Dashboard() {
    //State Values
    const [tasksList, setTasksList] = useState([])
    const [filterStatus, setFilterStatus] = useState("all")
    const [openDescriptionId, setOpenDescriptionId] = useState(null)
    const [openCalenderId, setOpenCalenderId] = useState(null)

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

    //Grabbing tasks description from description-from and adding in the tasksList state in realtime
    function handleDescription(id, newDesc) {
                setTasksList(prevTasksList => prevTasksList.map(taskObj => (
                id === taskObj.id ? {...taskObj, description: newDesc} : taskObj
            ))) 
    }

    //Opening Modal and Closing Modal Functions
    function openDescriptionModal(id) {
        setOpenDescriptionId(id)
    }

    function openCalenderModal(id) {
        setOpenCalenderId(id)
    }

    function closeModals() {
        setOpenDescriptionId(null)
        setOpenCalenderId(null)
    }
    
    //Creating an eventListener for esc button to close the modals
        function handleKeyDown(e) {
            if (e.key === "Escape") {
                closeModals()
            }
        }
        
        useEffect(() => {
            if (openDescriptionId || openCalenderId) {
                window.addEventListener("keydown", handleKeyDown)
            } 
            return () => { 
                window.removeEventListener("keydown", handleKeyDown)
            }
        }, [openDescriptionId, openCalenderId])

    return (
        <main className="main">
            <form action={addTasks} 
                className="task-form"
            >
                <label className="task-label">
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
                        openDescriptionModal={openDescriptionModal}
                        openCalenderModal={openCalenderModal}
                        closeModals={closeModals}
                        openDescriptionId={openDescriptionId}
                        openCalenderId={openCalenderId}
                    />
                </section>
            )}
        </main>
    )
}