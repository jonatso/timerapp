import { useTimer } from 'use-timer';
import { Button, Text } from '@chakra-ui/react';
import { useState } from 'react';

export default function StopWatch({ addSolve }) {
  const { time, start, pause, reset, status } = useTimer({
    interval: 10,
    step: 0.01,
  });
  const [sync, setSync] = useState(false);

  function handleKeyUp(event) {
    if (event.key === ' ') {
      if (!sync) {
        reset();
        start();
        setSync(true);
      } else {
        setSync(false);
      }
    }
  }

  function handleKeyDown(event) {
    if (event.key === ' ') {
      if (status === 'RUNNING') {
        pause();
        addSolve(time.toFixed(2));
      }
    }
  }

  return (
    <div onKeyUp={handleKeyUp} onKeyDown={handleKeyDown}>
      <Button>Focus</Button>
      <Text fontSize="3xl">{time.toFixed(2)}</Text>
    </div>
  );
}
