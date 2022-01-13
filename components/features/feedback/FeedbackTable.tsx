import {Box, Code, Switch} from '@chakra-ui/react';

import {Table, Td, Th, Tr} from '@/components/core/AppTable';
import {Feedback} from '@/models/feedback';

import FeedbackDeleteButton from './FeedbackDeleteButton';

const FeedbackTable = ({feedbacks}: {feedbacks: Feedback[]}) => {
  return (
    <Table>
      <thead>
        <Tr>
          <Th>Name</Th>
          <Th>Feedback</Th>
          <Th>Route</Th>
          <Th>Visible</Th>
          <Th width="50px">{''}</Th>
        </Tr>
      </thead>
      <tbody>
        {feedbacks.map((feedback) => (
          <Box as="tr" key={feedback.id}>
            <Td fontWeight="medium">{feedback.author}</Td>
            <Td>{feedback.comment}</Td>
            <Td>
              {/* feedback.route || */}
              <Code>{'/'}</Code>
            </Td>
            <Td>
              <Switch colorScheme="green" defaultIsChecked={feedback.status === 'active'} />
            </Td>
            <Td>
              <FeedbackDeleteButton feedbackId={feedback.id} />
            </Td>
          </Box>
        ))}
      </tbody>
    </Table>
  );
};

export default FeedbackTable;
