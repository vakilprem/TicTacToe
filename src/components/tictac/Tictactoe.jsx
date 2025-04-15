import React, { useRef, useState } from "react";
import "./tic.css";
import circle_icon from "../Assets/circle.png";
import cross_icon from "../Assets/cross.png";

let data = ["", "", "", "", "", "", "", "", ""];

const Tictactoe = () => {
  let [count, setCount] = useState(0);
  let [lock, setLock] = useState(false);
  let [showPopup, setShowPopup] = useState(false);
  let [winner, setWinner] = useState("");
  let titleRef = useRef(null);
  let box1 = useRef(null);
  let box2 = useRef(null);
  let box3 = useRef(null);
  let box4 = useRef(null);
  let box5 = useRef(null);
  let box6 = useRef(null);
  let box7 = useRef(null);
  let box8 = useRef(null);
  let box9 = useRef(null);

  let box_array = [box1, box2, box3, box4, box5, box6, box7, box8, box9];
  
  const toggle = (e, num) => {
    if (lock) {
      return 0;
    }
    if (count % 2 === 0) {
      e.target.innerHTML = `<img src='${cross_icon}' alt="cross" />`;
      data[num] = "x";
      setCount(++count);
    } else {
      e.target.innerHTML = `<img src='${circle_icon}' alt="circle" />`;
      data[num] = "o";
      setCount(++count);
    }
    checkWin();
  };

  const checkWin = () => {
    if (data[0] === data[1] && data[1] === data[2] && data[2] !== "") {
      won(data[2]);
    } else if (data[3] === data[4] && data[4] === data[5] && data[5] !== "") {
      won(data[5]);
    } else if (data[6] === data[7] && data[7] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[3] && data[3] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (data[1] === data[4] && data[4] === data[7] && data[7] !== "") {
      won(data[7]);
    } else if (data[2] === data[5] && data[5] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[0] === data[4] && data[4] === data[8] && data[8] !== "") {
      won(data[8]);
    } else if (data[2] === data[4] && data[4] === data[6] && data[6] !== "") {
      won(data[6]);
    } else if (count === 8) {
      // Check for draw
      setWinner("draw");
      setShowPopup(true);
      setLock(true);
    }
  };

  const won = (winner) => {
    setLock(true);
    setWinner(winner);
    setShowPopup(true);
    if (winner === "x") {
      titleRef.current.innerHTML = `Congratulation: <img src='${cross_icon}' alt="cross" /> wins`;
    } else {
      titleRef.current.innerHTML = `Congratulation: <img src='${circle_icon}' alt="circle" /> wins`;
    }
  };

  const reset = () => {
    setLock(false);
    setShowPopup(false);
    data = ["", "", "", "", "", "", "", "", ""];
    titleRef.current.innerHTML = "Tic Tac Toe in <span> React </span>";
    box_array.map((e) => {
      e.current.innerHTML = "";
    });
    setCount(0);
  };

  const closePopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="container">
      <h1 className="title" ref={titleRef}>
        Tic Tac Toe in <span>React</span>
      </h1>
      <div className="board">
        <div className="row1">
          <div
            onClick={(e) => {
              toggle(e, 0);
            }}
            className="boxes"
            ref={box1}
          ></div>
          <div
            onClick={(e) => {
              toggle(e, 1);
            }}
            className="boxes"
            ref={box2}
          ></div>
          <div
            onClick={(e) => {
              toggle(e, 2);
            }}
            className="boxes"
            ref={box3}
          ></div>
        </div>
        <div className="row2">
          <div
            onClick={(e) => {
              toggle(e, 3);
            }}
            className="boxes"
            ref={box4}
          ></div>
          <div
            onClick={(e) => {
              toggle(e, 4);
            }}
            className="boxes"
            ref={box5}
          ></div>
          <div
            onClick={(e) => {
              toggle(e, 5);
            }}
            className="boxes"
            ref={box6}
          ></div>
        </div>
        <div className="row3">
          <div
            onClick={(e) => {
              toggle(e, 6);
            }}
            className="boxes"
            ref={box7}
          ></div>
          <div
            onClick={(e) => {
              toggle(e, 7);
            }}
            className="boxes"
            ref={box8}
          ></div>
          <div
            onClick={(e) => {
              toggle(e, 8);
            }}
            className="boxes"
            ref={box9}
          ></div>
        </div>
      </div>
      <button
        onClick={() => {
          reset();
        }}
        className="reset"
      >
        Reset
      </button>

      {showPopup && (
        <div className="popup-overlay">
          <div className="popup">
            <h2>
              {winner === "draw" ? (
                "It's a Draw!"
              ) : (
                <>
                  Winner is:{" "}
                  <img
                    src={winner === "x" ? cross_icon : circle_icon}
                    alt={winner === "x" ? "cross" : "circle"}
                  />
                </>
              )}
            </h2>
            <button onClick={closePopup}>Close</button>
            <button onClick={reset}>Play Again</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tictactoe;