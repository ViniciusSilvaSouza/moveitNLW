import { createContext, useState, ReactNode } from 'react';
import challenges from '../../challenges.json';


interface Challenge {
    type: 'body' | 'eye';
    description: string;
    amount: number;
}
interface ChallengeContextData {
    level: number;
    currentExperience: number;
    experienceToNextLevel: number;
    challengesCompleted: number;
    activeChallenge: Challenge;
    LevelUp: () => void;
    startNewChallenge: () => void;
    resetChallenge: () => void;
    completeChallenge: () => void;
}

interface ChallengesProviderProps {
    children: ReactNode
}

export const ChallengesContext = createContext({} as ChallengeContextData);

export function ChallengesProvider({ children }: ChallengesProviderProps) {
    const [level, setLevel] = useState(1);
    const [currentExperience, setcurrentExperience] = useState(0);
    const [challengesCompleted, setchallengesCompleted] = useState(0);

    const [activeChallenge, setactiveChallenge] = useState(null);

    const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

    function LevelUp() {
        setLevel(level + 1);
    }

    function startNewChallenge() {
        const randcomChallengeIndex = Math.floor(Math.random() * challenges.length);
        const challenge = challenges[randcomChallengeIndex];

        setactiveChallenge(challenge);
    }

    function resetChallenge() {
        setactiveChallenge(null);
    }

    function completeChallenge() {
        if (!activeChallenge) {
            return;
        }

        const { amount } = activeChallenge;
        let finalExperience = currentExperience + amount;

        if (finalExperience >= experienceToNextLevel) {

            finalExperience = finalExperience - experienceToNextLevel;
            LevelUp();
        }

        setcurrentExperience(finalExperience);
        setactiveChallenge(null);
        setchallengesCompleted(challengesCompleted + 1);
    }

    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                activeChallenge,
                experienceToNextLevel,
                LevelUp,
                startNewChallenge,
                resetChallenge,
                completeChallenge
            }}>
            {children}
        </ChallengesContext.Provider>
    );

}