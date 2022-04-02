import {
  Center,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputField,
  useColorModeValue,
  Box,
  Button,
  Select,
  HStack,
  VStack,
  Text,
} from '@chakra-ui/react';

import { useState } from 'react';
import { useEffect } from 'react/cjs/react.production.min';
import { average, bpa, wpa, timeParser } from '../helpers/averager';
import ResetRound from './ResetRound';
import TimeBox from './TimeBox';
import TimeForm from './TimeForm';
import StopWatch from './StopWatch';

export default function RoundView({
  sendSolves,
  getNewScramble,
  currentScramble,
  useForm,
}) {
  const [solves, setSolves] = useState([]);

  const submitRound = () => {
    sendSolves(solves);
    setSolves([]);
  };
  const addSolve = inputTime => {
    setSolves([
      ...solves,
      { time: timeParser(inputTime), scramble: currentScramble },
    ]);
    getNewScramble();
  };

  return (
    <Box
      p={3}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'2xl'}
      rounded={'lg'}
      width="fit-content"
    >
      <VStack>
        <Center>
          {useForm ? (
            <TimeForm addSolve={addSolve} isDisabled={solves.length === 5} />
          ) : (
            <StopWatch addSolve={addSolve} />
          )}
        </Center>
        <Center>
          <ResetRound
            resetRound={() => setSolves([])}
            isDisabled={solves.length === 0}
          />

          <Button
            colorScheme="green"
            mt={3}
            onClick={submitRound}
            isDisabled={solves.length !== 5}
          >
            Submit round
          </Button>
        </Center>
      </VStack>

      <TimeBox
        solves={solves}
        deleteTime={index => {
          setSolves(prevSolves => prevSolves.filter((time, i) => i !== index));
        }}
      />

      <Center>
        <Text fontSize={'2xl'}>
          {solves.length === 5
            ? `Ao5: ${average(solves)}`
            : solves.length === 4
            ? `BPA: ${bpa(solves)}, WPA: ${wpa(solves)}`
            : '-'}
        </Text>
      </Center>
    </Box>
  );
}
