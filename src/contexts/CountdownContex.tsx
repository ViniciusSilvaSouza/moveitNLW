import { createContext, ReactNode, useContext, useEffect, useState } from 'react';
import { ChallengesContext } from './ChallengeContext';

interface CountdownContexData {
    minutes: number
    seconds: number
    hasFinished: boolean
    isActive: boolean
    startCountdown: () => void
    resetCountdown: () => void
}

interface CountdownProviderProps {
    children: ReactNode
}

export const CountdownContext = createContext({} as CountdownContexData)

let countDownTimeOut: NodeJS.Timeout;

export function CountdownProvider({ children }: CountdownProviderProps) {

    const { startNewChallenge } = useContext(ChallengesContext);

    const timeValue = 0.1 * 30; // Valor original 25 * 60;
    const [time, setTime] = useState(timeValue);
    const [isActive, setIsActive] = useState(false);
    const [hasFinished, setHasFinished] = useState(false);

    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    function startCountdown() {
        setIsActive(true);
    }

    useEffect(() => {
        if (isActive && time > 0) {
            countDownTimeOut = setTimeout(() => {
                setTime(time - 1);
            }, 1000);
        } else if (isActive && time === 0) {
            setHasFinished(true);
            setIsActive(false);
            startNewChallenge();
        }
    }, [isActive, time])

    function resetCountdown() {
        clearTimeout(countDownTimeOut);
        setIsActive(false);
        setTime(timeValue);
        setHasFinished(false);
    }


    return (
        <CountdownContext.Provider value={{
            minutes,
            seconds,
            hasFinished,
            isActive,
            startCountdown,
            resetCountdown
        }}>
            {children}
        </CountdownContext.Provider>
    )
}