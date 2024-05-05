import { IProduct, useCart } from "@/context/cart-context"
import { stripe } from "@/lib/stripe"
import { ShoppingBag } from "lucide-react"
import { GetStaticProps } from "next"
import Head from "next/head"
import Image from "next/image"
import Link from "next/link"
import { MouseEvent } from "react"
import Stripe from "stripe"

interface HomeProps {
  products: IProduct[]
}

export default function Home({products}: HomeProps) {
  const { addToCart, checkIfItemAlreadyExists } = useCart();

  function handleAddToCart(
    e: MouseEvent<HTMLButtonElement>,
    product: IProduct
  ) {
    e.preventDefault();
    addToCart(product);
  }


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

              <footer className="absolute bottom-1 left-1 right-1 p-8 rounded-md flex items-center justify-between translate-y-10 opacity-0 transition-all bg-footer group-hover:opacity-100 group-hover:translate-y-1">
                <div className="flex flex-col gap-8">
                  <span className="truncate text-lg">{product.name}</span>
                  <span className="text-lg font-bold">
                    {product.price}
                  </span>
                </div>
                <button 
                  className="bg-transparent disabled:cursor-not-allowed"
                  onClick={(e) => handleAddToCart(e, product)}
                  disabled={checkIfItemAlreadyExists(product.id)}
                >
                  <ShoppingBag className="text-green-700 size-6 hover:text-green-500"/>
                </button>
              </footer>
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
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 1 // 1hour
  }
}