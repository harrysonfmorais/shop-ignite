import Image from 'next/image'

import logoImg from '@/assets/logo.svg'
import Link from 'next/link'
import { CartMenu } from './cart-menu'

export function Header() {
  return (
    <header className="flex items-center justify-between">
      <Link href="/">
        <Image src={logoImg} alt="" />
      </Link>

      <CartMenu />
    </header>
  )
}
