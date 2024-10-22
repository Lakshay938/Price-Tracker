import React from 'react'
import { Product } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
interface Props{
    product:Product;
}
export const ProductCard = ({product}:Props) => {
  return (
    <div className='blurred  rounded-md md:rounded-lg p-3 min-h-[40vh] md:min-h-[65vh]  border-2 border-white-100'>

    <Link href={`/products/${product._id}`} className='product-card'>

        <div className='product-card_img-container'>
        <Image
        src={product.image}
        alt={product.title}
        width={200}
        height={200}
        className='product-card_img'
        />
        </div>
        <div className='flex flex-col gap-3'>
            <h3 className='text-white-100 '>{product.title}</h3>
            <div className='flex justify-between'>
                <p className='text-white-100 opacity-50 text-lg capitalize'>{product.category}</p>
                <p className=' text-white-100'>
                    <span>{product?.currency}</span>
                    <span>{product?.currentPrice}</span>
                </p>
            </div>
        </div>
    </Link>
        </div>
  )
}

export default ProductCard;
