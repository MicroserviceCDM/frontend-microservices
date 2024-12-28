import { faArrowRight, faSearch, faFilter } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { cdmApi } from "../../../misc/cdmApi";
import { useEffect, useState } from "react";
import ShopCard from "../../../components/ShopCard";
import backgroundVideo from "../../../assets/images/LandingPage/hero.jpg";

export default function Shop() {
  const [acc, setAcc] = useState([]);
  const [mer, setMer] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const fetchInfo = async () => {
    try {
      const res = await cdmApi.getShopByType("accessories");
      const other = await cdmApi.getShopByType("merchandise");
      const data = await cdmApi.getAllShop();

      // console.log(data);
      setAcc(res.data);
      console.log(res.data);
      setMer(other.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div className="min-h-screen bg-[#1a1f2e]">
      {/* Hero Section */}
      <div className="relative h-[400px] bg-black mb-20">
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-70"
          style={{backgroundImage: `url(${backgroundVideo})`}}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#1a1f2e]"></div>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
          <h1 className="text-5xl font-bold mb-4">Our Collection</h1>
          <p className="text-xl">Discover Premium Automotive Accessories & Merchandise</p>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative -mt-32">
        {/* Search and Filter Bar */}
        <div className="bg-white/10 backdrop-blur-md rounded-xl shadow-lg p-6 mb-8 border border-white/10">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-4 top-3.5 text-gray-400" 
              />
              <input
                type="search"
                className="w-full pl-12 pr-4 py-3 rounded-lg bg-white/10 border border-white/20 
                         text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 
                         focus:border-transparent"
                placeholder="Search products..."
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="flex items-center justify-center px-6 py-3 
                           bg-white/10 rounded-lg hover:bg-white/20 
                           transition-colors text-white">
              <FontAwesomeIcon icon={faFilter} className="mr-2" />
              Filters
            </button>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-4 mb-8">
          {['all', 'accessories', 'merchandise'].map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-6 py-2 rounded-full transition-all ${
                activeCategory === category
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white hover:bg-white/20'
              }`}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>

        {/* Products Grid */}
        {(activeCategory === 'all' || activeCategory === 'accessories') && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Vehicle Accessories</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {acc
                .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((product) => (
                  <ShopCard
                    key={product.id}
                    data={{
                      id: product.id,
                      imgSrc: product.image_url,
                      name: product.name,
                      price: product.price,
                    }}
                  />
                ))}
            </div>
          </div>
        )}

        {(activeCategory === 'all' || activeCategory === 'merchandise') && (
          <div className="mb-12">
            <h2 className="text-2xl font-bold mb-6 dark:text-white">Collection & Merchandise</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {mer
                .filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                .map((product) => (
                  <ShopCard
                    key={product.id}
                    data={{
                      id: product.id,
                      imgSrc: product.image_url,
                      name: product.name,
                      price: product.price,
                    }}
                  />
                ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
