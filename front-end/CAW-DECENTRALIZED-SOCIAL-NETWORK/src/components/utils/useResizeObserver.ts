import {useEffect, useRef} from 'react';
import ResizeObserver from 'resize-observer-polyfill';

const useObserver = ({callback, element}: any) => {

    const current = element && element.current;

    const observer = useRef(null) as any;

    useEffect(() => {
        // if we are already observing old element
        if (observer && observer.current && current) {
            observer.current.unobserve(current);
        }
        const resizeObserverOrPolyfill = ResizeObserver;
        observer.current = new resizeObserverOrPolyfill(callback);
        observe();

        return () => {
            if (observer && observer.current && element &&
                element.current) {
                observer.current.unobserve(element.current);
            }
        };
    }, [current]);

    const observe = () => {
        if (element && element.current && observer.current) {
            observer.current.observe(element.current);
        }
    };

};


export default useObserver;
