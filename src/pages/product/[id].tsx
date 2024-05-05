import { stripe } from "@/lib/stripe";
import { GetStaticPaths, GetStaticProps } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import Stripe from "stripe";
import ProductLoading from "./component/loading";
import Head from "next/head";
import { IProduct, useCart } from "@/context/cart-context";

interface ProductProps {
  product: IProduct
}

export default function Product({ product }: ProductProps) {
  const { isFallback } = useRouter()
  const { addToCart, checkIfItemAlreadyExists } = useCart()
  
  if (isFallback) {
    return <ProductLoading />
  }
  
  const productAlreadyInCart = checkIfItemAlreadyExists(product.id)
  
  function handleAddProduct() {
    addToCart(product)
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

          <span className="text-xl font-bold mt-4">
            {product.price}
          </span>

          <button
            onClick={handleAddProduct}
            disabled={productAlreadyInCart}
            className="mt-8 flex h-12 w-full items-center justify-center rounded-full bg-emerald-600 font-semibold text-gray-50 hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {productAlreadyInCart ? 'Produto adicionado!' : 'Adicionar ao carrinho'}
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
        numberPrice: price.unit_amount / 100,
        description: product.description,
        defaultPriceId: price.id
      }
    },
    revalidate: 60 * 60 * 1 // 1hour
  }
}