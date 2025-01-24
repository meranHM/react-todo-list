import { useState, useEffect } from "react"
import TaskList from "./TaskList"
import { nanoid } from "nanoid"
import TaskForm from "./TaskForm"

/* 
 -adding localStorage features
 -completing README.md descriptions
*/

export default function Dashboard() {
    //State Values
    const [tasksList, setTasksList] = useState([])
    const [filterStatus, setFilterStatus] = useState("all")
    const [openTaskFormId, setTaskFormId] = useState(false)
    const [openDescriptionId, setOpenDescriptionId] = useState(null)
    const [openCalenderId, setOpenCalenderId] = useState(null)

    //Derived Values
    const filteredTasks = 
            filterStatus === "all" ? tasksList : tasksList.filter(task => filterStatus === "completed" ? task.checked : !task.checked)

    //Grabbing tasks from task-form and adding it in the tasksList state 
    function addTasks(formData) {
        const newTask = formData.get("task")
        if (newTask === "") {
            return
        } else {
            setTasksList(prevTasksList => [...prevTasksList, {
                id: nanoid(),
                task: newTask.trim(),
                checked: false,
                description: "",
                time: "",
                duration: "",
                date: ""
            }])
            openTaskFormModal()
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

    //Grabbing tasks description from description-modal inputs and adding in the tasksList state
    function handleDescription(id, newDesc) {
                setTasksList(prevTasksList => prevTasksList.map(taskObj => (
                id === taskObj.id ? {...taskObj, description: newDesc} : taskObj
            ))) 
    }

    //Grabbing tasks calender data from calendar-modal inputs and adding in the tasksList state
    function handleAddTaskTime(id, newTime) {
        setTasksList(prevTasksList => prevTasksList.map(taskObj => (
            id === taskObj.id ? {...taskObj, time: newTime} : taskObj
        )))
    }

    function handleAddTaskDuration(id, newDur) {
        setTasksList(prevTasksList => prevTasksList.map(taskObj => (
            id === taskObj.id ? {...taskObj, duration: newDur} : taskObj
        )))
    }

    function handleAddTaskDate(id, newDate) {
        setTasksList(prevTasksList => prevTasksList.map(taskObj => (
            id === taskObj.id ? {...taskObj, date: newDate} : taskObj
        )))
    }

    //Opening Modal and Closing Modal Functions
    function openTaskFormModal() {
        setTaskFormId(true)
    }

    function closeTaskFormModal() {
        setTaskFormId(false)
    }

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
                closeTaskFormModal()
            }
        }
        
        useEffect(() => {
            if (openDescriptionId || openCalenderId) {
                window.addEventListener("keydown", handleKeyDown)
            } 
            return () => { 
                window.removeEventListener("keydown", handleKeyDown)
            }
        }, [openDescriptionId, openCalenderId, openTaskFormId])
        
        console.log(tasksList)
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
            {openTaskFormId && 
                <TaskForm 
                    closeTaskFormModal={closeTaskFormModal}
                    tasksList={tasksList}
                />}
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
                        handleAddTaskTime={handleAddTaskTime}
                        handleAddTaskDuration={handleAddTaskDuration}
                        handleAddTaskDate={handleAddTaskDate}
                    />
                </section>
            )}
        </main>
    )
}