import { stripe } from "@/lib/stripe";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import ProductLoading from "./component/loading";
import axios from "axios";
import { useState } from "react";
import Head from "next/head";

interface ProductProps {
  product: {
    id: string
    name: string
    imageUrl: string
    price: string
    description: string
    defaultPriceId: string
  }
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  if (isFallback) {
    return <ProductLoading />
  }

  async function handleBuyProduct() {
    setIsCreatingCheckoutSession(true)
    try {
      const response = await axios.post('/api/checkout', {
        priceId: product.defaultPriceId
      })

      const { checkoutUrl } = response.data

      window.location.href = checkoutUrl
    } catch (err) {
      setIsCreatingCheckoutSession(false)
      alert('Falha ao direcionar ao checkout!')
    }
  }

  return (
    <>
      <Head>
        <title>{product.name} | Ignite Shop</title>
      </Head>
      
      <section className="relative grid max-h-[860px] grid-cols-3">
        <div className="col-span-2 overflow-hidden">
          <Image
            className=""
            src={product.imageUrl}
            alt=""
            width={1000}
            height={1000}
            quality={100}
          />
        </div>

        <div className="flex flex-col justify-center px-12">
          <h1 className="text-3xl font-bold leading-tight">{product.name}</h1>
          <p className="mt-2 leading-relaxed text-zinc-400">
            {product.description}
          </p>

          <div className="mt-8 flex items-center gap-3">
            <span className="inline-block rounded-full bg-violet-500 px-5 py-2.5 font-semibold">
              {product.price}
            </span>
          </div>

          <button
            onClick={handleBuyProduct}
            disabled={isCreatingCheckoutSession}
            className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 font-semibold text-gray-50 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            Adicionar ao carrinho
          </button>
        </div>
      </section>
    </>
  )
}

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { id : 'prod_Q2Mvdusne6JbO7' } },
      { params: { id : 'prod_Q2Mu8MiAvPMNbw' } },
    ],
    fallback: true
  }
}

export const  getStaticProps: GetStaticProps<any, { id: string }> = async ({ params }) => {
  const productId = params.id

  const product = await stripe.products.retrieve(productId, {
    expand: ['default_price']
  })

  const price = product.default_price as Stripe.Price

  return {
    props: {
      product: {
        id: product.id,
        name: product.name,
        imageUrl: product.images[0],
        price: new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(price.unit_amount ? price.unit_amount / 100 : 129),
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1hour
  }
}