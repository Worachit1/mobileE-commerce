import React, {useEffect, useRef} from "react";
import { useIsomorphicLayoutEffect } from "usehooks-ts";

export function useInterval (callback: () => void, delay: number | null) {
    const saveCallback = useRef(callback)

    // remember the last calllback if it changes
    useIsomorphicLayoutEffect(() => {
        saveCallback.current = callback
    }, [callback])
    
    // set up the interval
    useEffect(() => {
        // don't scheduel if no delay is specified
        // Note : 0 is a value for delay

        if(delay === null) {
            return
        }

        const id = setInterval(() => {
            saveCallback.current()
        }, delay)
        return () => {
            clearInterval
        }
    }, [delay])
}