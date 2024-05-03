import { stripe } from "@/lib/stripe"
import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import Stripe from "stripe"

interface HomeProps {
  products: {
    id: string
    name: string
    imageUrl: string
    price: string
  }[]
}

export default function Home({products}: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>
      <main className="grid grid-cols-9 gap-6">
        {products.map((product) => {
          return (
            <Link
              key={product.id}
              href={`/product/${product.id}`}
              className="group relative col-span-3 overflow-hidden rounded-lg bg-product"
            >
              <Image
                className="transition-transform duration-500 group-hover:scale-105"
                src={product.imageUrl}
                alt=""
                width={480}
                height={480}
                quality={100}
              />

              <div className="absolute bottom-10 right-10 flex h-12 max-w-[280px] items-center gap-2 rounded-full border-2 border-zinc-500 bg-black/60 p-1 pl-5">
                <span className="truncate text-sm">{product.name}</span>
                <span className="flex h-full items-center justify-center rounded-full bg-violet-500 px-4 font-semibold">
                  {product.price}
                </span>
              </div>
            </Link>
          )
        })}
      </main>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })
  
  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price
    
    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(price.unit_amount ? price.unit_amount / 100 : 129),
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 1 // 1hour
  }
}