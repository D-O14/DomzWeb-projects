import styles from "./Todo.module.css";
import Button from "../../Button/Button";
import { useState } from "react";
import Input from "./Input";

export default function Todo() {
    const [tasks, setTasks] = useState(["Eat Breakfast", "Take a shower", "Walk the dog"]);
    const [newTask, setNewTask] = useState("");

    function inputChange(e) { setNewTask(e.target.value) };

    function addTask() {
        if (newTask.trim() !== "") {
            setTasks(_ => [...tasks, newTask]);
            setNewTask("");
        }
    };

    function deleteTask(index) {
        const updatedTasks =
            tasks.filter((_, i) => {
                return i !== index;
            });
        setTasks(updatedTasks);
    };

    function moveUp(index) {
        if (index > 0) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index - 1]] =
                [updatedTasks[index - 1], updatedTasks[index]];
            setTasks(updatedTasks);
        };
    };

    function moveDown(index) {
        if (index < tasks.length - 1) {
            const updatedTasks = [...tasks];
            [updatedTasks[index], updatedTasks[index + 1]] =
                [updatedTasks[index + 1], updatedTasks[index]];
            setTasks(updatedTasks);
        };
    };

    return (
        <>
            <div className={styles.todoList}>
                <h1>Todo list</h1>
                <div>
                    <Input type="text" placeholder="Create your first task" value={newTask}
                        event={(e) => { inputChange(e) }} className={styles.todoInput} />
                    <Button className={styles.addBtn} text="Add Task" func={() => { addTask() }} />
                </div>
                <ol>
                    {tasks.map((task, index) => {
                        return <li key={index} className={styles.task}>
                            <span className={styles.text}>{task}</span>
                            <menu>
                                <Button className={`${ styles.btn } ${ styles.deleteBtn }`} text="Delete"
                                    func={() => { deleteTask(index) }} />
                                <Button className={`${ styles.btn } ${ styles.moveUpBtn }`} text="👆" func={() => { moveUp(index) }} />
                                <Button className={`${ styles.btn } ${ styles.moveDownBtn }`} text="👇" func={() => { moveDown(index) }} />
                            </menu>
                        </li>
                    })}
                </ol>
            </div>
        </>
    );

};