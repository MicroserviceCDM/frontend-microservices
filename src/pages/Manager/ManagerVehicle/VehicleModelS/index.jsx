import React, { useState } from 'react';
import CarCard from "../../../../components/CarCard";
import '../../../../components/CarCard/CarCard.css';
import SortCarSideBar from "../../../../components/SortCarSideBar";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
function ManagerVehicleModelS () {
    const carcards = [
        {
            model: 'Model S',
            price: '$75,000',
            priceAfterDiscount: '$71,099',
            type: 'Model S Dual Motor All-Wheel',
            pricepermonth: '$1,113/month',
            image: <img src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY21P,$PPSW,$DV4W,$SLR1,$MTY05,$INPB0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&" alt="xe" className="card__img"/>,
            fig1: '375',
            fig2: '149',
            fig3: '3.1',
            feature: 'Autopilot',
            power: '1-year premium Connectivity Trial',
            mileodometer: '3,355',
            isAvailable: 'Available'
        },
        {
            model: 'Model S',
            price: '$75,000',
            priceAfterDiscount: '$71,099',
            type: 'Model S Dual Motor All-Wheel',
            pricepermonth: '$1,113/month',
            image: <img src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY19B,$PMNG,$DV4W,$MTY11,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&" alt="xe" className="card__img"/>,
            fig1: '375',
            fig2: '149',
            fig3: '3.1',
            feature: 'Autopilot',
            power: '1-year premium Connectivity Trial',
            mileodometer: '3,355',
            isAvailable: 'Available'
        },
        {
            model: 'Model S',
            price: '$75,000',
            priceAfterDiscount: '$71,099',
            type: 'Model S Dual Motor All-Wheel',
            pricepermonth: '$1,113/month',
            image: <img src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY20P,$PBSB,$DV4W,$MTY11,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&" alt="xe" className="card__img"/>,
            fig1: '375',
            fig2: '149',
            fig3: '3.1',
            feature: 'Autopilot',
            power: '1-year premium Connectivity Trial',
            mileodometer: '3,355',
            isAvailable: 'Available'
        },
        {
            model: 'Model S',
            price: '$75,000',
            priceAfterDiscount: '$71,099',
            type: 'Model S Dual Motor All-Wheel',
            pricepermonth: '$1,113/month',
            image: <img src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY21P,$PPMR,$DV4W,$SLR1,$MTY05,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&" alt="xe" className="card__img"/>,
            fig1: '375',
            fig2: '149',
            fig3: '3.1',
            feature: 'Autopilot',
            power: '1-year premium Connectivity Trial',
            mileodometer: '3,355',
            isAvailable: 'Available'
        },
        {
            model: 'Model S',
            price: '$75,000',
            priceAfterDiscount: '$71,099',
            type: 'Model S Dual Motor All-Wheel',
            pricepermonth: '$1,113/month',
            image: <img src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY21P,$PMNG,$DV4W,$SLR1,$MTY05,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&" alt="xe" className="card__img"/>,
            fig1: '375',
            fig2: '149',
            fig3: '3.1',
            feature: 'Autopilot',
            power: '1-year premium Connectivity Trial',
            mileodometer: '3,355',
            isAvailable: 'Available'
        },
        {
            model: 'Model S',
            price: '$75,000',
            priceAfterDiscount: '$71,099',
            type: 'Model S Dual Motor All-Wheel',
            pricepermonth: '$1,113/month',
            image: <img src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY21P,$PMNG,$DV4W,$SLR1,$MTY05,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&" alt="xe" className="card__img"/>,
            fig1: '375',
            fig2: '149',
            fig3: '3.1',
            feature: 'Autopilot',
            power: '1-year premium Connectivity Trial',
            mileodometer: '3,355',
            isAvailable: 'Available'
        }
    ]

    {/* button to add */}
    const [showModal, setShowModal] = useState(false);
    const [newCar, setNewCar] = useState({
        model: '',
        price: '',
        priceAfterDiscount: '',
        type: '',
        pricepermonth: '',
        image: '',
        fig1: '',
        fig2: '',
        fig3: '',
        feature: '',
        power: '',
        mileodometer: '',
        isAvailable: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
    };

    const handleAddCar = () => {
        // Create a new car object using the newCar state
        const newCarData = {
            model: newCar.model,
            price: newCar.price,
            priceAfterDiscount: newCar.priceAfterDiscount,
            type: newCar.type,
            pricepermonth: newCar.pricepermonth,
            image: newCar.image,
            fig1: newCar.fig1,
            fig2: newCar.fig2,
            fig3: newCar.fig3,
            feature: newCar.feature,
            power: newCar.power,
            mileodometer: newCar.mileodometer,
            isAvailable: newCar.isAvailable
        };

        // Add the new car to the list of cars
        const updatedCarList = [...carcards, newCarData];
        carcards(updatedCarList);       
        
        // Clear the input fields
        setNewCar({
            model: '',
            price: '',
            priceAfterDiscount: '',
            type: '',
            pricepermonth: '',
            image: '',
            fig1: '',
            fig2: '',
            fig3: '',
            feature: '',
            power: '',
            mileodometer: '',
            isAvailable: ''
        });

        // Close the modal after adding the new car
        setShowModal(false);
    };

    return (  
        <div className="container-flex">
            <div className="vehicle-models-sort">
                <SortCarSideBar />
            </div>
            <div>
                {/* Button to open the modal */}
                <Stack spacing={2} direction="row" className="float float-right">
                    <Button variant="outlined" onClick={() => setShowModal(true)}>Add New Car</Button>
                </Stack>
                <div className="vehicle-models-page">
                    <CarCard data={carcards[0]}/>
                    <CarCard data={carcards[1]}/>
                    <CarCard data={carcards[2]}/>
                    <CarCard data={carcards[3]}/>
                    <CarCard data={carcards[4]}/>
                    <CarCard data={carcards[5]}/>
                </div>
            </div>
            {/* Modal for adding a new car */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <h3>Add New Car</h3>
                        {/* Input fields for new car details */}
                        <input
                            type="text"
                            placeholder="Model"
                            name="model"
                            value={newCar.model}
                            onChange={handleInputChange}
                        />
                        {/* Add more input fields for other car details */}
                        <button onClick={handleAddCar}>Add Car</button>
                    </div>
                </div>
            )}

            
        </div>
    );
}

export default ManagerVehicleModelS;