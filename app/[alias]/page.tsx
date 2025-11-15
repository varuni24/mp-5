import { redirect } from 'next/navigation';
import { getCollection, URLS_COLLECTION } from '@/lib/db';

type Props = {params: Promise<{ alias: string }>;};

export default async function aliasRedirect({ params }: Props) {
  const { alias } = await params;
  const collection = await getCollection(URLS_COLLECTION);
  const record = await collection.findOne<{ url: string }>({ alias });

  if (record?.url) {
    redirect(record.url);
  } else {
    redirect('/');
  }
}
