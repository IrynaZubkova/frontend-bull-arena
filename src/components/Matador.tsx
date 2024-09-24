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

export const Matador: React.FC<MatadorProps> = React.memo(({ applause, setMatarodPosition, matadorPosition }) => {
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
        console.log("Matador is mounted");

        const handleBullRun = (event: CustomEvent) => {
            const newPosition = event.detail.position;

            if (newPosition === matadorPosition) {
                const getRandomPosition = () => Math.floor(Math.random() * 9);
                let newMatadorPosition;

                do {
                    newMatadorPosition = getRandomPosition();
                } while (newMatadorPosition === matadorPosition);

                setMatarodPosition(newMatadorPosition);
                console.log(`Matador is moving from ${matadorPosition} to ${newMatadorPosition}`);
            }
        };

        document.addEventListener("bullRun", handleBullRun as EventListener);

        return () => {
            document.removeEventListener("bullRun", handleBullRun as EventListener);
            console.log("Matador is unmounted");
        };
    }, [matadorPosition, setMatarodPosition]);

    useEffect(() => {
        if (applause === 3 && applause !== previousApplause) {
            console.log("Matador is reacting to applause");
            setPreviousApplause(3);
        } else if (applause !== 3) {
            setPreviousApplause(applause);
        }

        // Play sound when applause changes and is not equal to previous value
        if (applause !== previousApplause) {
            playApplauseSound(applause);
        }
    }, [applause, previousApplause]);

    return (
        <div>
            {applause === 3 ? <div>🎉 Matador is here! 🎉</div> : <div>🕺 Matador</div>}
        </div>
    );
});
