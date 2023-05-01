import {useState,useEffect} from 'react'
import './todoapp.css';
import { v4 as uuidv4 } from "uuid";
import {ListItem} from './listItem'

const todoItem={name:'',status:0};
const initForm=todoItem;
const items=[
    {
        name:"Learn JavaScript",
        id:uuidv4(),
        status:1
    },{
        name:"Learn React",
        id:uuidv4(),
        status:0
    },{
        name:"Have a life!",
        id:uuidv4(),
        status:0
    }
];



function TodoApp(){
    const [form,setForm]=useState(initForm);
    const [todoItems,setTodoItems]=useState(items);
    
    useEffect(()=>{
        console.log("form:",form);
    },[form]);

    const onChangeInput=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
      }

    const handleKeyDown = (event) => {        
        if (event.key === "Enter") {
            handleAdd(event);
        }
    };

    const handleAdd = (e) => {
        setTodoItems([...todoItems,{ name:form.name, id: uuidv4(),status:0 }]);
        setForm(todoItem);

        e.preventDefault();
    };

    return (<>
    <div className="todoapp">
        <header className="header">
            <h1>todos ({todoItems.length})</h1>
            <form>
                <input className="new-todo" name="name" value={form.name} onChange={onChangeInput} onKeyDown={handleKeyDown} placeholder="What needs to be done?" autoFocus />
            </form>
        </header>	
        <div className="main">
            <input className="toggle-all" id="chk-toggle-all" type="checkbox" />
            <label htmlFor="chk-toggle-all">
                Mark all as complete
            </label>

            <ul className="todo-list">
                {
                    todoItems.map((item,index)=>{
                        return <ListItem key={index} name={item.name} status ={item.status} />
                    })
                }
            </ul>
        </div>

        <footer className="footer">
            <span className="todo-count">
                <strong>2</strong>
                items left
            </span>

            <ul className="filters">
                <li>
                    <a href="#/" className="selected">All</a>
                </li>
                <li>
                    <a href="#/">Active</a>
                </li>
                <li>
                    <a href="#/">Completed</a>
                </li>
            </ul>

            <button className="clear-completed">
                Clear completed
            </button>
        </footer>
    </div>

    <footer className="info">
        <p>Click to edit a todo</p>
        <p>Created by <a href="https://d12n.me/">Dmitry Sharabin</a></p>
        <p>Part of <a href="http://todomvc.com">TodoMVC</a></p>
    </footer>
    </>
    )
}
export default TodoApp;