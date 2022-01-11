// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

import {createSite, getAllSites} from '@/lib/firebase-server-apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  if (req.method === 'GET') {
    const sites = await getAllSites();
    return res.status(200).json({sites});
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
