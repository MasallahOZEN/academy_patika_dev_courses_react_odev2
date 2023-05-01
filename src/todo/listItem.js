export function ListItem({ index,name, status,completedItem,removeItem }) {
    if(status >-1)
    {
        if (status === 1) {
            return  <li key={index} className="completed">
                  <div className="view">
                      <input className="toggle" type="checkbox"  onClick={completedItem}/>
                      <label>{name}</label>
                      {/* <button className="destroy" onClick={removeItem}></button> */}
                  </div>
              </li>;
          }
        if (status === -1) {
            return  <li key={index} >
                <div className="view">
                    <label>{name}</label>
                </div>
            </li>;
          }
          return  <li key={index} >
                  <div className="view">
                      <input className="toggle" type="checkbox"  onClick={completedItem}/>
                      <label>{name}</label>
                      <button className="destroy" onClick={removeItem}></button>
                  </div>
              </li>;
    }
    return null;
    
  }
