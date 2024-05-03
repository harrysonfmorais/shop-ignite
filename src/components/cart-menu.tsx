import * as Dialog from '@radix-ui/react-dialog'
import { ShoppingBag, X } from 'lucide-react'
import { ItemCartMenu } from './item-cart-menu'

export function CartMenu() {
  // const router = useRouter()
  // function handleCompletedOrder() {
  //   router.push('/success')
  //   clearCart()
  // }

  return (
    <Dialog.Root>
      <Dialog.Trigger className="relative rounded-md bg-gray-800 p-2">
        <ShoppingBag className="size-6 text-gray-400" />
        <span className="absolute -right-3 -top-3 flex size-5 items-center justify-center rounded-full bg-gray-500 p-3 text-sm font-bold">
          1
        </span>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed right-0 top-0 h-full w-[480px] bg-gray-900" />
        <Dialog.Content className="fixed right-0 top-0 min-h-screen w-[480px] overflow-hidden bg-gray-900 p-12">
          <Dialog.DialogClose className="absolute right-6 top-6 border-0 bg-transparent">
            <X className="size-6 text-gray-500" />
          </Dialog.DialogClose>
          <Dialog.Title className="text-xl font-bold">
            Sacola de compras
          </Dialog.Title>

          <div className="mt-8 flex flex-col">
            <section className="flex max-h-[520px] flex-col items-start justify-center gap-2 overflow-auto">
              {Array.from({ length: 3 }).map((_, i) => {
                return <ItemCartMenu key={i} />
              })}
            </section>

            <section className="mt-20 flex flex-col">
              <div className="flex items-center justify-between">
                <span className="font-medium">Quantidade</span>
                <span className="text-lg font-medium">3 itens</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold">Valor Total</span>
                <span className="text-2xl font-bold">
                  {(Number(12900) / 100).toLocaleString('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  })}
                </span>
              </div>

              <button className="mt-14 w-full rounded-lg bg-emerald-700 py-5 font-bold hover:bg-emerald-800">
                Finalizar compra
              </button>
            </section>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
