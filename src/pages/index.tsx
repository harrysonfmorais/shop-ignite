import Image from "next/image"
import Link from "next/link"

export default function Home() {
  return (
    <main className="grid grid-cols-9 gap-6">
      {Array.from({length: 6}).map((_, i) => {
        return (
          <Link
            key={i}
            href={`/product/${i}`}
            className="group relative col-span-3 overflow-hidden rounded-lg bg-product"
          >
            <Image
              className="transition-transform duration-500 group-hover:scale-105"
              src="/moletom.png"
              alt=""
              width={480}
              height={480}
              quality={100}
            />

            <div className="absolute bottom-10 right-10 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
              <span className="truncate text-sm">Moletom Never Stop Learning</span>
              <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                {Number(123).toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </span>
            </div>
          </Link>
        )
      })}
    </main>
  )
}
