import deleteIcon from "../assets/delete-icon.svg"

export default function TaskList({tasksList, handleCheckboxChange, handleDelete}) {
    //Mapping over added task and displaying them
    const taskElements = tasksList.map(({id, task}) => (
        <li key={id}>
            {task}
            <input 
                type="checkbox"
                onChange={() => handleCheckboxChange(id)}
            />
            <button
                onClick={() => handleDelete(id)}
            >
                <img src={deleteIcon} alt="delete icon" />
            </button>
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