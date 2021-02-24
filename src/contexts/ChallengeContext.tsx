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
    startNewChallenge: () => void;
    resetChallenge: () => void;
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
    return (
        <ChallengesContext.Provider
            value={{
                level,
                currentExperience,
                challengesCompleted,
                LevelUp,
                startNewChallenge,
                activeChallenge,
                resetChallenge,
                experienceToNextLevel
            }}>
            {children}
        </ChallengesContext.Provider>
    );

}