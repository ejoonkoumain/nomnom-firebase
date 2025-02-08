import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
import { Timestamp } from 'firebase-admin/firestore';
import Stripe from "stripe"


const stripe = new Stripe("sk_test_51QqAKMIKK2uEiFLFHdYoXmAt0rstzcJfpKBoXte4MRiTkp3wrOgwLwJlIZqpfJINsaANhzLHWbzacKv1bqLKDugF00XEzM2WyM", {
  apiVersion: '2025-01-27.acacia',
})

export const helloWorld = functions.https.onRequest((request: Request, response: Response) => {
  response.send("Hello, World!");
});

export const createPaymentIntents = functions.https.onRequest(async (request: Request, response: Response): Promise<void> => {
  try {
    const {amount, currency} = request.body

    if (!amount || !currency) {
      response.status(400).json({ error: "Missing parameters" });
      return;
    }

    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency,
      payment_method_types: ["card", "apple_pay"],
    })

    response.json({clientSecret: paymentIntent.client_secret});

  } catch (error) {
    response.status(500).json({error: error});
  }
})

export interface Table {
  number: number;
}

export interface Session {
  table_id: string;
  created_at: Timestamp;
  closed: boolean;
}

export interface SessionUser {
  user_id: string;
  joined_at: Timestamp;
  total_cost: number;
}

export interface Order {
  user_id: string;
  item_name: string;
  price: number;
  quantity: number;
  created_at: Timestamp;
  status: "pending" | "served" | "canceled";
}

export interface User {
  name: string;
  email: string;
  phone: string;
}
