import React from "react";
import "./modal.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCaretDown, faClose } from "@fortawesome/free-solid-svg-icons";

function Modal({ setOpenModal, data }) {
  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <span className="titleCloseBtn">
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <FontAwesomeIcon className="text-black" icon={faClose} />
          </button>
        </span>
        <div className="flex">
          <div className="card-info mt-4">
            <div className="flex mt-4">
              <label htmlFor="cardnum" className="modal-label">
                Card Number
              </label>
              <input type="text" className="modal-input ml-6" />
            </div>
            <div className="flex mt-4">
              <label htmlFor="cardnum" className="modal-label">
                Name On Card
              </label>
              <input type="text" className="modal-input  ml-6" />
            </div>
            <div className="flex mt-4">
              <label htmlFor="cardnum" className="modal-label">
                Expiration Date
              </label>
              <div style={{ flex: 3 }} className="flex">
                <select
                  name="month"
                  id=""
                  className="modal-input mr-8"
                  style={{ marginLeft: 12 }}
                >
                  <option value="1">01</option>
                  <option value="1">02</option>
                  <option value="1">03</option>
                  <option value="1">04</option>
                  <option value="1">05</option>
                  <option value="1">06</option>
                  <option value="1">07</option>
                  <option value="1">08</option>
                  <option value="1">09</option>
                  <option value="1">10</option>
                  <option value="1">11</option>
                  <option value="1">12</option>
                </select>
                <select name="year" id="" className="modal-input mr-48">
                  <option value="1">23</option>
                  <option value="1">24</option>
                  <option value="1">25</option>
                  <option value="1">26</option>
                  <option value="1">27</option>
                  <option value="1">28</option>
                  <option value="1">29</option>
                  <option value="1">30</option>
                  <option value="1">31</option>
                  <option value="1">32</option>
                  <option value="1">33</option>
                  <option value="1">34</option>
                  <option value="1">35</option>
                  <option value="1">36</option>
                  <option value="1">37</option>
                  <option value="1">38</option>
                  <option value="1">39</option>
                  <option value="1">40</option>
                </select>
              </div>
            </div>
            <div className="flex mt-4">
              <label htmlFor="cardnum" className="modal-label">
                CVV
              </label>
              <input type="text" className="modal-input  ml-6" />
            </div>
            <div className="flex items-center mt-4">
              <div style={{ flex: 1 }}></div>
              <div style={{ flex: 3 }} className="items-center">
                <input
                  type="checkbox"
                  className="modal-input w-4 h-4"
                  style={{ marginLeft: 12 }}
                  value={true}
                ></input>
                <span className="ml-2">Set as default payment method</span>
              </div>
            </div>

            <div className="flex mt-6 ml-4">
              <div style={{ flex: 1 }}></div>
              <div style={{ flex: 3 }}>
                <button className="p-3 font-semibold text-white bg-black w-64 rounded-xl hover:bg-transparent hover:border-2 hover:border-black hover:text-black active:bg-gray-300">
                  Add This Card
                </button>
              </div>
            </div>
          </div>
          <div
            style={{ width: 1, height: "100%", backgroundColor: "black" }}
            className="ml-8"
          ></div>

          <div className="other-info">
            <p className="mt-6 ml-8">
              CDM system only accept for major credit Visa and Master Card
            </p>
            <div className="flex">
              <img
                src="https://res.cloudinary.com/droondbdu/image/upload/v1701763296/5982778_Screen_Shot_2022-05-11_at_09_fo5sll.webp"
                alt="des"
                style={{ width: 133, height: 58 }}
                className="ml-6 mt-6"
              />
              <img
                src="https://res.cloudinary.com/droondbdu/image/upload/v1701763523/download_4_ew6v6d.png"
                alt="des"
                style={{ width: 128, height: 58 }}
                className="ml-2 mt-6"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Modal;
