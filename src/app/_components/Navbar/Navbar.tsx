'use client'
import Image from 'next/image'
import logo from '../../../../public/images/freshcart-logo.svg'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { Moon, ShoppingCart, Sun } from 'lucide-react'
import { useContext } from 'react'
import { CartContext } from '@/context/cart.context'
import { useTheme } from 'next-themes'


export default function Navbar() {

    const { theme, setTheme } = useTheme()

    const router = useRouter()
    const { data } = useSession()
    const context = useContext(CartContext)


    async function handleLogout() {
        await signOut()
        router.push('/login')
    }



    return <>

        <nav className="bg-slate-300 py-6  dark:bg-black dark:text-white">
            <div className="container flex justify-between items-center">

                <div className="left">
                    <ul className='flex items-center gap-3'>
                        <li> <Link href={'/'}> <Image src={logo} alt='logo' /> </Link> </li>
                        <li><Link href="/">Home</Link></li>
                        <li><Link href="/products">Products</Link></li>
                        <li><Link href="/categories">Categories</Link></li>
                        <li><Link href="/brands">Brands</Link></li>
                        {data ?
                            <>
                                <li><Link href="/allorders">Orders</Link></li>
                            </>
                            : ''
                        }
                    </ul>
                </div>
                <div className="right">
                    <ul className='flex gap-3 items-center'>
                        <li className='block dark:hidden'> <Moon  onClick={()=>{ setTheme('dark')  }}/> </li>
                        <li className='hidden dark:block'> <Sun  onClick={()=>{  setTheme('light') }}/> </li>

                        {data ?
                            <li className='relative'>
                                <Link href="/cart"> <ShoppingCart /> </Link>
                                {context?.numOfCartItems && <h5 className='bg-green-600 text-white rounded-full w-6 h-6 flex justify-center items-center absolute top-[-15px] end-[-15px]'>{context?.numOfCartItems}</h5>}
                            </li>
                            : ''
                        }
                        <li> <i className='fa-brands fa-facebook'></i> </li>
                        <li> <i className='fa-brands fa-instagram'></i> </li>
                        <li> <i className='fa-brands fa-twitter'></i> </li>
                        <li> <i className='fa-brands fa-linkedin'></i> </li>
                        <li> <i className='fa-brands fa-tiktok'></i> </li>
                        {data ?
                            <>
                                <li onClick={handleLogout}><Link href="">logout</Link></li>
                                <li>hi, {data.user?.name}</li>
                            </>
                            :
                            <>
                                <li><Link href="/login">login</Link></li>
                                <li><Link href="/register">register</Link></li>
                            </>
                        }

                    </ul>
                </div>

            </div>
        </nav>


    </>
}
