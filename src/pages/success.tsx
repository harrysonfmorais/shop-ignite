import Link from 'next/link'

export default function Success() {
  return (
    <div className="mt-40 flex flex-col items-center justify-center gap-6">
      <h1 className="text-3xl font-bold">Compra efetuada!</h1>
      <p className="text-2xl font-medium">
        Uhuul, sua compra já está a caminho da sua casa.{' '}
      </p>

      <Link
        className="mt-16 text-lg text-green-600 hover:text-green-700"
        href="/"
      >
        Voltar ao catálogo
      </Link>
    </div>
  )
}
