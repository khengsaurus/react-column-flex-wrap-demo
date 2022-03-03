import React, { CSSProperties, useState } from "react";
import { Column } from "react-column-flex-wrap";
import "./App.css";

function App() {
  const [boxes, setBoxes] = useState(11);
  const [effectOn, setEffectOn] = useState(true);
  const [constantWidth, setConstantWidth] = useState(false);
  const [column, setColumn] = useState(true);
  const [wrap, setWrap] = useState(true);
  const [boxBorder, setBoxBorder] = useState(false);
  const [boxMargin, setBoxMargin] = useState(true);
  const [boxPadding, setBoxPadding] = useState(true);
  const arr = Array.from(Array(Math.max(0, boxes)));

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: column ? "column" : "column-reverse",
    flexWrap: wrap ? "wrap" : "wrap-reverse",
  };

  function renderEffectSample() {
    return (
      <Column
        className="sample border-white"
        style={{ ...containerStyle, zIndex: 10 }}
        dependencies={[boxes, constantWidth, column, wrap]} // optional dependencies
        effectOn={effectOn}
        constantWidth={constantWidth}
      >
        {arr.map((_, index) => (
          <div
            className={`box grey ${boxBorder ? "border-white" : ""}`}
            key={`box-grey-${index}`}
            style={{
              padding: boxPadding ? index : 0,
              margin: boxMargin ? "4px" : 0,
            }}
          >
            {index + 1}
          </div>
        ))}
      </Column>
    );
  }

  function renderDefaultSample() {
    return (
      <div
        className="sample border-blue"
        style={{ ...containerStyle, zIndex: 1 }}
      >
        {arr.map((_, index) => (
          <div
            className={`box purple ${boxBorder ? "border-blue" : ""}`}
            key={`box-purple-${index}`}
            style={{
              padding: boxPadding ? index : 0,
              margin: boxMargin ? "4px" : 0,
            }}
          >
            {index + 1}
          </div>
        ))}
      </div>
    );
  }

  function renderLegend() {
    return (
      <div className="column legend">
        <p>{`Behavior: ${effectOn ? "modified" : "default"}`}</p>
        <p>{`Max column height: 80vh`}</p>
        <p>{`Grey boxes: ${boxes}`}</p>
        <p>{`Purple boxes: ${boxes}`}</p>
        <div className="legend-buttons">
          <button onClick={() => setBoxes(boxes - 1)} disabled={boxes === 5}>
            {"-"}
          </button>
          <button onClick={() => setBoxes(boxes + 1)} disabled={boxes === 35}>
            {"+"}
          </button>
          <button className="big-button" onClick={() => setEffectOn(!effectOn)}>
            {`Toggle effect ${effectOn ? "off" : "on"}`}
          </button>
          <button
            className="big-button"
            onClick={() => setConstantWidth(!constantWidth)}
          >
            {`Toggle constant width ${constantWidth ? "off" : "on"}`}
          </button>
          <button className="big-button" onClick={() => setColumn(!column)}>
            {`Flex: column${column ? "" : "-reverse"}`}
          </button>
          <button className="big-button" onClick={() => setWrap(!wrap)}>
            {`Flex wrap: wrap${wrap ? "" : "-reverse"}`}
          </button>
          <button
            className="big-button"
            onClick={() => setBoxBorder(!boxBorder)}
          >
            {`Box border: ${boxBorder ? "on" : "off"}`}
          </button>
          <button
            className="big-button"
            onClick={() => setBoxMargin(!boxMargin)}
          >
            {`Box margin: ${boxMargin ? "4px" : "0px"}`}
          </button>
          <button
            className="big-button"
            onClick={() => setBoxPadding(!boxPadding)}
          >
            {`Incremental box padding: ${boxPadding ? "on" : "off"}`}
          </button>
        </div>
        <p>
          For comparison, the blue box is composed of simple div's with default
          column wrap behavior.
          <br />
          <br /> Note that with default behavior the white container does not
          expand fully to push the blue container to the right when its children
          flow onto the next column.
        </p>
      </div>
    );
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      <div className="row">
        {renderEffectSample()}
        {renderDefaultSample()}
      </div>
      {renderLegend()}
    </div>
  );
}

export default App;
