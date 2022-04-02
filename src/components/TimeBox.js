import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Button,
  Grid,
  Box,
  Text,
  Tooltip,
} from '@chakra-ui/react';

import { useState, useRef } from 'react';

export default function TimeBox({ solves, deleteTime }) {
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
        {solves.map((solve, index) => (
          <Tooltip
            hasArrow
            label={solve.scramble}
            placement="top"
            fontSize="lg"
          >
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
                  solve.time === Math.min(...solves.map(t => t.time))
                    ? 'green.500'
                    : solve.time === Math.max(...solves.map(t => t.time))
                    ? 'red.500'
                    : 'default'
                }
              >
                {solve.time}
              </Text>
            </Box>
          </Tooltip>
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
            <AlertDialogCloseButton />

            <AlertDialogBody>
              Are you sure? This will delete the selected time (
              {solves[selectedIndex] && solves[selectedIndex].time}).
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={onCloseDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </>
  );
}
