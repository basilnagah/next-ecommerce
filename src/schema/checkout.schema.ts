import * as zod from 'zod'








export const checkoutSchema = zod.object({
    details: zod.string('details must be string').nonempty('details is required'),
    city: zod.string('city must be string').nonempty('city is required'),
    phone: zod.string().regex(/^(\+2)?01[0125][0-9]{8}$/,'phone must be egypitan number')
})



export type CheckoutType = zod.infer<typeof checkoutSchema>
