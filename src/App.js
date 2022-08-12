import React, { useEffect, useRef, useState } from "react";

// create a game of life component that will be rendered in the DOM
//create a function for a random grid
const cols = 30;
const rows = 30;
const randomGrid = () => {
  const grid = [];
  for (let i = 0; i < rows; i++) {
    const row = [];
    for (let j = 0; j < cols; j++) {
      row.push(Math.floor(Math.random() * 2));
    }
    grid.push(row);
  }
  return grid;
};
const positions = [
  [0, 1],
  [0, -1],
  [1, -1],
  [-1, 1],
  [1, 1],
  [-1, -1],
  [1, 0],
  [-1, 0],
];

function App() {
  const [grid, setGrid] = useState();
  const [start, setStart] = useState(false);
  const startRef = useRef(start);
  startRef.current = start;

  useEffect(() => {
    setGrid(randomGrid());
  }, []);

  function runSimulation() {
    if (!startRef.current) {
      return;
    }
    setGrid((g) => {
      const next = g.map((row, i) => {
        return row.map((cell, j) => {
          let sum = 0;
          positions.forEach((position) => {
            const x = i + position[0];
            const y = j + position[1];
            if (x >= 0 && x < rows && y >= 0 && y < cols) {
              sum += g[x][y];
            }
          });
          if (sum < 2 || sum > 3) {
            return 0;
          }
          if (sum === 3) {
            return 1;
          }
          return g[i][j];
        });
      });
      return next;
    });
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          spaceBetween: "10px",
          margin: "2rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button
          style={{
            marginRight: "1rem",
            backgroundColor: "#099268",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
          onClick={() => {
            setStart(!start);
            if (!start) {
              startRef.current = true;
            }
            setInterval(() => {
              runSimulation(grid);
            }, 1000);
          }}
        >
          {start ? "Stop" : "Start"}
        </button>
        <button
          style={{
            marginLeft: "1rem",
            backgroundColor: "#099268",
            color: "white",
            fontWeight: "bold",
            fontSize: "1rem",
            padding: "0.5rem 1rem",
            cursor: "pointer",
          }}
          onClick={() => setGrid(randomGrid)}
        >
          Reset
        </button>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {grid &&
          grid.map((rows, i) =>
            rows.map((col, k) => (
              <div
                style={{
                  width: 30,
                  height: 30,
                  backgroundColor: grid[i][k] ? "#099268" : "",
                  border: "1px solid black",
                }}
              />
            ))
          )}
      </div>
    </>
  );
}

export default App;
