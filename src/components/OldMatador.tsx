import React, { Component } from "react";
import applauseSound1 from "./applause/applause-1.mp3";
import applauseSound2 from "./applause/applause-2.mp3";
import applauseSound3 from "./applause/applause-3.mp3";
import applauseSound4 from "./applause/applause-4.mp3";

interface OldMatadorProps {
  applause: number;
  setMatarodPosition: (position: number) => void;
  matadorPosition: number;
}

interface OldMatadorState {
  previousApplause: number | null;
}

class OldMatador extends Component<OldMatadorProps, OldMatadorState> {
  constructor(props: OldMatadorProps) {
    super(props);
    this.state = {
      previousApplause: null,
    };
    this.handleBullRun = this.handleBullRun.bind(this);
  }

  componentDidMount() {
    document.addEventListener("bullRun", this.handleBullRun as EventListener);
  }

  componentWillUnmount() {
    document.removeEventListener("bullRun", this.handleBullRun as EventListener);
  }

  handleBullRun(event: Event) {
    const customEvent = event as CustomEvent;
    const newPosition = customEvent.detail.position;

    if (newPosition === this.props.matadorPosition) {
      const getRandomPosition = () => Math.floor(Math.random() * 9);
      let newMatadorPosition;

      do {
        newMatadorPosition = getRandomPosition();
      } while (newMatadorPosition === this.props.matadorPosition);

      console.log(`Matador is moving from ${this.props.matadorPosition} to ${newMatadorPosition}`);
      this.props.setMatarodPosition(newMatadorPosition);
    }
  }

  componentDidUpdate(prevProps: OldMatadorProps) {
    if (this.props.applause !== this.state.previousApplause) {
      this.playApplauseSound(this.props.applause);
      this.setState({ previousApplause: this.props.applause });
    }
  }

  shouldComponentUpdate(nextProps: OldMatadorProps, nextState: OldMatadorState) {
   
    if (nextProps.applause === 3 && this.state.previousApplause !== 3) {
      return true;
    }
    return false;
  }

  playApplauseSound(applause: number) {
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
  }

  render() {
    const { applause } = this.props;
    return (
      <div>
        {applause === 3 ? <div>🎉 Old Matador is here! 🎉</div> : <div>🕺 Old Matador</div>}
      </div>
    );
  }
  
}

export default OldMatador;
