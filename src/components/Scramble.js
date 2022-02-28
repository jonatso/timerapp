import { randomScrambleForEvent } from 'cubing/scramble';
import { useEffect, useState } from 'react';
import { Center, Text } from '@chakra-ui/react';

export default function Scramble({ scrambleCount }) {
  const [scramble, setScramble] = useState('...loading scramble');
  useEffect(() => {
    randomScrambleForEvent('333').then(scramble =>
      setScramble(scramble.toString())
    );
  }, [scrambleCount]);
  return (
    <Center>
      <Text fontSize="4xl">{scramble}</Text>
    </Center>
  );
}
