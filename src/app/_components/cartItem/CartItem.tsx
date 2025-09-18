import { removeProductsFromCart, updateProductCount } from '@/api/cart.api'
import { CartContext } from '@/context/cart.context'
import { CartProductType } from '@/types/cart.type'
import { Trash } from 'lucide-react'
import Image from 'next/image'
import React, { useContext, useState } from 'react'
import { toast } from 'sonner'

export default function CartItem({ product }: { product: CartProductType }) {

    const [isLoading, setIsLoading] = useState(false)
    const context = useContext(CartContext)


    async function handleDeleteFromCart() {

        setIsLoading(true)

        try {
            const data = await removeProductsFromCart(product.product.id)

            if (data.status == 'success') {
                toast.success('product removed successfully', { position: 'top-right', duration: 2000 })
                context?.handleCart()

            }
        } catch (error) {
            console.log(error);
            toast.error('error occured', { position: 'top-right', duration: 2000 })

        } finally {
            setIsLoading(false)
        }
    }


    async function handleUpdateCount(newCount: number) {
        setIsLoading(true)

        try {
            const data = await updateProductCount(product.product.id, newCount)

            if (data.status == 'success') {
               
                toast.success('product updated successfully', { position: 'top-right', duration: 2000 })
                context?.handleCart()

        
            }
        } catch (error) {
            console.log(error);
            toast.error('error occured', { position: 'top-right', duration: 2000 })

        } finally {
            setIsLoading(false)
        }

    }




    return <>
        <div className="flex justify-between items-center border-b-2 border-b-slate-400 py-10">
            <div className="flex gap-3">
                <Image src={product.product.imageCover} alt={product.product.title} width={500} height={500} className='w-[100px]' />
                <div className='space-y-2'>
                    <h3>{product.product.title}</h3>
                    <h4>Price: {product.price} x <span className='text-blue-600'>{product.count}</span> = {product.price*product.count} EGP</h4>
                    <button disabled={isLoading} onClick={handleDeleteFromCart} className="bg-red-500 cursor-pointer text-white rounded-lg px-6 py-2 flex gap-2 items-center disabled:bg-slate-300 disabled:cursor-not-allowed"> <Trash /> Remove</button>
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button disabled={isLoading} onClick={() => handleUpdateCount(product.count - 1)} className="bg-blue-500 text-white rounded-xl w-10 h-10 text-2xl cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed">-</button>
                <h4 className="text-xl"> {isLoading  ?  <i className='fa-solid fa-spinner fa-spin text-blue-600'></i> :  product.count} </h4>
                <button disabled={isLoading} onClick={() => handleUpdateCount(product.count + 1)} className="bg-blue-500 text-white rounded-xl w-10 h-10 text-2xl cursor-pointer disabled:bg-slate-300 disabled:cursor-not-allowed">+</button>
            </div>
        </div>


    </>
}
