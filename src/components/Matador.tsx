import React, { useEffect, useState } from "react";
import applauseSound1 from "./applause/applause-1.mp3";
import applauseSound2 from "./applause/applause-2.mp3";
import applauseSound3 from "./applause/applause-3.mp3";
import applauseSound4 from "./applause/applause-4.mp3";

interface MatadorProps {
    applause: number;
    setMatarodPosition: (position: number) => void;
    matadorPosition: number;
}

const MatadorComponent: React.FC<MatadorProps> = ({ applause, setMatarodPosition, matadorPosition }) => {
    const [previousApplause, setPreviousApplause] = useState<number | null>(null);

    // Function to play applause sound based on applause value
    const playApplauseSound = (applause: number) => {
        const audio = new Audio();
        switch (applause) {
            case 0:
                audio.src = applauseSound1;
                break;
            case 1:
                audio.src = applauseSound2;
                break;
            case 2:
                audio.src = applauseSound3;
                break;
            case 3:
                audio.src = applauseSound4;
                break;
            default:
                return;
        }
        audio.play();
    };

    useEffect(() => {
        const handleBullRun = (event: CustomEvent) => {
            const newPosition = event.detail.position;

            if (newPosition === matadorPosition) {
                const getRandomPosition = () => Math.floor(Math.random() * 9);
                let newMatadorPosition;

                do {
                    newMatadorPosition = getRandomPosition();
                } while (newMatadorPosition === matadorPosition);

                setMatarodPosition(newMatadorPosition);
            }
        };

        document.addEventListener("bullRun", handleBullRun as EventListener);

        return () => {
            document.removeEventListener("bullRun", handleBullRun as EventListener);
        };
    }, [matadorPosition, setMatarodPosition]);

    useEffect(() => {
        if (applause !== previousApplause) {
            playApplauseSound(applause);
            setPreviousApplause(applause);
        }
    }, [applause, previousApplause]);

    return (
        <div>
            {applause === 3 ? <div>🎉 Matador is here! 🎉</div> : <div>🕺 Matador</div>}
        </div>
    );
};

// Memoizing the component to prevent unnecessary re-renders
export const Matador = React.memo(MatadorComponent, (prevProps, nextProps) => {
    // Re-render only if applause changes and becomes 3
    if (nextProps.applause === 3 && prevProps.applause !== 3) {
        return false; // Allow re-render
    }
    // Prevent re-render in all other cases
    return true;
});
