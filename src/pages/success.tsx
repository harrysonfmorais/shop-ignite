import { stripe } from '@/lib/stripe'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

interface SuccessProps {
  customerName: string
  product: {
    name: string
    imageUrl: string
  }
}

export default function Success({customerName, product}: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>
        <meta name="robots" content="noindex" />
      </Head>
      
      <div className="mt-40 flex flex-col items-center justify-center gap-6">
        <h1 className="text-3xl font-bold">Compra efetuada!</h1>
        <Image src={product.imageUrl} alt='' width={120} height={110}/>
        <p className="text-2xl font-medium">
          Uhuul, <strong>{customerName}</strong> sua <strong>{product.name}</strong> já está a caminho da sua casa.{' '}
        </p>

        <Link
          className="mt-16 text-lg text-green-600 hover:text-green-700"
          href="/"
        >
          Voltar ao catálogo
        </Link>
      </div>
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
  const product = session.line_items?.data[0].price?.product

  console.log(product)
  return {
    props: {
      customerName,
      product: {
        name: product.name,
        imageUrl: product.images[0]
      }
    }
  }
}