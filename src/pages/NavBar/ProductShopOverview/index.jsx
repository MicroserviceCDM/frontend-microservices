
import { useEffect, useState } from 'react'
import { StarIcon } from '@heroicons/react/20/solid'
import { RadioGroup } from '@headlessui/react'
import Navbar from '../../../layouts/components/NavBar'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faSubtract } from '@fortawesome/free-solid-svg-icons'
import { useParams } from 'react-router-dom'
import { cdmApi } from '../../../misc/cdmApi'
import { Snackbar } from '@mui/material'
import Alert from '@mui/material/Alert'
import React from 'react'
const product = {
    
  name: 'Basic Tee 6-Pack',
  price: '$192',
  href: '#',
  breadcrumbs: [
    { id: 1, name: 'Men', href: '#' },
    { id: 2, name: 'Clothing', href: '#' },
  ],
  images: [
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-secondary-product-shot.jpg',
      alt: 'Two each of gray, white, and black shirts laying flat.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-01.jpg',
      alt: 'Model wearing plain black basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-tertiary-product-shot-02.jpg',
      alt: 'Model wearing plain gray basic tee.',
    },
    {
      src: 'https://tailwindui.com/img/ecommerce-images/product-page-02-featured-product-shot.jpg',
      alt: 'Model wearing plain white basic tee.',
    },
  ],
  colors: [
    { name: 'White', class: 'bg-white', selectedClass: 'ring-gray-400' },
    { name: 'Gray', class: 'bg-gray-200', selectedClass: 'ring-gray-400' },
    { name: 'Black', class: 'bg-gray-900', selectedClass: 'ring-gray-900' },
  ],
  sizes: [
    { name: 'XXS', inStock: false },
    { name: 'XS', inStock: true },
    { name: 'S', inStock: true },
    { name: 'M', inStock: true },
    { name: 'L', inStock: true },
    { name: 'XL', inStock: true },
    { name: '2XL', inStock: true },
    { name: '3XL', inStock: true },
  ],
  description:
    'The Basic Tee 6-Pack allows you to fully express your vibrant personality with three grayscale options. Feeling adventurous? Put on a heather gray tee. Want to be a trendsetter? Try our exclusive colorway: "Black". Need to add an extra pop of color to your outfit? Our white tee has you covered.',
  highlights: [
    'Hand cut and sewn locally',
    'Dyed with our proprietary colors',
    'Pre-washed & pre-shrunk',
    'Ultra-soft 100% cotton',
  ],
  details:
    'The 6-Pack includes two black, two white, and two heather gray Basic Tees. Sign up for our subscription service and be the first to get new, exciting colors, like our upcoming "Charcoal Gray" limited release.',
}

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Example() {
    const params = useParams();
    const [data, setData] = useState([]);
    const [snackbar, setSnackbar] = React.useState(null);
    const handleCloseSnackbar = () => setSnackbar(null);

    function addToCart(product){
      const cart = JSON.parse(localStorage.getItem("cart")) || [];
      const isProductExist = cart.find((item) => item.id === product.id);
      if (isProductExist) {
        const updatedCart = cart.map((item) => {
          if (item.id === product.id) {
            return {
              ...item,
              quantity: item.quantity + quantity,
            };
          }
          return item;
        });
        localStorage.setItem("cart", JSON.stringify(updatedCart));
      } else {
        localStorage.setItem(
          "cart",
          JSON.stringify([...cart, { ...product, quantity: quantity }])
        );
      }
      setSnackbar({ children: "Add to cart successfully!", severity: "success" });
    }

    const url = "http://localhost:9296/api/v1/products/getShopById/" + params.id;
    const fetchInfo = async () => {
      try {
          const res = await cdmApi.getShopById(params.id);
          setData(res.data);

      } catch (error) {
          console.error("Error fetching data:", error);
      }
    }

  useEffect(() => {
     fetchInfo();
  }, []); 

  const [quantity, setQuantity] = useState(1);

  const handleIncrement = (e) => {
    e.preventDefault();
    setQuantity(quantity + 1);
  };

  const handleDecrement = (e) => {
    e.preventDefault();
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }

  };

  return (
    <>
    <Navbar/>
    <div className="bg-white dark:bg-slate-800">
      <div className="pt-6">

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              src={data.image_url}
              alt={product.images[0].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={data.image_url}
                alt={product.images[1].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
            <div className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg">
              <img
                src={data.image_url}
                alt={product.images[2].alt}
                className="h-full w-full object-cover object-center"
              />
            </div>
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              src={data.image_url}
              alt={product.images[3].alt}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl dark:text-white">{data.name}</h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only dark:text-white">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900 dark:text-white">${data.price}</p>            

            <div className="mt-10" >
                    <div className="flex flex items-center space-x-4">
                        <div className='flex-1 text-xl dark:text-white'><p>Count: </p></div>
                        <div className='flex-1'></div>
                        <div className='flex-1'></div>

                        <button className="flex-1 px-3 py-2 border border-gray-300 text-black dark:text-white" onClick={handleDecrement}><FontAwesomeIcon icon={faSubtract}/></button>
                        <div className="text-center flex-1 px-0 py-2 border border-gray-300 dark:text-white">
                            {quantity}
                        </div>
                        <button className="flex-1 px-3 py-2 border border-gray-300 text-black dark:text-white" onClick={handleIncrement}><FontAwesomeIcon icon={faPlus}/></button>
                    </div>
              <button
                onClick={() => addToCart({id: data.id, price: data.price, imgSrc: data.image_url, name: data.name})}
                className="dark:bg-blue-500 dark:hover:bg-blue-700 dark:focus:ring-blue-300 mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-black px-8 py-3 text-base font-medium text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
              >
                Add to cart
              </button>
            </div>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pb-16 lg:pr-8 lg:pt-6">
            {/* Description and details */}
            <div>
              <h3 className="sr-only dark:text-white">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900 dark:text-white">{data.description}</p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="text-xl font-medium text-gray-900 dark:text-white">Highlights</h3>

              <div className="mt-4">
                <ul role="list" className="list-disc space-y-2 pl-4 text-base" >
                  {product.highlights.map((highlight) => (
                    <li key={highlight} className="text-gray-400">
                      <span className="text-gray-600 dark:text-white">{highlight}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-10">
              <h2 className="text-xl font-medium text-gray-900 dark:text-white">Details</h2>

              <div className="mt-4 space-y-6">
                <p className="text-base text-gray-600 dark:text-white">{product.details}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    {!!snackbar && (
              <Snackbar open onClose={handleCloseSnackbar} autoHideDuration={6000} anchorOrigin={{ vertical: "bottom", horizontal: "center" }}>
                <Alert {...snackbar} onClose={handleCloseSnackbar} />
              </Snackbar>
            )}
    </>
  )
}
