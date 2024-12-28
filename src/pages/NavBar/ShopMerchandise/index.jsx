import SearchBasicExample from "../../../components/SearchBar"
import { Fragment, useEffect, useState } from 'react'
import { Dialog, Disclosure, Menu, Transition } from '@headlessui/react'
import { MagnifyingGlassIcon, XMarkIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon, FunnelIcon, MinusIcon, PlusIcon, Squares2X2Icon } from '@heroicons/react/20/solid'
import ReactPlayer from "react-player"
import { cdmApi } from "../../../misc/cdmApi"
import ShopCard from "../../../components/ShopCard"


  const sortOptions = [
    { name: 'Most Popular', href: '#', current: true },
    { name: 'Best Rating', href: '#', current: false },
    { name: 'Newest', href: '#', current: false },
    { name: 'Price: Low to High', href: '#', current: false },
    { name: 'Price: High to Low', href: '#', current: false },
  ]
  
  export default function Example() {
    const [mer, setMer] = useState([]);
    const [searchResult, setSearchResult] = useState([]);
    const [firstLoad, setFisrtLoad] = useState(false);

    const handleSortBy = (e) => {
      if(e.target.value === 'asc'){
        const sortedArr = [...mer].sort((a,b) => a.price - b.price);
        setSearchResult(sortedArr);
      }else{
        const sortedArr = [...mer].sort((a,b) => b.price - a.price);
        setSearchResult(sortedArr);
      }
    }

    const fetchInfo = async () => {
        try {
          const res = await cdmApi.getShopByType('merchandise');
          setMer(res.data);
          if(firstLoad === false){
            setSearchResult(res.data);
            setFisrtLoad(true);
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        }
      }
    
      useEffect(() => {
        fetchInfo();
    }, [firstLoad]);
    const handleSearchChange = (e) => {
      if(!e.target.value) return setSearchResult(mer);
      const resultArr = mer.filter(mer => mer.name.includes(e.target.value))
      setSearchResult(resultArr);
  }
    return (
      <>
      <div className="hidden xl:block" style={{height: 420, marginTop: 0}}>
        <ReactPlayer 
                url='https://res.cloudinary.com/droondbdu/video/upload/v1702451509/y2meta.com-Mercedes_AMG_GTC_4k_-_1080p_vxpspd.mp4'
                muted={true}
                loop={true}
                playing={true}
                controls={false}
          />
    </div>
      <div className="flex flex-col ">
        <div className="bg-white dark:bg-slate-800">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-16 lg:max-w-7xl lg:px-8">
            <h2 className="sr-only">Products</h2>
            <div className="flex 	justify-content">
                <h1 className="text-2xl mb-8 text-center mr-auto dark:text-white">Collection & Merchandise</h1>
                <div className="flex border-transparent	">
                <select
                  name="sort"
                  id="sort"
                  className="mr-4 bg-white border-transparent	mb-6 text-gray-800 dark:bg-gray-500 dark:text-white px-4 py-2.3"
                  onChange={handleSortBy}
                >
                  <option className="dark:bg-gray-500 dark:text-white" value="asc">Price Ascending</option>
                  <option className="dark:bg-gray-500 dark:text-white" value="desc">Price Descending</option>
                </select>
                    <div className="">
                    <div className=" flex justify-start float-right relative dark:bg-gray-500 dark:text-white"  >
                        <input 
                          onChange={handleSearchChange}
                          className="dark:bg-gray-500 dark:text-white dark:border-none bg-white text-sm leading-none text-left text-gray-600 px-4 py-3 w-full border rounded border-gray-300 outline-none"
                          type="text"
                          placeholder="Search"
                        />
                        <MagnifyingGlassIcon className="w-8 h-8 mr-2 mt-1 "/>
                         
                      </div>
                    </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                {searchResult.map((product) => (
                       <ShopCard data={{id: product.id ,imgSrc: product.image_url, name: product.name, price: product.price}} />
                       ))}
            </div>
            </div>
        </div>
      </div>
      </>
    )
  }
  