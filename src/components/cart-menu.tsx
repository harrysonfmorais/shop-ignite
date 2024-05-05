import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingBag, X } from 'lucide-react'
import { ItemCartMenu } from './item-cart-menu'
import { useCart } from '@/context/cart-context'
import axios from 'axios'
import { useState } from 'react'

export function CartMenu() {
  const { cartItems, cartProductTotal } = useCart()
  const cartQuantity = cartItems.length

  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)
  
  async function handleBuyProducts() {
    setIsCreatingCheckoutSession(true)
    try {
      const response = await axios.post('/api/checkout', {
        products: cartItems
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao direcionar ao checkout!')
    }
  }

  const formattedCartProductTotal = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(cartProductTotal)

  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative rounded-md bg-gray-800 p-2">
        <ShoppingBag className="size-6 text-gray-400" />
        {cartQuantity >= 1 && (
          <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-gray-500 p-3 text-sm font-bold">
            {cartQuantity}
          </span>
        )}
      </Dialog.Trigger>
      <Dialog.Portal>
        {/* <Dialog.Overlay className="fixed right-0 top-0 h-full w-[480px] bg-gray-900" /> */}
        <Dialog.Content className="fixed right-0 flex top-0 bottom-0 flex-col w-[480px] bg-gray-900 p-12 pt-16">
          <Dialog.DialogClose className="absolute right-6 top-6 border-0 bg-transparent">
            <X className="size-6 text-gray-500" />
          </Dialog.DialogClose>
          <h2 className="text-lg mb-8 font-bold">
            Sacola de compras
          </h2>

          <section className="flex flex-1 max-h-[520px] flex-col gap-5 overflow-y-auto">
            {cartItems.map((cartItem) => {
              return <ItemCartMenu key={cartItem.id} cartItem={cartItem} />
            })}
          </section>

          <div className="flex flex-col mt-auto">
            <div className="flex items-center justify-between">
              <span className="font-medium">Quantidade</span>
              <span className="text-lg font-medium">{cartQuantity} {cartQuantity > 1 ? 'itens' : 'item'}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-lg font-bold">Valor Total</span>
              <span className="text-2xl font-bold">
                {formattedCartProductTotal}
              </span>
            </div>

            <button 
              onClick={handleBuyProducts}
              disabled={isCreatingCheckoutSession || cartQuantity <= 0}
              className="mt-14 w-full rounded-lg bg-emerald-700 py-5 font-bold hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
            >
              Finalizar compra
            </button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
