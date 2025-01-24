import deleteIcon from "../assets/delete-icon.svg"
import closeIcon from "../assets/close-icon.svg"

export default function TaskList(props) {
    //Mapping over added tasks and displaying them
    const taskElements = props.tasksList.map(({id, task}) => (
        <li key={id}
            className="task-item"
        >
            <div className="task">{task}</div>

            <div className="task-item-btn-container">
                <button onClick={() => props.openCalenderModal(id)}>Add Time and Date</button>
                    {props.openCalenderId === id && ( 
                    <div className="modal-overlay">
                        <div className="calendar-modal">
                            <button onClick={() => props.closeModals()}>
                                <img src={closeIcon} alt="close icon" />
                            </button>
                            <label> At:
                                <input type="time"
                                       name="time"
                                       value={props.tasksList.find(task => task.id === id)?.time || ""}
                                       onChange={(e) => props.handleAddTaskTime(id, e.target.value)}
                                />
                            </label>
                            <label> Duration:
                                <input type="number"
                                       className="duration"
                                       name="duration"
                                       min={1}
                                       max={24}
                                       placeholder="e.g., 3"
                                       value={props.tasksList.find(task => task.id === id)?.duration || ""}
                                       onChange={(e) => props.handleAddTaskDuration(id, e.target.value)}
                                />
                            </label>
                            <label> Date:
                                <input type="date" 
                                       name="date"
                                       value={props.tasksList.find(task => task.id === id)?.date || ""}
                                       onChange={(e) => props.handleAddTaskDate(id, e.target.value)}
                                />
                            </label>
                        </div>
                    </div>)}
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