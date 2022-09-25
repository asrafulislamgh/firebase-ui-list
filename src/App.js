import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase/firebase.initialize';
import {collection, doc, getDocs}  from "firebase/firestore";


function App() {
  const [items, setItems] = useState([]);
  const itemCollectionRef = collection(db, "item-collection");
  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(itemCollectionRef);
      setItems(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    getData();
  }, []);
  return (
    <div className="App">
      
      {items.map(item => {
        const {itemName, id} = item;
        return (
          <div key={id}>
            <p>Item: {itemName}</p>
          </div>
        );
      })}
      
       {/* {console.log(items[0].itemName)} */}
    </div>
  );
}

export default App;