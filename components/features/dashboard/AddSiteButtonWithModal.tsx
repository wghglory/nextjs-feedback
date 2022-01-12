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
  useToast,
} from '@chakra-ui/react';
import React, {useRef} from 'react';
import {Controller, useForm} from 'react-hook-form';
import {useMutation, useQueryClient} from 'react-query';

import {useAuth} from '@/components/auth/AuthProvider';
import {createSite} from '@/lib/firebase-web-apis';
import {Site} from '@/models/site';

const AddSiteButtonWithModal = ({children}: {children: React.ReactNode}) => {
  const {user} = useAuth();
  const initialRef = useRef(null);
  const {isOpen, onOpen, onClose} = useDisclosure();
  const {handleSubmit, control, reset} = useForm({
    defaultValues: {
      name: '',
      url: '',
    } as Site,
  });
  const toast = useToast();
  const queryClient = useQueryClient();

  const postSiteMutation = useMutation((site: Site) =>
    fetch('/api/sites', {
      method: 'POST',
      body: JSON.stringify(site),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
        Authorization: `Bear ${user?.accessToken}`,
      },
    }),
  );

  const closeModal = () => {
    onClose();
    reset();
  };

  const onCreateSite = ({name, url}: Site) => {
    const newSite = {
      authorId: user?.uid ?? '',
      name,
      url,
    };

    // createSite(newSite); // web inserts database directly.

    postSiteMutation.mutate(newSite, {
      onSuccess() {
        toast({
          title: 'Success!',
          description: "We've added your site.",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });

        queryClient.invalidateQueries('getSites');

        closeModal();
      },
    });
  };

  return (
    <>
      <Button
        onClick={onOpen}
        backgroundColor="gray.900"
        color="white"
        fontWeight="medium"
        _hover={{bg: 'gray.700'}}
        _active={{
          bg: 'gray.800',
          transform: 'scale(0.95)',
        }}
      >
        {children}
      </Button>
      <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={closeModal}>
        <ModalOverlay />
        <ModalContent as="form" onSubmit={handleSubmit(onCreateSite)}>
          <ModalHeader fontWeight="bold">Add Site</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Controller
                name="name"
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
            <Button onClick={closeModal} mr={3} fontWeight="medium">
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
