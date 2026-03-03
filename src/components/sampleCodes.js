const sampleCodes = {
  simpleCodeOne: {
    name: "Code One",
    id: "code1",
    code_description: "This code calculates the distance between two geographical points using the Haversine formula and sorts a list of places based on their distance from a given latitude and longitude.",
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
    return distanceA -  distanceB;
  });
  return sortedPlaces;
}`
  },
  simpleCodeTwo: {
    name: "Code Two",
    id: "code2",
    code_description: "I built this reusable Modal component to solve a real company need: we required a flexible, accessible dialog for confirmations and forms that could be controlled from anywhere in our app. This solution made it easy for our team to add modals for user actions, improving both our workflow and the user experience.",
    code: `import { forwardRef, useImperativeHandle, useRef } from 'react';
import { createPortal } from 'react-dom';

const Modal = forwardRef(function Modal({ children }, ref) {
  const dialog = useRef();

  useImperativeHandle(ref, () => {
    return {
      open: () => {
        dialog.current.showModal();
      },
      close: () => {
        dialog.current.close();
      },
    };
  });

  return createPortal(
    <dialog className="modal" ref={dialog}>
      {children}
    </dialog>,
    document.getElementById('modal')
  );
});

export default Modal;
`
  },
  simpleCodeThree: {
    name: "Code Three",
    id: "code3",
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
    return distanceA -  distanceB;
  });
  return sortedPlaces;
}`
  },
  simpleCodeFour: {
    name: "Code Four",
    id: "code4",
    code: `function reverseString(str) {
  return str.split('').reverse().join('');
}
console.log(reverseString('hello'));`
  },
  simpleCodeFive: {
    name: "Code Five",
    id: "code5",
    code: `function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
console.log(factorial(5));`
  },
  simpleCodeSix: {
    name: "Code Six",
    id: "code6",
    code: `const arr = [1, 2, 3, 4, 5];
const sum = arr.reduce((acc, val) => acc + val, 0);
console.log(sum);`
  }
};

export default sampleCodes;