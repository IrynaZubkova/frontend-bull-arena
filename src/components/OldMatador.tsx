import React, { useEffect, useRef, useState } from "react";
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
    const previousApplause = useRef<number>(0);  // Store the previous applause value
    const [shouldRerender, setShouldRerender] = useState(false); // Control re-render

    // Function to play applause sound based on the applause value
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
        // Handle matador movement when the "bullRun" event is triggered
        const handleBullRun = (event: CustomEvent) => {
            const newPosition = event.detail.position;

            if (newPosition === matadorPosition) {
                let newMatadorPosition;
                do {
                    newMatadorPosition = Math.floor(Math.random() * 9);
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
        // If applause value has changed
        if (applause !== previousApplause.current) {
            playApplauseSound(applause);
            previousApplause.current = applause;

            // Trigger re-render if applause equals 3
            if (applause === 3) {
                setShouldRerender(!shouldRerender);
            }
        }
    }, [applause]);

    return (
        <div>
            {applause === 3 ? <div>🎉 Matador is here with applause 3! 🎉</div> : <div>🕺 Matador</div>}
        </div>
    );
};

// Memoize the component to avoid unnecessary re-renders
export const Matador = React.memo(MatadorComponent, (prevProps, nextProps) => {
    // Allow re-render only if applause has changed and equals 3
    if (nextProps.applause === 3 && prevProps.applause !== 3) {
        return false; // Allow re-render
    }
    // Prevent re-render in all other cases
    return true;
});
