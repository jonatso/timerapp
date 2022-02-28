import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
  Grid,
  Box,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';

import { useState, useRef } from 'react';

export default function TimeBox({ times, deleteTime }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onCloseDelete = () => {
    deleteTime(selectedIndex);

    setIsOpen(false);
  };
  const cancelRef = useRef();

  return (
    <>
      <Grid
        templateColumns="repeat(5, 1fr)"
        mt={3}
        minWidth={750}
        minHeight={85}
      >
        {times.map((time, index) => (
          <Box
            key={index}
            textAlign={'center'}
            onClick={() => {
              setSelectedIndex(index);
              setIsOpen(true);
            }}
            bg={'gray.50'}
            _dark={{ bg: 'gray.900' }}
            margin={1.5}
            borderRadius={5}
            _hover={{
              background: 'gray.200',
              cursor: 'pointer',
            }}
          >
            <Text
              fontSize="5xl"
              color={
                time === Math.min(...times)
                  ? 'green.500'
                  : time === Math.max(...times)
                  ? 'red.500'
                  : 'default'
              }
            >
              {time}
            </Text>
          </Box>
        ))}
      </Grid>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete time
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? This will delete the selected time (
              {times[selectedIndex]}).
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onCloseDelete} ml={3}>
                Reset
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
