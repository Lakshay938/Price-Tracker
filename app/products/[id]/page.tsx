import { getProductById } from "@/lib/actions";
import { redirect } from "next/navigation";
import Image from "next/image";
import { Product } from "@/types";
import Link from "next/link";
import { formatNumber } from "@/lib/utils";
import Modal from "@/components/Modal";
import PriceInfoCard from "@/components/PriceInfoCard";

type Props = {
  params: { id: string };
};

const ProductDetails = async ({ params: { id } }: Props) => {
  const product: Product = await getProductById(id);
  if (!product) redirect("/");
  return (
    <div><div className="product-container">
      <div className="flex gap-28 xl:flex-row flex-col">
        <div className="product-image">
          <Image
            src={product.image}
            alt={product.title}
            height={580}
            width={400}
            className="mx-auto"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <div className="flex justify-between flex-wrap items-start gap-5 pb-6">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] text-secondary font-semibold">
                {product.title}
              </p>
              <Link
                href={product.url}
                target="_blank"
                className="text-base text-black opacity-50"
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
                <div className="flex flex-col gap-2">
                    <p className="text-[34px] text-secondary text-bold">{product.currency}{formatNumber(product.currentPrice)}
                    </p>
                    <p className="text-[21px] text-black opacity-50 line-through">{product.currency}{formatNumber(product.originalPrice)}
                    </p>
                </div>

          </div>
          <div className="my-7 flex flex-col ga-5 ">
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
              
          <Modal productId={id}/>
        </div>
      </div>
    </div>
    </div>
  );
};
export default ProductDetails;
