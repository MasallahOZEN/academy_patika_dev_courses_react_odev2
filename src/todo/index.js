import {useState,useEffect} from 'react'
import './todoapp.css';
import { v4 as uuidv4 } from "uuid";
import {ListItem} from './listItem'

const StatusTypes = Object.freeze({
    NewItem : 0,
    Completed : 1,
    Deleted : -1
  });

const todoItem={name:'',status:StatusTypes.NewItem};
const initForm=todoItem;
const items=[
    {
        name:"Learn JavaScript",
        id:uuidv4(),
        status:StatusTypes.Completed
    },{
        name:"Learn React",
        id:uuidv4(),
        status:StatusTypes.NewItem
    },{
        name:"Have a life!",
        id:uuidv4(),
        status:StatusTypes.NewItem
    }
];

function TodoApp(){
    const [lastFilterParam,setLastFilterParam]=useState({id:null,status:null});
    const [form,setForm]=useState(initForm);
    const [todoItems,setTodoItems]=useState(items);
    const [filteredItems,setFilteredItems]=useState(items);
    
    useEffect(()=>{
        console.log("form:",form);
    },[form]);

    useEffect(()=>{
        console.log("filteredItems:",filteredItems);
    },[filteredItems]);

    const onChangeInput=(e)=>{
        setForm({...form,[e.target.name]:e.target.value})
    }

    const handleKeyDown = (event) => {        
        if (event.key === "Enter") {
            handleAdd(event);
        }
    };

    const handleAdd = (e) => {
        debugger;
        todoItems.push({ name:form.name, id: uuidv4(),status:StatusTypes.NewItem });

        //SOR: setTodoItems(todoItems); neden güncellenmedi ! listeye push çalıştı sadece
        const newList = todoItems.concat({ name:form.name, id: uuidv4(),status:StatusTypes.NewItem });

        setTodoItems(todoItems);

        //setTodoItems([...todoItems,{ name:form.name, id: uuidv4(),status:StatusTypes.NewItem }]);

        filterItems(lastFilterParam);

        setForm(todoItem);
        e.preventDefault();
    };

    const removeItemHandler=(e,item)=>{
        item.status=StatusTypes.Deleted;

        filterItems(lastFilterParam);
    }

    const completedItemHandler=(e,item)=>{
        item.status=StatusTypes.Completed;

        filterItems(lastFilterParam);
    }

    const filterItems=({id,status})=>{
        debugger;
        setLastFilterParam({id:id,status:status});

        let idIsNullOrEmpty = (id ===null || id===undefined || id==='');
        let statusIsNullOrEmpty = (status ===null || status===undefined || status==='');

        var filteredItemList = todoItems.filter((f)=>{
            
            if(statusIsNullOrEmpty && idIsNullOrEmpty){
                return (f.status === StatusTypes.NewItem || f.status === StatusTypes.Completed)
            }

            if (
                (
                    (
                        (idIsNullOrEmpty)
                    )
                    ||                
                    (
                        idIsNullOrEmpty === false && f.id === id
                    ) 
                )
                &&  f.status === status
            ) 
                return true;

            return false;
        });

        setFilteredItems(filteredItemList);
    }

    const clearCompleted=(e)=>{
        debugger;
        
        var clearedItemList = todoItems.map((item)=>{
            
            if(item.status === StatusTypes.Completed) item.status = StatusTypes.NewItem;

            return item;
        });
        
        filterItems(lastFilterParam);
    }

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
                    filteredItems.map((item,index)=>{
                        return <ListItem key={index} name={item.name} status ={item.status} completedItem={(e)=>{completedItemHandler(e,item)}} removeItem={(e)=>{removeItemHandler(e,item)}}/>
                    })
                }
            </ul>
        </div>

        <footer className="footer">
            <span className="todo-count">
                <strong>{filteredItems.length}</strong>
                items left
            </span>

            <ul className="filters">
                <li>
                    <a href="#/" onClick={()=>filterItems({status:null,id:null})} className="selected">All</a>
                </li>
                <li>
                    <a href="#/" onClick={()=>filterItems({status:StatusTypes.NewItem})}>Active</a>
                </li>
                <li>
                    <a href="#/" onClick={()=>filterItems({status:StatusTypes.Completed})}>Completed</a>
                </li>
            </ul>

            <button className="clear-completed" onClick={clearCompleted}>
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