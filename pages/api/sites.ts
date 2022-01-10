// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import '@/lib/firebase-admin';

import {FieldValue, getFirestore, Timestamp} from 'firebase-admin/firestore';
import type {NextApiRequest, NextApiResponse} from 'next';

import {Site} from '@/models/site';

const db = getFirestore();

export default async function handler(req: NextApiRequest, res: NextApiResponse<Site[] | string | any>) {
  if (req.method === 'GET') {
    const snapshot = await db.collection('sites').get();
    const sites: Site[] = [];

    if (snapshot.empty) {
      console.log('No matching documents.');
      return res.status(200).json(sites);
    }

    snapshot.forEach((doc) => {
      const site = doc.data();
      const createdAt = (site.createdAt as Timestamp).toDate().toISOString();
      const {authorId, url, name} = site;
      sites.push({authorId, url, name, createdAt, id: doc.id});
    });

    return res.status(200).json(sites);
  }

  if (req.method === 'POST') {
    try {
      const payload = {...req.body, createdAt: FieldValue.serverTimestamp()};
      await db.collection('sites').add(payload);
      return res.status(200).json(payload);
    } catch (error) {
      return res.status(500).json({message: error});
    }
  }
}
