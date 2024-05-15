"use client";
import { RefObject, useCallback, useEffect, useRef } from "react";
import styles from "./page.module.css";

const COEF = 0.005;
const SIZE = 100;
const CENTER = {
  x: 400,
  y: 300,
};

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

let time = 0;

const origin = [
  {
    x: CENTER.x + SIZE * Math.sin(Math.PI / 3),
    y: CENTER.y + SIZE * Math.cos(Math.PI / 3),
  },
  {
    x: CENTER.x - SIZE * Math.sin(Math.PI / 3),
    y: CENTER.y + SIZE * Math.cos(Math.PI / 3),
  },
  {
    x: CENTER.x,
    y: CENTER.y - SIZE,
  },
];
export default function Loader() {
  const center = useRef<SVGCircleElement>(null);
  let MOUSE = { x: 400, y: 300 };
  let STRENTH = 20;
  let circles = [
    {
      el: useRef(null),
      path: { ref: useRef(null), points: [], color: "red" },
      position: { ...origin[0] },

      speed: {
        x: -STRENTH * Math.cos(Math.PI / 3),
        y: STRENTH * Math.sin(Math.PI / 3),
      },
    },
    {
      el: useRef(null),
      path: { ref: useRef(null), points: [], color: "blue" },
      position: { ...origin[1] },
      speed: {
        x: -STRENTH * Math.cos(Math.PI / 3),
        y: -STRENTH * Math.sin(Math.PI / 3),
      },
    },
    {
      el: useRef(null),
      path: { ref: useRef(null), points: [], color: "green" },
      position: { ...origin[2] },
      speed: { x: STRENTH, y: 0 },
    },
  ];

  let reqId: number | null = null;

  useEffect(() => {
    animateOut();
    return () => {
      resetAnimation();
    };
  });

  const setCircle = useCallback(
    (
      ref: RefObject<SVGCircleElement>,
      x: number,
      y: number,
      r: number = 30
    ) => {
      ref.current?.setAttribute("cx", x.toString());
      ref.current?.setAttribute("cy", y.toString());
      ref.current?.setAttribute("r", Math.min(Math.max(r, 1), 100).toString());
    },
    []
  );

  const setPath = useCallback(
    (
      path: {
        ref: RefObject<SVGCircleElement>;
        points: { x: number; y: number }[];
      },
      position: { x: number; y: number },
      speed: { x: number; y: number }
    ) => {
      path.points.push({
        x: position.x,
        y: position.y,
      });
      if (path.points.length > 500) {
        path.points.shift();
      }
      path.ref.current?.setAttribute(
        "d",
        `M ${path.points[0].x} ${path.points[0].y} L ${path.points
          .map((point) => `${point.x} ${point.y} `)
          .join("L")}`
      );
    },
    []
  );

  const animateOut = () => {
    time += 0.1;
    circles = circles.map((circle, index) => {
      const x = circle.position.x + circle.speed.x;
      const y = circle.position.y + circle.speed.y;
      const distance = {
        x: x - CENTER.x,
        y: y - CENTER.y,
      };
      const spin = index % 2 === 0 ? 1 : -1;

      setCircle(
        circle.el,
        x,
        y,
        (spin * (circle.speed.x + circle.speed.y)) / 3 + 10
      );
      setPath(circle.path, circle.position, circle.speed);

      return {
        ...circle,
        position: { x, y },
        speed: {
          x: circle.speed.x - COEF * distance.x,
          y: circle.speed.y - COEF * distance.y,
        },
      };
    });
    CENTER.x = lerp(CENTER.x, MOUSE.x, 0.1);
    CENTER.y = lerp(CENTER.y, MOUSE.y, 0.1);

    CENTER.x +=
      circles.reduce((acc, circle) => acc + circle.position.x - CENTER.x, 0) /
      500;
    CENTER.y +=
      circles.reduce((acc, circle) => acc + circle.position.y - CENTER.y, 0) /
      500;
    setCircle(center, CENTER.x, CENTER.y);

    reqId = window.requestAnimationFrame(animateOut);
  };

  const resetAnimation = () => {
    if (reqId) window.cancelAnimationFrame(reqId);
    circles = circles.map((circle) => {
      return { ...circle, ...origin };
    });
  };

  const handleHouseMove = (e: React.MouseEvent<SVGCircleElement>) => {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;

    setCircle(center, CENTER.x, CENTER.y);
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.box}>
          <svg>
            {circles.map((circle, index) => {
              return (
                <>
                  {/* <circle
                    className={styles.electron}
                    key={index}
                    ref={circle.el}
                    opacity={0.6}
                  /> */}
                  <path
                    className={styles.path}
                    ref={circle.path.ref}
                    stroke="#60dafb"
                    strokeWidth="20"
                    fill="none"
                  />
                </>
              );
            })}
            <circle className={styles.center} ref={center} r="30" />
            <circle
              cx="400"
              cy="300"
              r="200"
              fill="transparent"
              onMouseMove={handleHouseMove}
              onMouseLeave={() => {
                MOUSE.x = 400;
                MOUSE.y = 300;
              }}
            />
          </svg>
        </div>
      </div>
    </div>
  );
}
