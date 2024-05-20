import { v4 as uuidv4 } from "uuid";
import { Component } from "react";
import { Helmet, HelmetProvider } from "react-helmet-async";

import "./App.css";

const initialState = {
  dotList: [],
  poppedDotList: [],
};

class App extends Component {
  state = initialState;

  handleClick = (event) => {
    this.setState((prevState) => ({
      dotList: [...prevState.dotList, { x: event.clientX, y: event.clientY }],
    }));
  };

  handleUndo = () => {
    this.setState((prevState) => ({
      dotList: prevState.dotList.slice(0, -1),
      poppedDotList: [...prevState.poppedDotList, prevState.dotList.pop()],
    }));
  };

  handleRedo = () => {
    const { poppedDotList } = this.state;

    const redoDot = poppedDotList.pop();

    this.setState((prevState) => ({
      dotList: [...prevState.dotList, redoDot],
      poppedDotList,
    }));
  };

  handleClear = () => {
    this.setState(initialState);
  };

  renderDotsContainer = () => {
    const { dotList } = this.state;

    return (
      <div className="dots-container" onClick={this.handleClick}>
        {dotList.map((eachDot) => (
          <div
            className="dot"
            key={uuidv4()}
            style={{
              left: eachDot.x - 5,
              top: eachDot.y - 5,
            }}
          ></div>
        ))}
      </div>
    );
  };

  renderButtons = () => {
    const { dotList, poppedDotList } = this.state;

    return (
      <div className="buttons-container">
        <button
          type="button"
          className="undo-button"
          onClick={this.handleUndo}
          disabled={dotList.length === 0}
        >
          Undo
        </button>
        <button
          type="button"
          className="redo-button"
          onClick={this.handleRedo}
          disabled={poppedDotList.length === 0}
        >
          Redo
        </button>
        <br />
        <button
          type="button"
          className="clear-button"
          onClick={this.handleClear}
          disabled={dotList.length === 0}
        >
          Clear all
        </button>
      </div>
    );
  };

  render() {
    return (
      <div className="app-container">
        <HelmetProvider>
          <Helmet>
            <meta charSet="utf-8" />
            <title>Dots App</title>
          </Helmet>
        </HelmetProvider>
        <h1 className="app-heading">Dots App</h1>
        <p className="instruction">
          Click / Tap anywhere inside the below area to put a dot there!
        </p>
        {this.renderDotsContainer()}
        {this.renderButtons()}
      </div>
    );
  }
}

export default App;
