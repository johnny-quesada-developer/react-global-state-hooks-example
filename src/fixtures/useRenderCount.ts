import { useRef } from 'react';

export const useRenderCount = () => {
  const ref = useRef(0);

  ref.current += 1;

  return ref.current;
};
