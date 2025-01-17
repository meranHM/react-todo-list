

export default function TaskList({tasksList}) {
    const taskElements = tasksList.map(({id, task}) => (
        <li key={id}>{task}</li>
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