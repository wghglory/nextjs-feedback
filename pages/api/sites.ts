// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import {auth} from 'firebase-admin';
import type {NextApiRequest, NextApiResponse} from 'next';

import {createSite, getAllSites, getUserSites} from '@/lib/firebase-server-apis';
import {Site} from '@/models/site';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{items: Site[]} | Site | unknown>) {
  if (req.method === 'GET') {
    try {
      const authorization = req.headers.authorization ?? '';
      const token = authorization?.replace(`Bearer `, '');

      const {uid} = await auth().verifyIdToken(token);
      const sites = await getUserSites(uid);

      return res.status(200).json({items: sites});
    } catch (error) {
      res.status(500).json({error});
    }
  }

  if (req.method === 'POST') {
    try {
      const payload = {...req.body, createdAt: new Date().toISOString()};
      const result = await createSite(payload);
      return res.status(200).json(result);
    } catch (error) {
      return res.status(500).json({error});
    }
  }
}
