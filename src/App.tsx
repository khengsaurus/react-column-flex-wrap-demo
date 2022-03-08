import React, { CSSProperties, useState } from "react";
import "./App.css";
import Column from "react-column-flex-wrap";
import useMonitorDimension from "./hooks/useMonitorDimension";

function App() {
  const [boxes, setBoxes] = useState(8);
  const [effectOn, setEffectOn] = useState(true);
  const [constantWidth, setConstantWidth] = useState(false);
  const [column, setColumn] = useState(true);
  const [wrap, setWrap] = useState(true);
  const [boxBorder, setBoxBorder] = useState(false);
  const [boxMargin, setBoxMargin] = useState(true);
  const [boxPadding, setBoxPadding] = useState(true);
  const [displayHeight, setDisplayHeight] = useState("");
  const [displayWidth, setDisplayWidth] = useState("");
  const arr = Array.from(Array(Math.max(0, boxes)));
  const id = "sample-column";
  const dependencies = [
    boxes,
    boxBorder,
    boxMargin,
    boxPadding,
    constantWidth,
    column,
    wrap,
  ];

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: column ? "column" : "column-reverse",
    flexWrap: wrap ? "wrap" : "wrap-reverse",
  };

  function renderFirstSample() {
    return (
      <Column
        id={id}
        className="sample border-white"
        style={{ ...containerStyle, zIndex: 10 }}
        constantWidth={constantWidth}
        dependencies={dependencies} // optional dependencies
        effectOn={effectOn}
      >
        {renderChildren("grey", "white")}
      </Column>
    );
  }

  // Style via props
  function renderSecondSample() {
    return (
      <Column
        className="sample border-blue"
        style={{ ...containerStyle, zIndex: 1 }} // when !effectOn component will still have styles
        columnReverse={!column}
        wrapReverse={!wrap}
        constantWidth={constantWidth}
        dependencies={dependencies}
        effectOn={effectOn}
      >
        {renderChildren("purple", "blue")}
      </Column>
    );
  }

  function renderChildren(color: string, border: string) {
    return (
      <>
        {arr.map((_, index) => (
          <div
            className={`box ${color} ${boxBorder ? `border-${border}` : ""}`}
            key={`box-${color}-${index}`}
            style={{
              padding: boxPadding ? index : 0,
              margin: boxMargin ? "4px" : 0,
            }}
          >
            {index + 1}
          </div>
        ))}
      </>
    );
  }

  // To set label values
  useMonitorDimension(id, "height", setDisplayHeight, dependencies);
  useMonitorDimension(id, "width", setDisplayWidth, dependencies);

  function renderLegend() {
    return (
      <div className="column legend">
        <div className="content">
          <p>{"Behavior: " + (effectOn ? "modified" : "default")}</p>
          <p>{"Column height: " + displayHeight + " (max 80vh)"}</p>
          <p>{"Column width: " + displayWidth}</p>
          <p>{"Grey boxes: " + boxes}</p>
          <p>{"Purple boxes: " + boxes}</p>
          <div className="row">
            <button onClick={() => setBoxes(boxes - 1)} disabled={boxes === 5}>
              {"-"}
            </button>
            <button onClick={() => setBoxes(boxes + 1)} disabled={boxes === 25}>
              {"+"}
            </button>
          </div>
          <button className="big-button" onClick={() => setEffectOn(!effectOn)}>
            {"Toggle effect " + (effectOn ? "off" : "on")}
          </button>
          <button
            className="big-button"
            onClick={() => setConstantWidth(!constantWidth)}
          >
            {"Toggle constant width " + (constantWidth ? "off" : "on")}
          </button>
          <button className="big-button" onClick={() => setColumn(!column)}>
            {"Flex: column " + (column ? "" : "-reverse")}
          </button>
          <button className="big-button" onClick={() => setWrap(!wrap)}>
            {"Flex wrap: wrap " + (wrap ? "" : "-reverse")}
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
          Note how with default behavior the columns do not expand fully to push
          adjacent elements when their children flow onto the next column.
        </p>
      </div>
    );
  }

  return (
    <div className="App" style={{ display: "flex" }}>
      <div className="row">
        {renderFirstSample()}
        {renderSecondSample()}
      </div>
      {renderLegend()}
    </div>
  );
}

export default App;
