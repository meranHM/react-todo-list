import { useState } from "react"
import deleteIcon from "../assets/delete-icon.svg"
import closeIcon from "../assets/close-icon.svg"

export default function TaskList({tasksList, handleCheckboxChange, handleDelete, handleDescription, openModal, closeModal, openTaskId}) {
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

                <button onClick={() => openModal(id)}>Add Description</button>
                {openTaskId === id && (
                <div className="modal-overlay">
                    <div className="modal">
                            <button onClick={() => closeModal()}>
                                <img src={closeIcon} alt="close icon" />
                            </button>
                            <label htmlFor={`description-${id}`}>Description:</label>
                            <textarea 
                                name="description" 
                                id={`description-${id}`}
                                value={tasksList.find(task => task.id === id)?.description || ""}
                                onChange={(e) => handleDescription(id, e.target.value)}
                            >
                            </textarea>
                    </div>
                </div>)}
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