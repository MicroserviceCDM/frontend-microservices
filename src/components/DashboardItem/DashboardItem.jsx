import './DashboardItem.css'
import { useState } from 'react';

function DashboardItem({ data, payment_method }){
    return(
        <div className='dashboard bg-white dark:bg-gray-600'>
            <div className="dashboard__item">
                {payment_method === data.article && <div class="w-3 h-3 bg-green-400 rounded-full m-1"></div>}
                {data.img}
                <p className='dashboard__item-article text-black dark:text-white'>{data.article}</p>
                <p className='dashboard__item-content text-black dark:text-white'>{data.content}</p>
                {/* <button className='text-black dark:text-white bg-white dark:bg-gray-600'>{data.button}</button> */}
                {data.button}
             </div>
        </div>
    )
}

export default DashboardItem;