import React from "react";

interface ChildrenProps {
  count: number;
  color: string;
  border: string;
}

const Children = ({ count, color, border }: ChildrenProps) => {
  const arr = Array.from(Array(count).keys());

  return (
    <>
      {arr.map((_, index) => (
        <div
          className={`box ${color} border-${border}`}
          key={`box-${color}-${index}`}
          style={{
            padding: index,
            margin: "4px",
          }}
        >
          {index + 1}
        </div>
      ))}
    </>
  );
};

export default Children;
