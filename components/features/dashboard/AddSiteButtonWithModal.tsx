import {
  Button,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from '@chakra-ui/react';
import {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';

import {createSite} from '@/lib/firestore';

const AddSiteButtonWithModal = () => {
  const initialRef = useRef(null);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {handleSubmit, control} = useForm({
    defaultValues: {
      site: '',
      url: '',
    },
  });

  const onCreateSite = (values: any) => {
    console.log(values);
    createSite(values);
    onClose();
  };

  return (
    <>
      <Button fontWeight="medium" maxW="200px" onClick={onOpen}>
        Add Your First Site
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Controller
                name="site"
                control={control}
                rules={{
                  required: true,
                }}
                render={({field}) => <Input {...field} placeholder="My site" />}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Link</FormLabel>
              <Controller
                name="url"
                control={control}
                rules={{
                  required: true,
                }}
                render={({field}) => <Input {...field} placeholder="https://website.com" />}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button onClick={onClose} mr={3} fontWeight="medium">
              Cancel
            </Button>
            <Button backgroundColor="#99FFFE" color="#194D4C" fontWeight="medium" type="submit">
              Create
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddSiteButtonWithModal;
