import closeIcon from "../assets/close-icon.svg"

export default function TaskForm(props) {
    const lastTaskName = props.tasksList[props.tasksList.length - 1].task

    return (
        <div className="modal-overlay">
            <div className="form-modal">
                <button onClick={() => props.closeTaskFormModal()}>
                    <img src={closeIcon} alt="close icon" />
                </button>
                <form
                    action=""
                    className="whole-form"
                >
                    <label className="task-label">
                        Task Name:
                        <input type="text" 
                            placeholder="e.g. Exercise"
                            name="task"
                            aria-label="Add task"
                            defaultValue={lastTaskName}
                        />
                    </label>
                    <label> At:
                        <input type="time"
                                name="time"
                        />
                    </label>
                    <label> Duration:
                        <input type="number"
                                className="duration"
                                name="duration"
                                min={1}
                                max={24}
                                placeholder="e.g., 3"
                        />
                    </label>
                    <label> Date:
                        <input type="date" 
                               name="date"
                        />
                    </label>
                    <label htmlFor="description">Description:
                    <textarea 
                        name="description" 
                        id="decription"
                    >
                    </textarea>
                    </label>

                    <button>SAVE</button>
                </form>
            </div>
        </div>
    )
}