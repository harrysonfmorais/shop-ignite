import { env } from "@/env";
import { stripe } from "@/lib/stripe";
import type { NextApiRequest, NextApiResponse } from "next";

const successUrl = `${env.NEXT_PUBLIC_API_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}`
const cancelUrl = `${env.NEXT_PUBLIC_API_BASE_URL}/`

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { priceId } = req.body

  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed.'})
  }

  if (!priceId) {
    return res.status(400).json({ error: 'Price not fount.'})
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    success_url: successUrl,
    cancel_url: cancelUrl,
    mode: 'subscription',
    line_items: [
      {
        price: priceId,
        quantity: 1
      }
    ]
  })

  return  res.status(201).json({
    checkoutUrl: checkoutSession.url
  })
}
