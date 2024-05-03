import { AddToCartButton } from "@/components/add-to-cart-button";
import Image from "next/image";

export default function Product() {
  return (
    <section className="relative grid max-h-[860px] grid-cols-3">
      <div className="col-span-2 overflow-hidden">
        <Image
          className=""
          src="/moletom.png"
          alt=""
          width={1000}
          height={1000}
          quality={100}
        />
      </div>

      <div className="flex flex-col justify-center px-12">
        <h1 className="text-3xl font-bold leading-tight">Moletom Never Stop Learning</h1>
        <p className="mt-2 leading-relaxed text-zinc-400">
        Moletom fabricado com 88% de algodão e 12% de poliéster.
        </p>

        <div className="mt-8 flex items-center gap-3">
          <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
            {Number(123).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
          <span className="text-sm text-zinc-400">
            em 12x s/ juros de{' '}
            {(Number(123) / 12).toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </span>
        </div>

        <AddToCartButton />
      </div>
    </section>
  )
}