import React, { CSSProperties, useState } from "react";
import Column from "react-column-flex-wrap";
import "./App.css";
import Children from "./components/Children";
import useMonitorDimension from "./hooks/useMonitorDimension";

function App() {
  const [boxes, setBoxes] = useState(8);
  const [effectOn, setEffectOn] = useState(true);
  const [column, setColumn] = useState(true);
  const [wrap, setWrap] = useState(true);
  const [displayHeight, setDisplayHeight] = useState("");
  const [displayWidth, setDisplayWidth] = useState("");
  const id = "sample-column";
  const dependencies = [boxes, column, wrap, effectOn];

  const containerStyle: CSSProperties = {
    display: "flex",
    flexDirection: column ? "column" : "column-reverse",
    flexWrap: wrap ? "wrap" : "wrap-reverse",
  };

  // Style via in-line & class name
  function renderFirstSample() {
    return (
      <Column
        id={id}
        className="sample border-white"
        style={{ ...containerStyle, zIndex: 10 }}
        dependencies={dependencies} // optional dependencies
        effectOn={effectOn}
      >
        <Children count={boxes} color="grey" border="white" />
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
        dependencies={dependencies}
        effectOn={effectOn}
      >
        <Children count={boxes} color="purple" border="blue" />
      </Column>
    );
  }

  // Set label values
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
          <button className="big-button" onClick={() => setColumn(!column)}>
            {"Flex: column " + (column ? "" : "-reverse")}
          </button>
          <button className="big-button" onClick={() => setWrap(!wrap)}>
            {"Flex wrap: wrap " + (wrap ? "" : "-reverse")}
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
