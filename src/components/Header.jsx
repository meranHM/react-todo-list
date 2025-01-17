import toDoListIcon from "../assets/todo-list-icon.png"

export default function Header() {
    return (
        <header className="header">
            <section className="title">
                <h1>Responsive To Do List</h1>
                <img src={toDoListIcon} alt="to do list logo" />
            </section>
        </header>
    )
}