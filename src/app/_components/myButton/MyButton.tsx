/* eslint-disable @typescript-eslint/no-explicit-any */
'use client'
import addProductToCart from '@/api/cart.api';
import { Button } from '@/components/ui/button'
import { CartContext } from '@/context/cart.context';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'
import { toast } from 'sonner';

export default function MyButton({ id }: { id: string }) {

    const [isLoading, setIsLoading] = useState(false)
    const context = useContext(CartContext)
    const router = useRouter()


    async function hanldeAddToCart() {
        try {
            setIsLoading(true)
            const data = await addProductToCart(id)

            if (data.status == 'success') {
                toast.success(data.message, { position: 'top-right', duration: 2000 })
                context?.handleCart()
            }

        } catch (error:any) {


            toast.error(error?.message, { position: 'top-right', duration: 2000 })
            router.push('/login')
        } finally {
            setIsLoading(false)
        }
    }

    return <>
        <Button disabled={isLoading} onClick={hanldeAddToCart} className="bg-blue-500 w-full hover:text-blue-500 hover:outline-2 hover:outline-blue-500 hover:outline-solid hover:bg-white transition-all cursor-pointer">Add to cart</Button>

    </>
}
