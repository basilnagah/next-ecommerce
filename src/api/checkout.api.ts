'use server'
import { CheckoutType } from "@/schema/checkout.schema"
import getMyToken from "@/utilities/GetMyToken"

export async function makeOnlinePayment(cartID: string, domainName: string, values: CheckoutType) {

    const token = await getMyToken()



    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartID}?url=${domainName}`, {
        method: "POST",
        headers: {
            token: `${token}`,

        },
        body: JSON.stringify({
            shippingAddress: values
        })
    })

    const data = await response.json()

    return data
}



export async function makeCashPayment(cartID: string, values: CheckoutType) {

    const token = await getMyToken()



    const response = await fetch(`https://ecommerce.routemisr.com/api/v1/orders/${cartID}`, {
        method: "POST",
        headers: {
            token: `${token}`,

        },
        body: JSON.stringify({
            shippingAddress: values
        })
    })

    const data = await response.json()

    return data
}