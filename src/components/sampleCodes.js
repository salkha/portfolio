const sampleCodes = {
  simpleCodeOne: {
    name: "Simple Code One",
    id: "code1",
    code: `function toRad(value) {
  return (value * Math.PI) / 180;
}

function calculateDistance(lat1, lng1, lat2, lng2) {
  const R = 6371;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lng2 - lng1);
  const l1 = toRad(lat1);
  const l2 = toRad(lat2);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(l1) * Math.cos(l2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = R * c;
  return d;
}

export function sortPlacesByDistance(places, lat, lon) {
  const sortedPlaces = [...places];
  sortedPlaces.sort((a, b) => {
    const distanceA = calculateDistance(lat, lon, a.lat, a.lon);
    const distanceB = calculateDistance(lat, lon, b.lat, b.lon);
    return distanceA - distanceB;
  });
  return sortedPlaces;
}`
  },
  simpleCodeTwo: {
    name: "Simple Code Two",
    id: "code2",
    code: `function add(a, b) {
  return a + b;
}
console.log(add(2, 3));`
  },
  simpleCodeThree: {
    name: "Simple Code Three",
    id: "code3",
    code: `function isEven(n) {
  return n % 2 === 0;
}
console.log(isEven(4)); // true`
  },
  simpleCodeFour: {
    name: "Simple Code Four",
    id: "code4",
    code: `function reverseString(str) {
  return str.split('').reverse().join('');
}
console.log(reverseString('hello'));`
  },
  simpleCodeFive: {
    name: "Simple Code Five",
    id: "code5",
    code: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5));`
  },
  simpleCodeSix: {
    name: "Simple Code Six",
    id: "code6",
    code: `const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum);`
  }
};

export default sampleCodes;