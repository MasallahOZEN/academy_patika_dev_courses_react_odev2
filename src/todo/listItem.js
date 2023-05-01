export function ListItem({ index,name, status }) {
    
    if (status === 1) {
      return  <li key={index} className="completed">
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>{name}</label>
                <button className="destroy"></button>
            </div>
        </li>;
    }
    return  <li key={index} >
            <div className="view">
                <input className="toggle" type="checkbox" />
                <label>{name}</label>
                <button className="destroy"></button>
            </div>
        </li>;
  }
