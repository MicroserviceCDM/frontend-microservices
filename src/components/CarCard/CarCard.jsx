import { faBatteryHalf, faCar, faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import './CarCard.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useNavigate } from 'react-router-dom';

function CarCard({data}) {
    const usenavigate = useNavigate("");
    async function viewDetail() {
        usenavigate(`/vehicledetail/${data.id}`)
    }
    return ( 
        <div className="card xl:m-12 mx-0 mt-4 dark:bg-gray-200" >
            <div className='flex'>
                <p className='card__model dark:text-slate-800'>{data.model}</p>
                <p style={{marginTop: 10, marginRight: 20}}>
                    <span className='card__price dark:text-slate-800'>{data.priceAfterDiscount}</span>
                    <span className='card__price-throught dark:text-slate-800'>{data.price}</span>
                </p>
            </div>
            <div className='flex'>
                <p className='card__type dark:text-slate-800'>{data.type}</p>
                <p className='card__ppmonth dark:text-slate-800'>{data.pricepermonth}</p>
            </div>
            <p className='card__mile dark:text-slate-800'>{data.mileodometer}  mile odometer</p>
            <div>
                {data.image}
            </div>
            <div className='flex' style={{marginTop: 10}}>
                <div className='figure-container'>
                    <div className='flex flex-col justify-center items-center flex-1'> 
                        <p className='dark:text-slate-800'><span className='card__figure dark:text-slate-800'>{data.fig1}</span>mi</p>
                        <p className='card__current dark:text-slate-800'>Range (EPA est.)</p>
                    </div>
                    <div className="card__line dark:bg-slate-800"></div> 
                </div>
                <div className='figure-container'> 
                    <span className='flex flex-col justify-center items-center flex-1'>
                        <p className='dark:text-slate-800'><span className='card__figure dark:text-slate-800'>{data.fig2}</span>mph</p>
                        <p className='card__current dark:text-slate-800'>Top Speed</p>
                    </span>
                    <div className="card__line dark:bg-slate-800"></div>
                </div>
                <div className='figure-container'>
                    <span className='flex flex-col justify-center items-center flex-1'>
                        <p className='dark:text-slate-800'><span className='card__figure dark:text-slate-800'>{data.fig3}</span>s</p>
                        <p className='card__current dark:text-slate-800'>0 - 60 mph</p>
                    </span>
                </div>
            </div>
            <br />
            <div className='flex'>
                <div className='flex-1 py-4'></div>
                    <button style={{flex: 10}} className='card__view-detail-button py-2 bg-black hover:bg-gray-800 dark:bg-blue-500 dark:hover:bg-blue-700' onClick={viewDetail}>View Details</button>
                <div className='flex-1'></div>
            </div>
            
            <div className='flex float-left ml-8 justify-center items-center mt-4' >
                    <FontAwesomeIcon icon={faCar} className='dark:text-slate-800'/>
                    <p className='ml-2 dark:text-slate-800'>{data.feature}</p>
            </div>
            <div className='flex justify-center items-center mt-4'>
                <FontAwesomeIcon icon={faBatteryHalf} className='float-top ml-2 dark:text-slate-800'/>
                <p className='ml-2 dark:text-slate-800'>{data.power}</p>
            </div>
            <div className='flex ml-8 mt-4' style={{justifyContent: 'center', alignItems: 'center', float: 'left'}}>
                <FontAwesomeIcon icon={faCircleCheck} style={{float: top}} className='dark:text-slate-800'/>
                <p className='ml-2 dark:text-slate-800'>{data.isAvailable}</p>
            </div>
        </div>
     );
}

export default CarCard;