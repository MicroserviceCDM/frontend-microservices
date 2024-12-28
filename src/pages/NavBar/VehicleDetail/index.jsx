import { useParams } from 'react-router-dom'
import React, { useEffect, useState } from "react";
import './vehicle.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretLeft, faCaretRight, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { cdmApi } from '../../../misc/cdmApi';
import { useNavigate } from 'react-router-dom';

function VehicleDetail() {
   const navigate = useNavigate();
   const params = useParams();
   const [data, setData] = useState([]);

   const url = "http://localhost:9296/api/v1/products/getCarById/" + params.id;
   const fetchInfo = async () => {
      try {
         const res = await cdmApi.getCarById(params.id);
         setData(res.data);
      } catch (error) {
         console.error("Error fetching data:", error);
      }
   }

   useEffect(() => {
      fetchInfo();
   }, []); 
   
  
    return ( 
        <div className='mycontainer'>
             <div className='left-panel flex flex-col'>
                  <div className='img-container' style={{flex: 10}}>
                           <FontAwesomeIcon icon={faChevronLeft} className='left-button' />
                           <FontAwesomeIcon icon={faChevronRight} className='right-button' />
                           <img src={data.imgSrc} alt="" className='img' />
                  </div>
                  <div className='price-card flex flex-1'>
                     <div className='flex-1 flex'>
                        <h1 className='p-6'><span className='text-lg text-center font-semibold'>{data.orgPrice} </span>Original Price</h1>
                     </div>
                     <div className='flex'><div className='line'></div></div>
                     <div className=' flex-1'>
                        <h1 className='p-6'><span className='text-lg text-center font-semibold'>{data.disPrice} </span>After Probable Saving</h1>
                     </div>
                  </div>
               </div>
               <div className='right-panel'>
                     <div className='banner-infor'>
                           <h1 className='font-bold'>Warranty Information</h1>
                           <br />
                           <h1 className='font-semibold text-base'>1. New Vehicle Limited Warranty</h1>
                           <p className='text-sm font-light'>Your vehicle is protected by a New Vehicle Limited Warranty, which includes the Basic Vehicle Limited Warranty, the Supplemental Restraint System Limited Warranty and the Battery and Drive Unit Limited Warranty.</p>
                           <br></br>
                           <h1 className='font-semibold text-base'>2. Basic Vehicle Limited Warranty</h1>
                           <p className='text-sm font-light'>The Basic Vehicle Limited Warranty covers your vehicle for 4 years or 50,000 miles, whichever comes first.</p>
                           <br></br>
                           <a href="https://www.tesla.com/support/vehicle-warranty" className='font-light text-base underline'>See Details...</a>
                     </div>
                     <div>
                           <h1 className='mt-4 text-2xl font-bold text-center'>{data.model}</h1>
                           <h1 className='mt-2 text-sm font-semibold text-center'>{data.trim}</h1>
                           <br />
                     </div>
                     <div className='flex p-8'>
                              <div className='figure-container'>
                                    <div className='flex flex-col justify-center items-center flex-1'> 
                                          <p><span className='card__figure'>{data.range}</span>mi</p>
                                          <p className='card__current'>Range (EPA est.)</p>
                                    </div>
                              </div>
                              <div className='figure-container'> 
                                 <span className='flex flex-col justify-center items-center flex-1'>
                                       <p><span className='card__figure'>{data.topSpeed}</span>mph</p>
                                       <p className='card__current'>Top Speed</p>
                                 </span>
                              </div>
                              <div className='figure-container'>
                                 <span className='flex flex-col justify-center items-center flex-1'>
                                       <p><span className='card__figure'>{data.timeToReach}</span>s</p>
                                       <p className='card__current'>0 - 60 mph</p>
                                 </span>
                              </div>
                     </div>
                     <h1 className='mt-4 text-2xl font-bold text-center'>Key Features</h1>
                     <ul className='mt-8'>
                        <li>Solid Black Paint</li>
                        <li>20 Induction Wheels</li>
                        <li>Black and White Premium Interior</li>
                        <li>Autopilot</li>
                        <li>Five Seat Interior</li>
                        <li>Tow Hitch</li>
                        <li>30-Day Premium Connectivity Trial</li>
                     </ul>
                     <h1 className='mt-4 text-2xl font-bold text-center mb-8'>Make Appointment</h1>
                     {/* <label className='font-bold mt-2 mylabel' htmlFor="appdate">Choose your free day</label>
                     <p className='text-xs italic note'>You can submit multiple requests, we consider the latest request as your final choice.</p>

                     <input name="appdate"type="date" className='date-input'/> */}
                     <button className='mt-4 mb-16 mybutton' onClick={()=>navigate("/customerhome/bookappointment")}>Make</button>
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />
                     <br />

               </div>
        </div>
     );
}

export default VehicleDetail;