import { useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Grid,
  theme,
  Center,
  Button,
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import RoundView from './components/RoundView';
import Scramble from './components/Scramble';
import TimeSideBar from './components/TimeSideBar';
import { randomScrambleForEvent } from 'cubing/scramble';

function App() {
  const [rounds, setRounds] = useState(() => {
    const savedRounds = localStorage.getItem('rounds');
    if (savedRounds) {
      return JSON.parse(savedRounds);
    }
    return [];
  });
  const [useForm, setUseForm] = useState(true);
  const [scrambleCount, setScrambleCount] = useState(0);
  const [scramble, setScramble] = useState('...loading scramble');
  useEffect(() => {
    randomScrambleForEvent('333').then(scramble =>
      setScramble(scramble.toString())
    );
  }, [scrambleCount]);

  useEffect(() => {
    localStorage.setItem('rounds', JSON.stringify(rounds));
  }, [rounds]);

  return (
    <ChakraProvider theme={theme}>
      <Grid minH="100vh" p={3} templateColumns="28% 72%">
        <TimeSideBar
          rounds={rounds}
          deleteRound={index => {
            setRounds(prevRounds =>
              prevRounds.filter((round, i) => i !== index)
            );
          }}
        />
        <Box>
          <ColorModeSwitcher
            position="relative"
            top="0"
            right="0"
            float="right"
          />
          <Button
            position="relative"
            top="0"
            right="0"
            float="right"
            colorScheme="blue"
            onClick={() => setUseForm(!useForm)}
          >
            Toggle entry
          </Button>
          <Scramble scramble={scramble} />
          <Center mt={6}>
            <RoundView
              sendSolves={round =>
                setRounds(prevRounds => [...prevRounds, round])
              }
              getNewScramble={() =>
                setScrambleCount(prevScrambleCount => prevScrambleCount + 1)
              }
              currentScramble={scramble}
              useForm={useForm}
            />
          </Center>
        </Box>
      </Grid>
    </ChakraProvider>
  );
}

export default App;
