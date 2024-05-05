import { stripe } from '@/lib/stripe'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import Stripe from 'stripe'

interface SuccessProps {
  customerName: string
  productsImages: string[]
}

export default function Success({customerName, productsImages}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      
      <main className="mt-20 flex flex-col items-center justify-center gap-5">
        <section className='flex items-center mb-12'>
          <div className='relative flex items-center justify-center size-36'>
            {productsImages.map((image, i) => (
              <Image 
                className='bg-product rounded-full bg-cover'
                key={i}
                src={image} 
                alt='' 
                width={120} 
                height={110}
              />
            ))}
          </div>
        </section>
        <h1 className="text-3xl font-bold">Compra efetuada!</h1>
        <p className="text-2xl font-medium max-w-[560px] text-center mt-8">
          Uhuul, <strong>{customerName}</strong> sua compra de{" "}
          {productsImages.length} {productsImages.length > 1 ? 'camisetas' : 'camiseta'} já está a caminho do seu endereço.
        </p>

        <Link
          className="mt-16 text-lg text-green-600 hover:text-green-700"
          href="/"
        >
          Voltar ao catálogo
        </Link>
      </main>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query, params }) => {
  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  const sessionId = String(query.session_id)


  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  
  const customerName = session.customer_details?.name
  const productsImages = session.line_items?.data.map((item) => {
    const product = item.price?.product as Stripe.Product

    return product.images[0]
  })

  return {
    props: {
      customerName,
      productsImages,
    }
  }
}