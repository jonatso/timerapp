import { Box, Text } from '@chakra-ui/react';
import { average } from '../helpers/averager';
import {
  Table,
  TableCaption,
  Thead,
  Tr,
  Th,
  Tbody,
  Td,
} from '@chakra-ui/react';

export default function TimeSideBar({ rounds }) {
  return (
    <Box>
      <Table variant="simple" height={'auto'} size="lg">
        <Thead>
          <Tr>
            <Th isNumeric>Average</Th>
            <Th isNumeric>Best time</Th>
            <Th isNumeric>Worst time</Th>
          </Tr>
        </Thead>
        <Tbody>
          {rounds.map(round => (
            <Tr key={round.id}>
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
  );
}
