import { IProduct, useCart } from '@/context/cart-context'
import Image from 'next/image'

interface ItemCartMenuProps {
  cartItem: IProduct
}

export function ItemCartMenu({ cartItem }: ItemCartMenuProps) {
  const { removeCartItem } = useCart()

  function handleRemoveProduct() {
    removeCartItem(cartItem.id)
  }

  return (
    <div className="flex h-24 w-full items-center justify-start gap-4">
      <Image
        src={cartItem.imageUrl}
        alt=""
        className="size-24 flex items-center justify-center rounded-md bg-product"
        width={100}
        height={100}
        quality={80}
      />

      <div className="flex w-full flex-col items-start justify-center gap-2">
          <h2 className="w-[160px] truncate text-lg">{cartItem.name}</h2>
          <span className="mt-auto flex-1 font-medium">
            {cartItem.price}
          </span>
          <button
            onClick={handleRemoveProduct}
           className="mt-auto bg-transparent text-lg font-bold text-emerald-700 hover:text-emerald-800"
          >
            Remover
          </button>
      </div>
    </div>
  )
}
