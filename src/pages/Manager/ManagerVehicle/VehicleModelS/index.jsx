import React, { useState } from 'react';
import CarCard from "../../../../components/CarCard";
import SortCarSideBar from "../../../../components/SortCarSideBar";
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

function ManagerVehicleModelS() {
  const [carcards, setCarCards] = useState([ // Use state to manage the carcards array
    {
      model: 'Model S',
      price: '$75,000',
      priceAfterDiscount: '$71,099',
      type: 'Model S Dual Motor All-Wheel',
      pricepermonth: '$1,113/month',
      image: (
        <img
          src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY21P,$PPSW,$DV4W,$SLR1,$MTY05,$INPB0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&"
          alt="xe"
          className="w-full h-44 object-cover rounded-t-lg"
        />
      ),
      fig1: '375',
      fig2: '149',
      fig3: '3.1',
      feature: 'Autopilot',
      power: '1-year premium Connectivity Trial',
      mileodometer: '3,355',
      isAvailable: 'Available',
    },
    // ... other car data
    {
      model: 'Model S',
      price: '$75,000',
      priceAfterDiscount: '$71,099',
      type: 'Model S Dual Motor All-Wheel',
      pricepermonth: '$1,113/month',
      image: (
        <img
          src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY19B,$PMNG,$DV4W,$MTY11,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&"
          alt="xe"
          className="w-full h-44 object-cover rounded-t-lg"
        />
      ),
      fig1: '375',
      fig2: '149',
      fig3: '3.1',
      feature: 'Autopilot',
      power: '1-year premium Connectivity Trial',
      mileodometer: '3,355',
      isAvailable: 'Available',
    },
    {
      model: 'Model S',
      price: '$75,000',
      priceAfterDiscount: '$71,099',
      type: 'Model S Dual Motor All-Wheel',
      pricepermonth: '$1,113/month',
      image: (
        <img
          src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY20P,$PBSB,$DV4W,$MTY11,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&"
          alt="xe"
          className="w-full h-44 object-cover rounded-t-lg"
        />
      ),
      fig1: '375',
      fig2: '149',
      fig3: '3.1',
      feature: 'Autopilot',
      power: '1-year premium Connectivity Trial',
      mileodometer: '3,355',
      isAvailable: 'Available',
    },
    {
      model: 'Model S',
      price: '$75,000',
      priceAfterDiscount: '$71,099',
      type: 'Model S Dual Motor All-Wheel',
      pricepermonth: '$1,113/month',
      image: (
        <img
          src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY21P,$PPMR,$DV4W,$SLR1,$MTY05,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&"
          alt="xe"
          className="w-full h-44 object-cover rounded-t-lg"
        />
      ),
      fig1: '375',
      fig2: '149',
      fig3: '3.1',
      feature: 'Autopilot',
      power: '1-year premium Connectivity Trial',
      mileodometer: '3,355',
      isAvailable: 'Available',
    },
    {
      model: 'Model S',
      price: '$75,000',
      priceAfterDiscount: '$71,099',
      type: 'Model S Dual Motor All-Wheel',
      pricepermonth: '$1,113/month',
      image: (
        <img
          src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY21P,$PMNG,$DV4W,$SLR1,$MTY05,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&"
          alt="xe"
          className="w-full h-44 object-cover rounded-t-lg"
        />
      ),
      fig1: '375',
      fig2: '149',
      fig3: '3.1',
      feature: 'Autopilot',
      power: '1-year premium Connectivity Trial',
      mileodometer: '3,355',
      isAvailable: 'Available',
    },
    {
      model: 'Model S',
      price: '$75,000',
      priceAfterDiscount: '$71,099',
      type: 'Model S Dual Motor All-Wheel',
      pricepermonth: '$1,113/month',
      image: (
        <img
          src="https://static-assets.tesla.com/configurator/compositor?context=design_studio_2&options=$WY21P,$PMNG,$DV4W,$SLR1,$MTY05,$INPW0&view=STUD_3QTR&model=my&size=1441&bkba_opt=1&crop=1300,500,300,300&"
          alt="xe"
          className="w-full h-44 object-cover rounded-t-lg"
        />
      ),
      fig1: '375',
      fig2: '149',
      fig3: '3.1',
      feature: 'Autopilot',
      power: '1-year premium Connectivity Trial',
      mileodometer: '3,355',
      isAvailable: 'Available',
    },
  ]);

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
    isAvailable: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewCar((prevCar) => ({ ...prevCar, [name]: value }));
  };

  const handleAddCar = () => {
    const newCarData = {
      ...newCar,
      // Convert image URL to an image element if the 'image' field contains a URL
      image: newCar.image ? (
        <img
          src={newCar.image}
          alt="New Car"
          className="w-full h-44 object-cover rounded-t-lg"
        />
      ) : null,
    };

    setCarCards((prevCars) => [...prevCars, newCarData]);

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
      isAvailable: '',
    });

    setShowModal(false);
  };

  return (
    <div className="flex">
      <div className="w-1/4">
        <SortCarSideBar />
      </div>
      <div className="w-3/4 p-4">
        <Stack direction="row" spacing={2} className="mb-4 justify-end">
          <Button variant="outlined" onClick={() => setShowModal(true)}>
            Add New Car
          </Button>
        </Stack>
        <div className="flex flex-wrap">
          {carcards.map((car, index) => (
            <div key={index} className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 p-2">
              <CarCard data={car} />
            </div>
          ))}
        </div>
      </div>

      {/* Modal for adding a new car */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
          <div className="bg-white p-5 rounded-lg w-1/2 relative">
            <span
              className="absolute top-2 right-2 text-2xl cursor-pointer"
              onClick={() => setShowModal(false)}
            >
              &times;
            </span>
            <h3 className="text-xl mb-4">Add New Car</h3>
            {/* Input fields for new car details */}
            <input
              type="text"
              placeholder="Model"
              name="model"
              value={newCar.model}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Price"
              name="price"
              value={newCar.price}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            {/* Add more input fields for other car details */}
            <input
              type="text"
              placeholder="Price After Discount"
              name="priceAfterDiscount"
              value={newCar.priceAfterDiscount}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Type"
              name="type"
              value={newCar.type}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Price per month"
              name="pricepermonth"
              value={newCar.pricepermonth}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Image URL"
              name="image"
              value={newCar.image}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Range"
              name="fig1"
              value={newCar.fig1}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Top Speed"
              name="fig2"
              value={newCar.fig2}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="0 - 60 mph"
              name="fig3"
              value={newCar.fig3}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Feature"
              name="feature"
              value={newCar.feature}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Power"
              name="power"
              value={newCar.power}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Mile Odometer"
              name="mileodometer"
              value={newCar.mileodometer}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <input
              type="text"
              placeholder="Is Available"
              name="isAvailable"
              value={newCar.isAvailable}
              onChange={handleInputChange}
              className="mb-2 p-2 w-full border rounded"
            />
            <button onClick={handleAddCar} className="p-2 bg-blue-500 text-white rounded">
              Add Car
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ManagerVehicleModelS;