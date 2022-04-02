import {
  FormControl,
  NumberInput,
  NumberInputField,
  useColorModeValue,
} from '@chakra-ui/react';

import { useState } from 'react';

export default function TimeForm({ addSolve, isDisabled }) {
  const [inputTime, setInputTime] = useState('');

  const handleChange = val => {
    setInputTime(val);
  };

  const addTime = event => {
    event.preventDefault();
    addSolve(inputTime);

    setInputTime('');
  };

  return (
    <form onSubmit={addTime}>
      <FormControl>
        <NumberInput
          max={1000}
          min={0}
          size="lg"
          value={inputTime}
          onChange={handleChange}
          isDisabled={isDisabled}
        >
          <NumberInputField
            id="time"
            bg={useColorModeValue('white', 'gray.800')}
          />
        </NumberInput>
      </FormControl>
    </form>
  );
}
