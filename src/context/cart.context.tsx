'use client'
import { getProductsFromCart } from '@/api/cart.api'
import { ProductType } from '@/types/product.type'
import { createContext, useEffect, useState, ReactNode, Dispatch, SetStateAction } from 'react'

type CartProduct = {
    count: number,
    _id: string,
    price: number,
    product: ProductType
}

export type CartResponse = {
    status: string,
    numOfCartItems: number,
    cartId: string,
    data: {
        products: CartProduct[]
    }
}

type CartContextType = {
    numOfCartItems: number | null
    setNumOfCartItems: Dispatch<SetStateAction<number | null>>
    handleCart: () => Promise<CartResponse>
    allProducts: CartProduct[]
    setAllProducts: Dispatch<SetStateAction<CartProduct[]>>
    totalPrice: number
}





export const CartContext = createContext<CartContextType | null>(null)

















export default function CartProvider({ children }: { children: ReactNode }) {
    const [numOfCartItems, setNumOfCartItems] = useState<number | null>(null)
    const [totalPrice, setTotalPrice] = useState<number>(0)
    const [allProducts, setAllProducts] = useState<CartProduct[]>([])

    async function handleCart() {
        const data = await getProductsFromCart()

        setAllProducts(data?.data?.products)

        let sum = 0
        data?.data?.products.forEach((product: CartProduct) => {
            sum += product.count
        })

        setNumOfCartItems(sum)
        setTotalPrice(data?.data?.totalCartPrice)

        return data
    }

    useEffect(() => {
        handleCart()
    }, [])

    return (
        <CartContext.Provider value={{ numOfCartItems, setNumOfCartItems, handleCart, setAllProducts, allProducts, totalPrice, }}>
            {children}
        </CartContext.Provider>
    )
}
