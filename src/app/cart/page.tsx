/* eslint-disable react-hooks/exhaustive-deps */
'use client'

import { clearCart } from "@/api/cart.api"
import { ShoppingCart } from "lucide-react";
import { useContext, useEffect, useState } from "react"
import CartItem from "../_components/cartItem/CartItem";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { toast } from "sonner";
import { CartContext, CartResponse } from "@/context/cart.context";


export default function Cart() {

  const [isLoading, setIsLoading] = useState(true)
  const context = useContext(CartContext)
  const [cartData , setCartData] = useState<CartResponse | undefined>(undefined)

  async function handleGetProductsFromCart() {
    const data = await context?.handleCart()
    setIsLoading(false)
    
    setCartData(data)
  }

  async function handleClearCart() {
    const data = await clearCart()


    if (data.message == 'success') {

      context?.setAllProducts([])

      toast.success('cart cleared successfully', { position: 'top-right', duration: 2000 })
    }

  }



  useEffect(() => {
    handleGetProductsFromCart()
  }, [])

  if (isLoading) {
    return <h2 className="text-3xl text-center my-10">loadingggggg</h2>
  }


  return <>




    <div className="container">
      <div className="bg-slate-200 p-10 my-10">
        <div className="flex justify-between items-center">

          <div>
            <h2 className="flex items-center gap-3 text-3xl"> <ShoppingCart /> Shopping Cart </h2>
            <h3 className="text-blue-500 my-2">total cart price : {context?.totalPrice} EGP</h3>
          </div>

          <Button onClick={handleClearCart} className="bg-red-500">Clear Cart</Button>
        </div>


        {context?.allProducts?.length == 0 ?
          <div className="flex justify-center py-10">
            <h2>cart is empty , go add some items <Link className="bg-green-600 text-white px-5 py-2 rounded-lg" href={'/products'}>Shop now</Link></h2>
          </div>
          :
          <>
            {context?.allProducts?.map((product) => <CartItem key={product.product.id} product={product} />)}

            <div className="flex justify-end">
              <Link href={`/checkout/${cartData?.cartId}`}><Button className="bg-blue-600 m-4 cursor-pointer hover:bg-white hover:text-blue-600 hover:outline-2 hover:outline-blue-600 hover:outline-solid transition-all">Go To Checkout</Button></Link>
            </div>
          </>
        }

      </div>
    </div>


  </>
}
