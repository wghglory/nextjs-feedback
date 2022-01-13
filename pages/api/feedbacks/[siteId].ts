// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type {NextApiRequest, NextApiResponse} from 'next';

import {getAllFeedbacks} from '@/lib/firebase-server-apis';
import {Feedback} from '@/models/feedback';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{items: Feedback[]} | unknown>) {
  const siteId = req.query.siteId as string;

  try {
    const feedbacks = await getAllFeedbacks(siteId);
    res.status(200).json({items: feedbacks});
  } catch (error: unknown) {
    res.status(500).json({error});
  }
}
