import { useEffect, useState } from 'react';
import './App.css';
import db from './firebase/firebase.initialize';
import {collection, getDocs, addDoc}  from "firebase/firestore";
import Swal from 'sweetalert2'
import SingleItem from './components/SingleItem';


function App() {
  const [items, setItems] = useState([]);
  const [itemName, setItemName] = useState('');
  const itemCollectionRef = collection(db, "item-collection");

    const getData = async () => {
      const data = await getDocs(itemCollectionRef);
      setItems(data.docs.map(doc => ({...doc.data(), id: doc.id})))
    }
    useEffect(()=>{
      getData();
    },[]);

  const addToDatabase = async (event) => {
    event.preventDefault();
    await addDoc(itemCollectionRef, {itemName});
    getData();
    Swal.fire(
      'Good job!',
      'The entity is inserted successfully!',
      'success'
    )
    event.target.reset();
  }

  return (
    <div  className="bg-gradient-to-r from-cyan-500 to-blue-500 p-10 min-h-screen">
      <div className='container bg-white max-w-xl mx-auto p-6 rounded-lg'>
          
      {items.map((item, index) => {
        const {itemName, id} = item;
        return (
          <SingleItem key={id} itemName = {itemName} id = {id} getData={getData} index={index} items= {items} />
        );
      })}
      <form onSubmit={addToDatabase}  className='flex justify-between gap-2'>
            <input className='shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' type="text" name="update" id="" placeholder='Insert your item' onChange={e => setItemName(e.target.value)}/>
            <button type='submit' className='rounded bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white'>Add</button>
          </form>
      </div>
    </div>
  );
}

export default App;