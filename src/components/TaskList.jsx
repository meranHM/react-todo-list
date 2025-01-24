import deleteIcon from "../assets/delete-icon.svg"
import closeIcon from "../assets/close-icon.svg"

export default function TaskList(props) {
    //Mapping over added tasks and displaying them
    const taskElements = props.tasksList.map(({id, task}) => {
        const taskDetails = props.tasksList.find(task => task.id === id)
        const hasDetails = taskDetails?.time || taskDetails?.duration || taskDetails?.date

        return (
        <li key={id}
            className="task-item"
        >
            <div className="task">{task}</div>
            <div className="task-calendar-details">
                {hasDetails && 
                <div className="task-calendar-text">
                    {taskDetails?.time && <span><b>At:</b> {taskDetails?.time || ""}</span>}
                    {taskDetails?.duration && <span><b>For:</b> {taskDetails?.duration || ""}h</span>}
                    {taskDetails?.date && <span><b>Date:</b> {taskDetails?.date || ""}</span>}
                </div>}
                <button 
                onClick={() => props.openCalenderModal(id)}
                >
                    {hasDetails ? "Edit" : "Add Time and Date"}
                </button>
            </div>
            {props.openCalenderId === id && ( 
            <div className="modal-overlay">
                <div className="calendar-modal">
                    <button onClick={() => props.closeModals()}>
                        <img src={closeIcon} alt="close icon" />
                    </button>
                    <label> At:
                        <input type="time"
                                name="time"
                                value={taskDetails?.time || ""}
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
                                value={taskDetails?.duration || ""}
                                onChange={(e) => props.handleAddTaskDuration(id, e.target.value)}
                        />
                    </label>
                    <label> Date:
                        <input type="date" 
                               name="date"
                               value={taskDetails?.date || ""}
                               onChange={(e) => props.handleAddTaskDate(id, e.target.value)}
                        />
                    </label>
                </div>
            </div>)}
            <div className="task-item-btn-container">
                <button onClick={() => props.openDescriptionModal(id)}>Description</button>
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
                                    value={taskDetails?.description || ""}
                                    onChange={(e) => props.handleDescription(id, e.target.value)}
                                >
                                </textarea>
                        </div>
                    </div>)}
                    <label>Completed:</label>
                    <input 
                            type="checkbox"
                            onChange={() => props.handleCheckboxChange(id)}
                            checked={taskDetails?.checked || false}
                            className="task-checkbox"
                    />
                                    <button
                        onClick={() => props.handleDelete(id)}
                    >
                        <img src={deleteIcon} alt="delete icon" />
                    </button>
            </div>
        </li>
    )
})

    return (
        <section className="task-list-container">
            <h2>Tasks:</h2>
            <ul className="task-list">
                {taskElements}
            </ul>
        </section>
    )
}