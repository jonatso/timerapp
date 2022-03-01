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
  Grid,
  Text,
} from '@chakra-ui/react';

import { useState } from 'react';
import Confetti from 'react-confetti';
import { FaPlus, FaTrash } from 'react-icons/fa';
import { average, bpa, wpa, timeParser } from '../helpers/averager';
import ResetRound from './ResetRound';
import TimeBox from './TimeBox';
import TimeSideBar from './TimeSideBar';

export default function TimesInput({
  sendSolves,
  getNewScramble,
  currentScramble,
}) {
  const [solves, setSolves] = useState([]);
  const [inputTime, setInputTime] = useState('');

  const handleChange = val => setInputTime(val);
  const addTime = event => {
    event.preventDefault();
    setSolves([
      ...solves,
      { time: timeParser(inputTime), scramble: currentScramble },
    ]);

    setInputTime('');
    getNewScramble();
  };
  const newRound = () => {
    sendSolves(solves);
    setSolves([]);
  };

  return (
    <Box
      p={3}
      bg={useColorModeValue('white', 'gray.700')}
      boxShadow={'2xl'}
      rounded={'lg'}
      width="fit-content"
    >
      <Center>
        <form onSubmit={addTime}>
          <FormControl>
            <HStack>
              <VStack>
                <FormLabel htmlFor="time">Time</FormLabel>
                <NumberInput
                  max={1000}
                  min={0}
                  size="lg"
                  value={inputTime}
                  onChange={handleChange}
                >
                  <NumberInputField
                    id="time"
                    bg={useColorModeValue('white', 'gray.800')}
                  />
                </NumberInput>
              </VStack>
              <VStack>
                <FormLabel htmlFor="penalty">Penalty</FormLabel>
                <Select id="penalty" size="lg">
                  <option>OK</option>
                  <option>+2</option>
                  <option>DNF</option>
                </Select>
              </VStack>
            </HStack>
          </FormControl>
          <Button
            colorScheme="teal"
            mt={3}
            type="submit"
            isDisabled={solves.length === 5 || inputTime === ''}
            leftIcon={<FaPlus />}
          >
            Add
          </Button>
          <ResetRound
            resetRound={() => setSolves([])}
            isDisabled={solves.length === 0}
          />
          {solves.length === 5 && (
            <Button colorScheme="green" mt={3} onClick={newRound}>
              New Round
            </Button>
          )}
        </form>
      </Center>

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
      {solves.length === 5 && <Confetti />}
    </Box>
  );
}
