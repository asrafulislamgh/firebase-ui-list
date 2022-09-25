import React from 'react';
import {AiOutlineArrowUp, AiOutlineArrowDown  } from 'react-icons/ai';
import {ImCross  } from 'react-icons/im';
// import Swal from 'sweetalert2';

const SingleItem = ({itemName, id}) => {
    const setIsUpdating = () => {
        
    }
    const handleDelete = () => {
        
    }
    const handleFinish = () => {
        
    }
    return (
        <div>
            <div className='flex justify-between bg-gray-100 shadow appearance-none border rounded w-full my-3 py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'>
                <div>
                  <p className='text-left'>{itemName?.length > 55 ? itemName.substring(0,55)+ "..." : itemName}</p>
                </div>
                <div className="flex gap-5">
                  <button onClick={()=> setIsUpdating(true)} className='text-gray-400 hover:text-gray-700' title='Up'  type="button"><AiOutlineArrowUp/></button>
                  <button onClick={handleFinish} className='text-gray-400 hover:text-gray-700' title='Down'  type="button"><AiOutlineArrowDown/></button>
                  <button onClick={()=> handleDelete(id)} className='text-red-500 hover:text-red-700' title='Delete'  type="button"><ImCross /></button>
                </div>
            </div>
        </div>
    );
}

export default SingleItem;
