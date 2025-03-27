import React, {useEffect, useState} from "react";
import axios from "axios";

const API_URL = "http://localhost:5002/api/items"; 

function App () {
  const [items, setItems] = useState([]); 
  const [newItem, setNewItem] = useState({
    Subject_Description: "", 
    Day: "",
    Time: "",
    Room_Number: ""
  });

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => setItems(response.data))
      .catch((error) =>
        console.error("Error fetching items:", error)
      );
  }, []);

  const addItem = () => {
    axios
      .post(API_URL, newItem) 
      .then((response) => setItems([...items, response.data]))
      .catch((error) =>
        console.error("Error Adding items:", error)
      );
  };

  const updateItem = (id, updatedItem) => { 
    axios
      .put('${API_URL}/${id}', updatedItem) 
      .then((response) => {
        setItems(
          items.map((item) => (item.id === id ? response.data : item))
        );
      })
      .catch((error) =>
        console.error("Error updating item:", error)
      );
  };

  const deleteItem = (id) => {
    axios
      .delete('${API_URL}/${id}')
      .then(() => {
        setItems(items.filter((item) => item.id !== id));
      })
      .catch((error) =>
        console.error("Error deleting item:", error)
      );
  };

  return (
    <div>
      <table>
      <thead>
          <tr>
            <th>Subject Description</th>
            <th>Day</th>
            <th>Time</th>
            <th>Room Number</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <input
                type="text"
                value={newItem.Subject_Description}
                onChange={(e) =>
                  setNewItem({
                    ...newItem,
                    Subject_Description: e.target.value,
                  })
                }
                placeholder="Subject Description"
              />
              </td>
              <td>
              <input
                type="text"
                value={newItem.Day}
                onChange={(e) =>
                  setNewItem({ ...newItem, Day: e.target.value })
                }
                placeholder="Day"
              />
              </td>
              <td>
              <input
                type="text"
                value={newItem.Time}
                onChange={(e) =>
                  setNewItem({ ...newItem, Time: e.target.value })
                }
                placeholder="Time"
              />
              </td>
              <td>
              <input
                type="text"
                value={newItem.Room_Number}
                onChange={(e) =>
                  setNewItem({ ...newItem, Room_Number: e.target.value })
                }
                placeholder="Room Number"
              />
            </td>.
            
              <button onClick={addItem}>Add Item</button>
            
          </tr>
        </tbody>
      </table>
    <table>
        <tbody>
          {items.map((item) => (
            <tr key={item.id}>
              <td>
                <input
                  type="text"
                  id={`Subject_Description-${item.id}`}
                  value={item.Subject_Description}
                  onChange={(e) =>
                    updateItem(item.id, {
                      ...item,
                      Subject_Description: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  id={`Day-${item.id}`}
                  value={item.Day}
                  onChange={(e) =>
                    updateItem(item.id, { ...item, Day: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  id={`Time-${item.id}`}
                  value={item.Time}
                  onChange={(e) =>
                    updateItem(item.id, { ...item, Time: e.target.value })
                  }
                />
              </td>
              <td>
                <input
                  type="text"
                  id={`Room_Number-${item.id}`}
                  value={item.Room_Number}
                  onChange={(e) =>
                    updateItem(item.id, {
                      ...item,
                      Room_Number: e.target.value,
                    })
                  }
                />
              </td>
              <td>
                <button onClick={() => deleteItem(item.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

    </div>
  );
}

export default App;



