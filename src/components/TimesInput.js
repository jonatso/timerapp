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

export default function TimesInput({ sendTimes, getNewScramble }) {
  const [times, setTimes] = useState([]);
  const [inputTime, setInputTime] = useState('');

  const handleChange = val => setInputTime(val);
  const addTime = event => {
    event.preventDefault();
    setTimes([...times, timeParser(inputTime)]);

    setInputTime('');
    getNewScramble();
  };
  const newRound = () => {
    sendTimes(times);
    setTimes([]);
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
            isDisabled={times.length === 5 || inputTime === ''}
            leftIcon={<FaPlus />}
          >
            Add
          </Button>
          <ResetRound
            resetRound={() => setTimes([])}
            isDisabled={times.length === 0}
          />
          {times.length === 5 && (
            <Button colorScheme="green" mt={3} onClick={newRound}>
              New Round
            </Button>
          )}
        </form>
      </Center>

      <TimeBox
        times={times}
        deleteTime={index => {
          setTimes(prevTimes => prevTimes.filter((time, i) => i !== index));
        }}
      />

      <Center>
        <Text fontSize={'2xl'}>
          {times.length === 5
            ? `Ao5: ${average(times)}`
            : times.length === 4
            ? `BPA: ${bpa(times)}, WPA: ${wpa(times)}`
            : '-'}
        </Text>
      </Center>
      {times.length === 5 && <Confetti />}
    </Box>
  );
}
