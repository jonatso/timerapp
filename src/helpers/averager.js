import { FaMarsStrokeH } from 'react-icons/fa';

export function average(times) {
  return (
    Math.round(
      ((times.reduce((acc, curr) => acc + curr, 0) -
        Math.min(...times) -
        Math.max(...times)) /
        (times.length - 2)) *
        100
    ) / 100
  );
}

export function bpa(times) {
  if (times.length !== 4) {
    return null;
  }
  return (
    Math.round(
      ((times.reduce((acc, curr) => acc + curr, 0) - Math.max(...times)) *
        100) /
        3
    ) / 100
  );
}

export function wpa(times) {
  if (times.length !== 4) {
    return null;
  }
  return (
    Math.round(
      ((times.reduce((acc, curr) => acc + curr, 0) - Math.min(...times)) *
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
