import { AlertDialogCloseButton, Box, Text } from '@chakra-ui/react';
import { average } from '../helpers/averager';
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogOverlay,
  Button,
} from '@chakra-ui/react';

import { useState, useRef } from 'react';

export default function TimeSideBar({ rounds, deleteRound }) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const onCloseDelete = () => {
    deleteRound(selectedIndex);

    setIsOpen(false);
  };
  const cancelRef = useRef();
  return (
    <>
      <Box>
        <Table variant="simple" size="lg" height={'auto'}>
          <Thead>
            <Tr>
              <Th>No.</Th>
              <Th isNumeric>Average</Th>
              <Th isNumeric>Best time</Th>
              <Th isNumeric>Worst time</Th>
            </Tr>
          </Thead>
          <Tbody>
            {rounds.map((round, index) => (
              <Tr
                key={round.id}
                onClick={() => {
                  setSelectedIndex(index);
                  setIsOpen(true);
                }}
                _hover={{
                  background: 'gray.100',
                  cursor: 'pointer',
                }}
              >
                <Td>{index + 1}</Td>
                <Td fontSize="xl" isNumeric>
                  {average(round)}
                </Td>
                <Td fontSize="xl" isNumeric>
                  {Math.min(...round.map(t => t.time))}
                </Td>
                <Td fontSize="xl" isNumeric>
                  {Math.max(...round.map(t => t.time))}
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Round {selectedIndex + 1}
            </AlertDialogHeader>
            <AlertDialogCloseButton />

            <AlertDialogBody>
              {/* Click delete to delete round {selectedIndex + 1}. */}
              <Table>
                <Thead>
                  <Tr>
                    <Th isNumeric>No.</Th>
                    <Th isNumeric>Time</Th>
                    <Th>Scramble</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {rounds[selectedIndex] &&
                    rounds[selectedIndex].map((solve, index) => (
                      <Tr key={index}>
                        <Td isNumeric>{index + 1}</Td>
                        <Td fontSize="xl" isNumeric>
                          {solve.time}
                        </Td>
                        <Td>{solve.scramble}</Td>
                      </Tr>
                    ))}
                </Tbody>
              </Table>
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
