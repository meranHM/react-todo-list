import { useState } from "react"
import deleteIcon from "../assets/delete-icon.svg"
import closeIcon from "../assets/close-icon.svg"

export default function TaskList(props) {
    //Mapping over added tasks and displaying them
    const taskElements = props.tasksList.map(({id, task}) => (
        <li key={id}
            className="task-item"
        >
            <div className="task">{task}</div>

            <button onClick={() => props.openCalenderModal(id)}>Add Time and Date</button>
            {props.openCalenderId === id && ( 
            <div className="modal-overlay">
                <div className="calender-modal">
                    From:
                    <input type="time"/>
                    Untill:
                    <input type="time"/>
                </div>
            </div>)}

            <div className="task-item-btn-container">
                <label>Completed:</label>
                <input 
                        type="checkbox"
                        onChange={() => props.handleCheckboxChange(id)}
                        checked={props.tasksList.find(task => task.id === id)?.checked || false}
                        className="task-checkbox"
                />
                <button
                    onClick={() => props.handleDelete(id)}
                >
                    <img src={deleteIcon} alt="delete icon" />
                </button>

                <button onClick={() => props.openDescriptionModal(id)}>Add Description</button>
                {props.openDescriptionId === id && (
                <div className="modal-overlay">
                    <div className="description-modal">
                            <button onClick={() => props.closeModals()}>
                                <img src={closeIcon} alt="close icon" />
                            </button>
                            <label htmlFor={`description-${id}`}>Description:</label>
                            <textarea 
                                name="description" 
                                id={`description-${id}`}
                                value={props.tasksList.find(task => task.id === id)?.description || ""}
                                onChange={(e) => props.handleDescription(id, e.target.value)}
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