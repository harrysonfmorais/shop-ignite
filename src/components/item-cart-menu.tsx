import Image from 'next/image'

export function ItemCartMenu() {
  return (
    <div className="flex w-full items-center justify-start gap-5">
      <Image
        src="/camiseta-dowhile-2022.png"
        alt=""
        className="size-24 rounded-md bg-product"
        width={100}
        height={100}
        quality={80}
      />

      <div className="flex w-full flex-col items-start justify-center gap-1">
        <div className="flex w-full items-center justify-between gap-2">
          <h2 className="w-[160px] truncate text-lg">Camiseta Dowhile</h2>
          <span className="mt-auto flex-1 font-medium">
            {Number(129).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>
        <div className="flex w-full items-start justify-between px-2">
          <button className="mt-auto bg-transparent text-lg font-bold text-emerald-700 hover:text-emerald-800">
            Remover
          </button>
        </div>
      </div>
    </div>
  )
}
