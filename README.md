This React project implements a "matador" component that reacts to applause levels and a custom "bullRun" event. The component plays different applause sounds based on the applause value and moves the matador to a new position when the event occurs. If applause reaches level 3, a celebratory message is displayed. To optimize performance, rerenders are controlled with React.memo, ensuring the component only updates when necessary, such as when applause equals 3 or the matador changes position. The project adds an interactive experience with sounds and visual feedback based on events and state changes.






