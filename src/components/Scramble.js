import { Center, Text } from '@chakra-ui/react';

export default function Scramble({ scramble }) {
  return (
    <Center>
      <Text fontSize="4xl">{scramble}</Text>
    </Center>
  );
}
