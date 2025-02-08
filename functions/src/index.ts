import * as functions from 'firebase-functions';
import { Request, Response } from 'express';
import { Timestamp } from 'firebase-admin/firestore';

export const helloWorld = functions.https.onRequest((request: Request, response: Response) => {
  response.send("Hello, World!");
});

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