import deleteIcon from "../assets/delete-icon.svg"

export default function TaskList({tasksList, handleCheckboxChange, handleDelete}) {
    //Mapping over added tasks and displaying them
    const taskElements = tasksList.map(({id, task}) => (
        <li key={id}
            className="task-item"
        >
            {task}
            <div className="task-item-btn-container">
                <label>
                    Completed:
                    <input 
                        type="checkbox"
                        onChange={() => handleCheckboxChange(id)}
                    />
                </label>
                <button
                    onClick={() => handleDelete(id)}
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