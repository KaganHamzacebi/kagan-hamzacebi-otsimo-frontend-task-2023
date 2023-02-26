import type {
  Dispatch,
  RefObject,
  SetStateAction
} from 'react';
import { useEffect } from 'react';

/**
 * Hook that alerts clicks the outside of the passed ref
 *
 * @param ref: Reference Component
 * @param callback: Callback function to update when clicked the outside of ref
 */
function useOutsideAlerter(ref: RefObject<HTMLDivElement>, callback: Dispatch<SetStateAction<boolean>>) {
  useEffect(() => {
    // Alert if clicked on outside of element
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Element;
      if(ref.current && !ref.current.contains(target))
        callback(true);
    }

    // Bind the event listener
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      // Unbind the event listener on clean up
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [callback, ref]);
}

export default useOutsideAlerter;