import deleteIcon from "../assets/delete-icon.svg"
import closeIcon from "../assets/close-icon.svg"
import { motion, AnimatePresence } from "framer-motion"

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
                    {taskDetails?.time && <span><b>At:</b> {taskDetails?.time}</span>}
                    {taskDetails?.duration && <span><b>For:</b> {taskDetails?.duration}h</span>}
                    {taskDetails?.date && <span><b>Date:</b> {taskDetails?.date}</span>}
                </div>}
                <button onClick={() => props.openCalenderModal(id)}>Edit</button>
            </div>
            <AnimatePresence>
            {props.openCalenderId === id && ( 
                <div className="modal-overlay">
                    <motion.div 
                                className="calendar-modal"
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.3 }}
                    >
                        <button onClick={() => props.closeModals()}>
                            <img src={closeIcon} alt="close icon" />
                        </button>
                        <h3 className="modal-title">{taskDetails?.task}</h3>
                        <label htmlFor="time"> At:</label>
                        <input type="time"
                                    name="time"
                                    id="time"
                                    value={taskDetails?.time || ""}
                                    onChange={(e) => props.handleAddTaskTime(id, e.target.value)}
                        />

                        <label htmlFor="duration"> Duration:</label>
                        <input type="number"
                                    className="duration"
                                    id="duration"
                                    name="duration"
                                    min={1}
                                    max={24}
                                    placeholder="e.g., 3"
                                    value={taskDetails?.duration || ""}
                                    onChange={(e) => props.handleAddTaskDuration(id, e.target.value)}
                        />

                        <label htmlFor="date"> Date:</label>
                        <input type="date" 
                                name="date"
                                id="date"
                                value={taskDetails?.date || ""}
                                onChange={(e) => props.handleAddTaskDate(id, e.target.value)}
                        />

                    </motion.div>
                </div>)}
            </AnimatePresence>
            <div className="task-item-btn-container">
                <button onClick={() => props.openDescriptionModal(id)}>Description</button>
                <AnimatePresence>
                    {props.openDescriptionId === id && (
                        <div className="modal-overlay">
                            <motion.div 
                                        className="description-modal"
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.9 }}
                                        transition={{ duration: 0.3 }}
                            >
                                    <button onClick={() => props.closeModals()}>
                                        <img src={closeIcon} alt="close icon" />
                                    </button>
                                    <h3 className="modal-title">{taskDetails?.task}</h3>
                                    <label htmlFor="description">Description:</label>
                                    <textarea 
                                        name="description" 
                                        id="description"
                                        value={taskDetails?.description || ""}
                                        onChange={(e) => props.handleDescription(id, e.target.value)}
                                    >
                                    </textarea>
                            </motion.div>
                        </div>)}
                    </AnimatePresence>
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