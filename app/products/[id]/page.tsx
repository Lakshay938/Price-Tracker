// "use client"
// import { ModelContext } from "@/context/modal_context";
import { getProductById } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Product } from "@/types";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import Modal from "@/components/Modal";
// import {useContext, useState} from 'react';
import PriceInfoCard from "@/components/PriceInfoCard";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  // let [isOpen, setIsOpen] = useState(false)
  // const {isModelOpen, toggleisModelOpen} = useContext(ModelContext);
  const product: Product = await getProductById(id);
  if (!product) redirect("/");
  return (
    <div><div className= "product-container">
      <div className="flex gap-28 xl:flex-row flex-col justify-center">
        <div className="product-image ">
          <Image
            src={product.image}
            alt={product.title}
            height={580}
            width={400}
            className="mx-auto h-fit"
          />
        </div>
        <div className="blurred w-fit h-fit rounded-md md:rounded-lg border py-5 px-5 flex-1 flex flex-col">
          <div className="flex justify-between flex-wrap items-start gap-5 pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[20px] text-white-100 font-semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base w-fit text-primary-orange font-semibold opacity-50"
              >
                Visit Product
              </Link>
            </div>
            <div className="flex items-center gap-3">   
              {/* <div className="product-hearts">
                <Image
                  src="/assets/icons/red-heart.svg"
                  alt="heart"
                  width={20}`
                  height={20}
                />
                <p className="text-base font-semibold text-[#d46f77]">{product.reviewsCount}</p>
              </div> */}
              
            </div>
          </div>
          <div className="product-info">
                <div className="flex  gap-2">
                    <p className="text-[25px] text-white-100 opacity-50 line-through">{product.currency}{formatNumber(product.originalPrice)}
                    </p>
                    <p className="text-[25px] text-white-200 text-bold">{product.currency}{formatNumber(product.currentPrice)}
                    </p>
                </div>

          </div>
          <div className="my-7 flex flex-col gap-5 ">
                <div className="flex gap-5 flex-wrap">
                    <PriceInfoCard
                    title='Current Price'
                    value={`${product.currency}${formatNumber(product.currentPrice)}`}
                    
                    />
                     <PriceInfoCard
                    title='Average Price'
                    value={`${product.currency}${formatNumber(product.averagePrice)}`}
                    
                    />
                     <PriceInfoCard
                    title='Highest Price'
                    value={`${product.currency}${formatNumber(product.highestPrice)}`}
                    
                    />
                     <PriceInfoCard
                    title='Lowest Price'
                    value={`${product.currency}${formatNumber(product.lowestPrice)}`}
                    
                    
                    />
                </div>
          </div>
              
          <Modal 
          productId={id} 
           />
        </div>
      </div>
    </div>
    </div>
  );
};
export default ProductDetails;
