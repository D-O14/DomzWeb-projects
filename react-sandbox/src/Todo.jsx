import { useState } from "react";
import Button from "./Button/Button";
import Input from "./Input";

export default function Todo() {
    const [tasks, setTasks] = useState(["Eat Breakfast", "Take a shower", "Walk the dog"]);
    const [newTask, setNewTask] = useState("");

    function inputChange(e) { setNewTask(e.target.value) };

    function addTask(index) {
        if (newTask.trim() !== "") {
            setTasks(prevTask => [...tasks, newTask]);
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
            <div className="todo-list">
                <h1>Todo list</h1>
                <div>
                    <Input type="text" placeholder="Create your first task" value={newTask}
                        event={(e) => { inputChange(e) }} className="todo-input"/>
                    <Button className="add-btn" text="Add Task" func={() => { addTask() }} />
                </div>
                <ol>
                    {tasks.map((task, index) => {
                        return <li key={index} className="task">
                            <span className="text">{task}</span>
                            <menu>
                                <Button className="btn delete-btn" text="Delete"
                                    func={() => { deleteTask(index) }} />
                                <Button className="btn moveUp-btn" text="👆" func={() => { moveUp(index) }} />
                                <Button className="btn moveDown-btn" text="👇" func={() => { moveDown(index) }} />
                            </menu>
                        </li>
                    })}
                </ol>
            </div>
        </>
    );

};