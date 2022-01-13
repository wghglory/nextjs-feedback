import {auth} from 'firebase-admin';
import type {NextApiRequest, NextApiResponse} from 'next';

import {getUserFeedback} from '@/lib/firebase-server-apis';
import {Feedback} from '@/models/feedback';

export default async function handler(req: NextApiRequest, res: NextApiResponse<{items: Feedback[]} | unknown>) {
  const authorization = req.headers.authorization ?? '';
  const token = authorization?.replace(`Bearer `, '');

  try {
    const {uid} = await auth().verifyIdToken(token);
    const feedbacks = await getUserFeedback(uid);
    res.status(200).json({items: feedbacks});
  } catch (error) {
    res.status(500).json({error});
  }
}
