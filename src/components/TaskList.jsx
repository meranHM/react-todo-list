import { useState } from "react"
import deleteIcon from "../assets/delete-icon.svg"

export default function TaskList({tasksList, handleCheckboxChange, handleDelete, handleDescription}) {
    //Passing description value to the parent function
    function handleSubmitDescription(e, id) {
        e.preventDefault()
        const formData = new FormData(e.target)
        handleDescription(id, formData)
    }

    //Mapping over added tasks and displaying them
    const taskElements = tasksList.map(({id, task}) => (
        <li key={id}
            className="task-item"
        >
            {task}
            <div className="task-item-btn-container">
                <label>Completed:</label>
                <input 
                        type="checkbox"
                        onChange={() => handleCheckboxChange(id)}
                        className="task-checkbox"
                />
                <button
                    onClick={() => handleDelete(id)}
                >
                    <img src={deleteIcon} alt="delete icon" />
                </button>
                <div className="task-description-container">
                    <form onSubmit={(e) => handleSubmitDescription(e, id)}>
                        <label htmlFor={`description-${id}`}>Description:</label>
                        <textarea name="description" id={`description-${id}`}></textarea>
                        <button type="submit">Add Description</button>
                    </form>
                </div>
            </div>
        </li>
    ))

    return (
        <section className="task-list-container">
            <h2>Tasks:</h2>
            <ul className="task-list">
                {taskElements}
            </ul>
        </section>
    )
}