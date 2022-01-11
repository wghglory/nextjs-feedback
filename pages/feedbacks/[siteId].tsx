import {Box, Button, FormControl, FormLabel, Input} from '@chakra-ui/react';
import {InferGetStaticPropsType, NextPage} from 'next';
import {useRouter} from 'next/router';
import {FormEvent, useState} from 'react';
import {v4} from 'uuid';

import {useAuth} from '@/components/auth/AuthProvider';
import FeedbackItem from '@/components/features/feedback/FeedbackItem';
import {getAllFeedbacks, getAllSites} from '@/lib/firebase-server-apis';
import {createFeedback} from '@/lib/firebase-web-apis';
import {Feedback} from '@/models/feedback';

export const getStaticProps = async (context: any) => {
  const siteId = context.params.siteId;
  const feedbacks = await getAllFeedbacks(siteId);

  return {
    props: {
      initialFeedbacks: feedbacks,
    },
  };
};

export async function getStaticPaths() {
  const sites = await getAllSites();
  const paths = sites.map((site) => ({
    params: {
      siteId: site.id,
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

const FeedbacksPage: NextPage<{initialFeedbacks: Feedback[]}> = ({
  initialFeedbacks = [],
}: InferGetStaticPropsType<typeof getStaticProps>) => {
  const auth = useAuth();
  const router = useRouter();
  const [comment, setComment] = useState('');
  const [allFeedbacks, setAllFeedbacks] = useState(initialFeedbacks);

  // const {data} = useQuery('getFeedbacks', () => {
  //   return fetch(`/api/feedbacks/${router.query.siteId}`).then((res) => res.json());
  // });

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();

    const newFeedback = {
      id: v4(),
      author: auth.user?.name,
      authorId: auth.user?.uid,
      siteId: router.query.siteId,
      comment,
      createdAt: new Date().toISOString(),
      provider: auth.user?.provider,
      status: 'pending',
    } as Feedback;

    setAllFeedbacks([newFeedback, ...allFeedbacks]);
    createFeedback(newFeedback);
  };

  return (
    <Box display="flex" flexDirection="column" width="full" maxWidth="700px" margin="0 auto">
      {auth.user && (
        <Box as="form" onSubmit={onSubmit}>
          <FormControl my={8}>
            <FormLabel htmlFor="comment">Comment</FormLabel>
            <Input value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Leave a comment" />
            <Button mt={4} type="submit" fontWeight="medium">
              Add Comment
            </Button>
          </FormControl>
        </Box>
      )}
      {allFeedbacks.map((feedback: Feedback) => (
        <FeedbackItem key={feedback.id} {...feedback} />
      ))}
    </Box>
  );
};

export default FeedbacksPage;
