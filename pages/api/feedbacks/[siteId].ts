// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

import {getAllFeedbacks} from '@/lib/firebase-server-apis';

export default async function handler(req: NextApiRequest, res: NextApiResponse<any>) {
  const siteId = req.query.siteId as string;

  try {
    const feedbacks = await getAllFeedbacks(siteId);
    console.log(feedbacks);
    res.status(200).json({feedbacks});
  } catch (error) {
    res.status(500).json({error});
  }
}
