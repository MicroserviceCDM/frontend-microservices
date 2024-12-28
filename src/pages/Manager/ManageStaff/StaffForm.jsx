import React, { useEffect } from 'react'
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';


const StaffModalForm = (props) => {
  
  //Form
  const [formState, setFormState] = React.useState( 
    props.defaultValues || {
      name: '',
      email: '',
      phone_number: '',
      address:'',
      avatar: '',
  });


  //Image
  const inputRef = React.useRef(null);
  const [formImage, setFormImage] = React.useState(formState.avatar);
  const handleImageChange = (e) => {
    setFormState({...formState, avatar: e.target.files[0]});
    setFormImage(URL.createObjectURL(e.target.files[0]));
  }




  const handleChange = (e) => {
    setFormState({...formState, [e.target.name]: e.target.value});
  }

  const [errors, setErrors] = React.useState();

  const validateFrom = () => {
    if(formState.trim && formState.description && formState.price && formState.model && formState.status){
      setErrors(""); 
      return true;
      } 
    else{
      let errorFields = [];
      for(const [key, value] of Object.entries(formState)){
        if(!value) 
          errorFields.push(key);
      }
      setErrors(errorFields.join(', '));
      return false;
    }
  };
 
  const handleSubmitForm = (e) => {
    e.preventDefault();

    //if(!validateFrom()) return;
    props.onSubmit(formState);

  }
  return (
    <div className="flex fixed z-10 left-0 top-0 w-full h-full bg-black/80 modal-container" 
         onClick={(e) => {
            if(e.target.classList.contains('modal-container')) props.closeModel();
         }}
    >
      
        <form onSubmit={handleSubmitForm} className=" max-sm:my-auto my-auto py-6 px-9 w-[40%] max-lg:overflow-y-scroll ml-[30%] bg-white rounded-md
                                            max-lg:mx-auto max-lg:w-[90%] ">
          
          <div>
            <label  htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
              Name
            </label>
            <input type="text" name="email" id="email" value={formState.email}  onChange={handleChange}
                className="mt-2  w-[100%] rounded-md border border-[#e0e0e0] bg-white py-[8px] px-4 text-base font-medium outline-none focus:border-[#1F2937] focus:shadow-md"
            />
          </div>
  
          <div className="mt-[20px] grid grid-cols-1 gap-x-4 max-lg:grid-cols-1">
            <div className='col-span-1'>
              <label  htmlFor="phone_number" className="block text-sm font-medium leading-6 text-gray-900">
                Phone
              </label>
              <input type="text" name="phone_number" id="phone_number" value={formState.phone_number}  onChange={handleChange}
                  className="mt-2  w-[100%] rounded-md border border-[#e0e0e0] bg-white py-[8px] px-4 text-base font-medium outline-none focus:border-[#1F2937] focus:shadow-md"
              />
            </div>
          </div>
  
          
  
          
  
          <div className="mt-[20px] grid grid-cols-1 gap-x-4 max-lg:grid-cols-1">
              <div className='col-span-1'>
                <label  htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                  Email
                </label>
                <input type="text" name="name" id="name" value={formState.name}  onChange={handleChange}
                    className="mt-2  w-[100%] rounded-md border border-[#e0e0e0] bg-white py-[8px] px-4 text-base font-medium outline-none focus:border-[#1F2937] focus:shadow-md"
                />
              </div>
              <div className='col-span-3 mt-[20px]'>
                <label htmlFor="address" className="block text-sm font-medium leading-6 text-gray-900">
                  Address
                </label>
                <input type="text" name="address" id="address" value={formState.address} onChange={handleChange}
                    className="mt-2 w-[100%]  rounded-md border border-[#e0e0e0] bg-white py-[8px] px-4 text-base font-medium outline-none focus:border-[#1F2937] focus:shadow-md"
                />
              </div>        
          </div>

          <div className='bg-white flex flex-col max-h-[550px] rounded-md mt-[30px]
                        lg:hidden'>
              { (formImage || formState.avatar) 
              ? 
                <div>
                  <img src={formImage} alt="car" onClick={() => inputRef.current.click()} className='w-[100%] max-w-[390px] max-h-[500px] m-auto '/> 
                  <p className='text-[10px] text-center mt-4 italic text-gray-500'>Click on above image to upload a new image!</p>
                </div>                    
                
              :
                <div className="w-[80%] mx-auto my-[30px] ">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10" onClick={() => inputRef.current.click()}>
                    <div className="text-center">     
                      <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600">
                        <InsertPhotoIcon style={{fontSize : "50px"}}/>
                        <p>Please upload your image!!!</p>
                      </div>
                    </div>
                  </div>
                </div> 
              }
            <input type="file" onChange={handleImageChange} ref={inputRef} className='hidden'/>
          </div>

          {errors && 
            <div className="text-red-500 text-sm mt-4 mb-6 bg-[#f8d7da] p-[10px] rounded-md">
              <p>Please fill in "<span className='font-medium'>{errors}</span>" fields!</p>
            </div>} 
          <div className="mb-2 mt-4">
            <button className="hover:shadow-form w-full rounded-md bg-[#1F2937] py-2 px-8 text-center text-base font-semibold text-white outline-none" 
                    onClick={handleSubmitForm}>
              Submit
            </button>
          </div>
        </form>

        <div className='bg-white my-auto min-h-[460px] flex flex-col w-[400px] max-h-[550px] m-[30px] rounded-md ml-[10px]
                        max-lg:hidden'>
              { (formImage || formState.avatar) 
              ? 
                <img src={formImage} alt="car" className='w-[300px] h-[300px] m-auto rounded-full '/> 
              :
                <div className="w-[80%] mx-auto mt-[70px] ">
                  <div className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 px-6 py-10">
                    <div className="text-center">     
                      <div className="mt-4 flex flex-col items-center text-sm leading-6 text-gray-600">
                        <InsertPhotoIcon style={{fontSize : "50px"}}/>
                        <p>Please upload your image!!!</p>
                      </div>
                    </div>
                  </div>
                </div> 
              }
            <input type="file" onChange={handleImageChange} ref={inputRef} className='hidden'/>
            <button className="hover:shadow-form w-[200px] h-[40px] mx-auto my-auto   rounded-md bg-[#1F2937]   text-center text-base font-semibold text-white outline-none" 
                    onClick={() => inputRef.current.click()}>
              Upload Image
            </button>
        </div>  
      
      </div>
  );
}

export default StaffModalForm