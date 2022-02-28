import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';
import { FaTrash } from 'react-icons/fa';

import { useState, useRef } from 'react';

export default function ResetRound({ resetRound, isDisabled }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onCloseReset = () => {
    resetRound();
    setIsOpen(false);
  };
  const cancelRef = useRef();

  return (
    <>
      <Button
        colorScheme="red"
        onClick={() => setIsOpen(true)}
        leftIcon={<FaTrash />}
        mt={3}
        ml={3}
        mr={3}
        isDisabled={isDisabled}
      >
        Reset
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Reset round
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will delete all times in this round.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onCloseReset} ml={3}>
                Reset
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
