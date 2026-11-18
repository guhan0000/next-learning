// client side component
"use client";

import { useState } from "react";

export default function counter() {
  const [count, setCount] = useState(0);
  return (
    <main>
      <h1>{count}</h1>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        +
      </button>
    </main>
  );
}
