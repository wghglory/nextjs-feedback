import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Icon,
  IconButton,
} from '@chakra-ui/react';
import {useRef, useState} from 'react';
import {AiFillDelete} from 'react-icons/ai';
import {useQueryClient} from 'react-query';

import {deleteFeedback} from '@/lib/firebase-web-apis';

const FeedbackDeleteButton = ({feedbackId}: {feedbackId: string}) => {
  const [isOpen, setIsOpen] = useState(false);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const queryClient = useQueryClient();

  const onClose = () => setIsOpen(false);

  const onDelete = () => {
    deleteFeedback(feedbackId);

    queryClient.invalidateQueries('getFeedbacks');

    onClose();
  };

  return (
    <>
      <IconButton
        aria-label="Delete feedback"
        icon={<Icon as={AiFillDelete} />}
        variant="ghost"
        onClick={() => setIsOpen(true)}
      />
      <AlertDialog isOpen={isOpen} leastDestructiveRef={cancelRef} onClose={onClose}>
        <AlertDialogOverlay />
        <AlertDialogContent>
          <AlertDialogHeader fontSize="lg" fontWeight="bold">
            Delete Feedback
          </AlertDialogHeader>
          <AlertDialogBody>Are you sure? You can’t undo this action afterwards.</AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="red" onClick={onDelete} ml={3}>
              Delete
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FeedbackDeleteButton;
