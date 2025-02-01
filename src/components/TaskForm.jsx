import closeIcon from "../assets/close-icon.svg"
import { motion } from "framer-motion"

export default function TaskForm(props) {

    return (
        <div className="modal-overlay">
            <motion.div className="form-modal"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.3 }}
            >
                <button onClick={() => props.closeTaskFormModal()}
                        className="close-btn"    
                >
                    <img src={closeIcon} alt="close icon" />
                </button>
                <form
                    action={props.formSubmit}
                    className="whole-form"
                >
                    <label htmlFor="task">Task Name:</label>
                    <input type="text" 
                            placeholder="e.g. Exercise"
                            name="task"
                            aria-label="Add task"
                            defaultValue={props.tempTask}
                            id="task"
                    />

                    <label htmlFor="time"> At:</label>
                    <input type="time"
                           name="time"
                           id="time"
                    />

                    <label htmlFor="duration"> Duration:</label>
                    <input type="number"
                                className="duration"
                                id="duration"
                                name="duration"
                                min={1}
                                max={24}
                                placeholder="e.g., 3"
                    />

                    <label htmlFor="date"> Date:</label>
                    <input type="date" 
                               name="date"
                               id="date"
                    />

                    <label htmlFor="description">Description:</label>
                    <textarea 
                            name="description" 
                            id="description"
                        >
                    </textarea>
                    <button className="submit-btn">SAVE</button>
                </form>
            </motion.div>
        </div>
    )
}