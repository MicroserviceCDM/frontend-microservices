import './SortCarSideBar.css'

function SortCarSideBar() {
    const gradientBlack = 'linear-gradient(to bottom, #000000, #ffffff)';
    const gradientRed = 'linear-gradient(to bottom, #f90000, #fff8f8)';
    const gradientBlue = 'linear-gradient(to bottom, #ececec, #0071f9)';
    const gradientGreen = 'linear-gradient(to bottom, #ececec, #055904)';
    const gradientGray = 'linear-gradient(to bottom, #ffffff, #cfd1cf)';
    return ( 
        <>
            <div className='hidden bg-white xl:block bg-gray-100 xl:bg-white'>
            <select className="select-car-sort">
                    <option value="option1">Price: Low to High</option>
                    <option value="option2">Price: High to Low</option>
                </select>
                <p className="article-car-sort">Model</p>

                <div className="container-flex">
                    <input className="radio-car-sort" type="radio"  name="radio-model"/>
                    <div className="container-flex" style={{justifyContent: 'center', alignItems: 'center'}}>
                        <p className="radio-text-car-sort">Model S</p>
                    </div>
                </div>
                <div className="container-flex">
                    <input className="radio-car-sort" type="radio"  name="radio-model"/>
                    <div className="container-flex" style={{justifyContent: 'center', alignItems: 'center'}}>
                        <p className="radio-text-car-sort">Model 3</p>
                    </div>
                </div>
                <div className="container-flex">
                    <input className="radio-car-sort" type="radio"  name="radio-model"/>
                    <div className="container-flex" style={{justifyContent: 'center', alignItems: 'center'}}>
                        <p className="radio-text-car-sort">Model X</p>
                    </div>
                </div>
                <div className="container-flex">
                    <input className="radio-car-sort" type="radio" name="radio-model"/>
                    <div className="container-flex" style={{justifyContent: 'center', alignItems: 'center'}} >
                        <p className="radio-text-car-sort">Model Y</p>
                    </div>
                </div>

                <p className="article-car-sort">Trim</p>
                <div className="container-flex">
                    <input className="radio-car-sort" type="checkbox" name="checkbox-model"/>
                    <div className="container-flex" style={{justifyContent: 'center', alignItems: 'center'}} >
                        <p className="radio-text-car-sort">Performance All-Wheel Drive</p>
                    </div>
                </div>
                <div className="container-flex">
                    <input className="radio-car-sort" type="checkbox" name="checkbox-model"/>
                    <div className="container-flex" style={{justifyContent: 'center', alignItems: 'center'}} >
                        <p className="radio-text-car-sort">Long Range All-Wheel Drive</p>
                    </div>
                </div>
                <div className="container-flex">
                    <input className="radio-car-sort" type="checkbox" name="checkbox-model"/>
                    <div className="container-flex" style={{justifyContent: 'center', alignItems: 'center'}} >
                        <p className="radio-text-car-sort">Model Y All-Wheel Drive</p>
                    </div>
                </div>
                <div className="container-flex">
                    <input className="radio-car-sort" type="checkbox" name="checkbox-model"/>
                    <div className="container-flex" style={{justifyContent: 'center', alignItems: 'center'}} >
                        <p className="radio-text-car-sort">Model Y Rear-Wheel Drive</p>
                    </div>
                </div>

                <p className="article-car-sort">Exterior Paint</p>
                <div className="container-flex" style={{marginLeft: 10}}>
                    <div className="color-option-car-sort" style={{backgroundImage: gradientBlack}}></div>
                    <div className="color-option-car-sort" style={{backgroundImage: gradientRed}}></div>
                    <div className="color-option-car-sort" style={{backgroundImage: gradientBlue}}></div>
                    <div className="color-option-car-sort" style={{backgroundImage: gradientGreen}}></div>
                    <div className="color-option-car-sort" style={{backgroundImage: gradientGray}}></div>
                </div>
                <p className="article-car-sort" >Interior Color</p>
                <div className="container-flex" style={{marginLeft: 10}}>
                    <div className="color-option-car-sort" style={{backgroundColor: 'black'}}></div>
                    <div className="color-option-car-sort" style={{backgroundColor: 'white'}}></div>
                    <div className="color-option-car-sort" style={{backgroundColor: '#7c471f'}}></div>
                </div>
            </div>
        </>
     );
}

export default SortCarSideBar;