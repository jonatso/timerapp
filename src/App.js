import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Center,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import TimesInput from './components/TimesInput';
import Scramble from './components/Scramble';
import TimeSideBar from './components/TimeSideBar';
import { randomScrambleForEvent } from 'cubing/scramble';

function App() {
  const [rounds, setRounds] = useState([]);
  const [scrambleCount, setScrambleCount] = useState(0);
  const [scramble, setScramble] = useState('...loading scramble');
  useEffect(() => {
    randomScrambleForEvent('333').then(scramble =>
      setScramble(scramble.toString())
    );
  }, [scrambleCount]);
  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" p={3} templateColumns="25% 75%">
        <TimeSideBar rounds={rounds} />
        <Box>
          <ColorModeSwitcher
            position="relative"
            top="0"
            right="0"
            float="right"
          />
          <Scramble scramble={scramble} />
          <Center mt={6}>
            <TimesInput
              sendSolves={round =>
                setRounds(prevRounds => [...prevRounds, round])
              }
              getNewScramble={() =>
                setScrambleCount(prevScrambleCount => prevScrambleCount + 1)
              }
              currentScramble={scramble}
            />
          </Center>
        </Box>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
