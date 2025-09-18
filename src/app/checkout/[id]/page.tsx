'use client'
import { makeCashPayment, makeOnlinePayment } from "@/api/checkout.api";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CartContext } from "@/context/cart.context";
import { checkoutSchema, CheckoutType } from "@/schema/checkout.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useContext, useState } from "react";
import { useForm } from "react-hook-form";

export default function Checkout() {

    const { id }: { id: string } = useParams()
    const [paymentFlag, setPaymentFlag] = useState('')
    const context = useContext(CartContext)
    const router = useRouter()

    const myForm = useForm<CheckoutType>({
        defaultValues: {
            details: '',
            phone: '',
            city: ''
        },
        resolver: zodResolver(checkoutSchema),
        mode: 'all'
    })



    async function handleCheckout(values: CheckoutType) {


        if (paymentFlag == 'online') {


            const data = await makeOnlinePayment(id, 'https://next-ecommerce-rust-five.vercel.app', values)

            if (data.status == 'success') {
                window.location.href = data.session.url
            }
        } else {


            const data = await makeCashPayment( id, values)
            console.log(data);
            context?.handleCart()
            router.replace('/allorders')
            
        }
    }







    return <>

        <div className='px-20 py-10'>
            <h1 className='text-3xl font-semibold'>Checkout</h1>


            <Form {...myForm}>

                <form onSubmit={myForm.handleSubmit(handleCheckout)} className="space-y-6">




                    {/* details */}
                    <FormField
                        control={myForm.control}
                        name="details"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Details:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* phone */}
                    <FormField
                        control={myForm.control}
                        name="phone"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Phone:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* city */}
                    <FormField
                        control={myForm.control}
                        name="city"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>City:</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />


                    <div className="flex gap-4 items-center">
                        <Button onClick={() => { setPaymentFlag('online') }} className="bg-blue-500">online payment</Button>
                        <Button onClick={() => { setPaymentFlag('cash') }} className="bg-green-500">cash payment</Button>
                    </div>

                </form>

            </Form>

        </div>

    </>
}
