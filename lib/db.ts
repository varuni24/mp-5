import { MongoClient } from 'mongodb';

const MONGO_URI = process.env.MONGO_URI;
const DB_NAME = 'url-shortener';
export const URLS_COLLECTION = 'urls';

export async function getCollection(collectionName: string) {
  if (!MONGO_URI) {
    throw new Error('MONGO_URI is not defined in environment variables');
  }

  const client = new MongoClient(MONGO_URI);
  await client.connect();
  const db = client.db(DB_NAME);
  return db.collection(collectionName);
}
