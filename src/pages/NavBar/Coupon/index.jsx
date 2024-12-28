import { useEffect, useState } from "react";
import Coupon from "../../../components/Coupon";
import { cdmApi } from "../../../misc/cdmApi";

const products = [
  {
    id: 1,
    name: "Earthen Bottle",
    href: "#",
    price: "$48",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-01.jpg",
    imageAlt:
      "Tall slender porcelain bottle with natural clay textured body and cork stopper.",
  },
  {
    id: 2,
    name: "Nomad Tumbler",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-02.jpg",
    imageAlt:
      "Olive drab green insulated bottle with flared screw lid and flat top.",
  },
  {
    id: 3,
    name: "Focus Paper Refill",
    href: "#",
    price: "$89",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-03.jpg",
    imageAlt:
      "Person using a pen to cross a task off a productivity paper card.",
  },
  {
    id: 4,
    name: "Machined Mechanical Pencil",
    href: "#",
    price: "$35",
    imageSrc:
      "https://tailwindui.com/img/ecommerce-images/category-page-04-image-card-04.jpg",
    imageAlt:
      "Hand holding black machined steel mechanical pencil with brass tip and top.",
  },
  // More products...
];

export default function Example() {
  const [vouchers, setVouchers] = useState([]);

  const fetVoucher = async () => {
    try {
      const res = await cdmApi.getAllVoucher();
      setVouchers(res.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetVoucher();
  }, []);

  return (
    <div className="bg-white dark:bg-slate-800">
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h1 className="text-black dark:text-white text-3xl">Current Voucher</h1>

        <div className="flex grid grid-cols-1  xl:grid-cols-2 xl:gap-x-16">
          {vouchers.map((voucher) => (
            <Coupon
              data={{
                description: voucher.description,
                exdate: voucher.expirationDate,
                code: voucher.code,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
