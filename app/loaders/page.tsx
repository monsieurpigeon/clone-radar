"use client";
import { RefObject, useCallback, useEffect, useRef } from "react";
import styles from "./page.module.css";

const COEF = 0.005;
const CENTER = {
  x: 400,
  y: 300,
};

const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

let time = 0;

const origin = [
  {
    x: CENTER.x + 100,
    y: CENTER.y,
  },
  {
    x: CENTER.x,
    y: CENTER.y + 100,
  },
  {
    x: CENTER.x - 100,
    y: CENTER.y,
  },
  {
    x: CENTER.x,
    y: CENTER.y - 100,
  },
];
export default function Loader() {
  const center = useRef<SVGCircleElement>(null);
  let MOUSE = { x: 0, y: 0 };
  let STRENTH = 9;
  let circles = [
    {
      el: useRef(null),
      path: useRef(null),
      position: { ...origin[0] },
      speed: { x: 0, y: STRENTH },
    },
    {
      el: useRef(null),
      path: useRef(null),
      position: { ...origin[1] },
      speed: { x: STRENTH, y: 0 },
    },
    {
      el: useRef(null),
      path: useRef(null),
      position: { ...origin[2] },
      speed: { x: 0, y: STRENTH },
    },
    {
      el: useRef(null),
      path: useRef(null),
      position: { ...origin[3] },
      speed: { x: -STRENTH, y: 0 },
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
      r: number = 10
    ) => {
      ref.current?.setAttribute("cx", x.toString());
      ref.current?.setAttribute("cy", y.toString());
      ref.current?.setAttribute("r", Math.min(Math.max(r, 1), 100).toString());
    },
    []
  );

  const setPath = useCallback(
    (
      ref: RefObject<SVGCircleElement>,
      position: { x: number; y: number },
      speed: { x: number; y: number }
    ) => {
      const previous = ref.current?.getAttribute("d");
      if (!previous) {
        ref.current?.setAttribute("d", `M ${position.x} ${position.y}`);
      } else {
        const array = previous.split("L").slice(-500);
        ref.current?.setAttribute(
          "d",
          `M ${array[0]} L ${array.join("L")} L ${position.x} ${position.y}`
        );
      }
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

  const handleHouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    MOUSE.x = e.clientX;
    MOUSE.y = e.clientY;

    setCircle(center, CENTER.x, CENTER.y);
  };

  return (
    <div className={styles.container}>
      <div className={styles.body}>
        <div className={styles.box} onMouseMove={handleHouseMove}>
          <svg>
            {circles.map((circle, index) => {
              return (
                <>
                  <circle
                    className={styles.electron}
                    key={index}
                    ref={circle.el}
                  />
                  <path ref={circle.path} stroke="white" fill="none" />
                </>
              );
            })}
            <circle className={styles.center} ref={center} />
          </svg>
        </div>
      </div>
    </div>
  );
}
