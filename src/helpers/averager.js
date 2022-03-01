import { FaMarsStrokeH } from 'react-icons/fa';

export function average(round) {
  return (
    Math.round(
      ((round.reduce((acc, curr) => acc + curr.time, 0) -
        Math.min(...round.map(t => t.time)) -
        Math.max(...round.map(t => t.time))) /
        (round.length - 2)) *
        100
    ) / 100
  );
}

export function bpa(round) {
  if (round.length !== 4) {
    return null;
  }
  return (
    Math.round(
      ((round.reduce((acc, curr) => acc + curr.time, 0) -
        Math.max(...round.map(t => t.time))) *
        100) /
        3
    ) / 100
  );
}

export function wpa(round) {
  if (round.length !== 4) {
    return null;
  }
  return (
    Math.round(
      ((round.reduce((acc, curr) => acc + curr.time, 0) -
        Math.min(...round.map(t => t.time))) *
        100) /
        3
    ) / 100
  );
}

export function timeParser(timeString) {
  if (timeString.includes('.')) {
    return Math.round(timeString * 100) / 100;
  } else {
    return timeString / 100;
  }
}
