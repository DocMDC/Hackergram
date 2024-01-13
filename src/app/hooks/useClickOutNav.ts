import { useEffect } from 'react';
type NavRefType = React.RefObject<HTMLUListElement>
type ButtonRefType = React.RefObject<HTMLButtonElement>
type CallBackType = () => void

export default function useClickOutNav(navRef: NavRefType, buttonRef: ButtonRefType, callback: CallBackType): void {
  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
        if (buttonRef.current && buttonRef.current.contains(event.target as Node)) {
            return
        }

        if (navRef.current && !navRef.current.contains(event.target as Node)) {
            callback();
        }
    }

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [navRef, buttonRef, callback]);
}
