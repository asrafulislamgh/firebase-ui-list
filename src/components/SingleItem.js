import React from 'react';
import {AiOutlineArrowUp, AiOutlineArrowDown  } from 'react-icons/ai';
import {ImCross  } from 'react-icons/im';
import {doc, updateDoc, deleteDoc}  from "firebase/firestore";
import Swal from 'sweetalert2'
import db from '../firebase/firebase.initialize';

const SingleItem = ({itemName, id, getData, index, items}) => {

    // const updatingLevel = async (indexValue) => {
    //     const temp = {...items[index]};
    //     const query = doc(db, "item-collection", id);
    //     const newName1 = items[indexValue].itemName;
    //     const updatedItem1 = {itemName: newName1};
    //     await updateDoc(query, updatedItem1);
        
    //     const query2 = doc(db, "item-collection", items[indexValue].id);
    //     const newName2 = temp.itemName;
    //     const updatedItem2 = {itemName: newName2};
    //     await updateDoc(query2, updatedItem2);
    // }

    const updatingAlert = () => {
        let timerInterval
        Swal.fire({
        title: 'Data is updating!',
        timer: 2000,
        timerProgressBar: true,
        didOpen: () => {
            Swal.showLoading()
            timerInterval = setInterval(() => {
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
        }
        }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
        }
        })
    }
    const handleLevelUp = async (indexValue) => {
        updatingAlert();
        const temp = {...items[index]};
        const query = doc(db, "item-collection", id);
        const newName1 = items[index-1].itemName;
        const updatedItem1 = {itemName: newName1};
        await updateDoc(query, updatedItem1);
        
        const query2 = doc(db, "item-collection", items[index-1].id);
        const newName2 = temp.itemName;
        const updatedItem2 = {itemName: newName2};
        await updateDoc(query2, updatedItem2);
        // updatingLevel(indexValue);
        
        getData();
    }
    const handleLevelDown = async (indexValue) => {
        updatingAlert();
        const temp = {...items[index]};
        const query = doc(db, "item-collection", id);
        const newName1 = items[index+1].itemName;
        const updatedItem1 = {itemName: newName1};
        await updateDoc(query, updatedItem1);
        
        const query2 = doc(db, "item-collection", items[index+1].id);
        const newName2 = temp.itemName;
        const updatedItem2 = {itemName: newName2};
        await updateDoc(query2, updatedItem2);
        // updatingLevel(indexValue);
        getData();
        
    }
    const handleDelete = async (id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        })
        .then(async(result) => {
            if (result.isConfirmed) {
                const query = doc(db, "item-collection", id);
                await deleteDoc(query);
                getData();
            Swal.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success'
            )
            }
        })
    }
    // const handleDelete = async (id) => {
    //     const query = doc(db, "item-collection", id);
    //     await deleteDoc(query);
    //     getData();
    // }
    return (
        <div>
            <div className='flex justify-between bg-gray-100 shadow appearance-none border rounded w-full my-3 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                <div>
                  <p className='text-left'>{itemName?.length > 55 ? itemName.substring(0,55)+ "..." : itemName}</p>
                </div>
                <div className="flex gap-5">
                  <button onClick={()=> handleLevelUp(index-1)} className='text-blue-500 hover:text-blue-700 disabled:opacity-30' title='Up'  type="button" disabled = {(index===0 ? true : false) }><AiOutlineArrowUp/></button>
                  <button onClick={()=> handleLevelDown(index+1)} className='text-blue-500 hover:text-blue-700 disabled:opacity-30' title='Down'  type="button"  disabled = {(index === items.length-1) ? true : false}><AiOutlineArrowDown/></button>
                  <button onClick={()=> handleDelete(id)} className='text-red-500 hover:text-red-700' title='Delete'  type="button"><ImCross /></button>
                </div>
            </div>
        </div>
    );
}

export default SingleItem;
