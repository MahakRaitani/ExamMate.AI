import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

// =====================
// MERMAID CONFIG
// =====================
mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

// =====================
// CLEAN INPUT
// =====================
const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram
    .replace(/\r\n/g, "\n")
    .trim();

  if (!clean.startsWith("graph")) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

// =====================
// FIX DUPLICATE NODES
// =====================
const autoFixNodes = (diagram) => {
  let index = 0;
  const used = new Map();

  return diagram.replace(/\[(.*?)\]/g, (match, label) => {
    const key = label.trim();

    if (used.has(key)) {
      return used.get(key);
    }

    index++;
    const id = `N${index}`;
    const node = `${id}["${key}"]`;

    used.set(key, node);
    return node;
  });
};

// =====================
// COMPONENT
// =====================
function MermaidSetup({ diagram }) {
  const containerRef = useRef(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setError(false);
        containerRef.current.innerHTML = "";

        const uniqueId =
          "mermaid-" + Math.random().toString(36).substring(2, 9);

        // sanitize + fix structure
        const safeChart = autoFixNodes(cleanMermaidChart(diagram));

        const { svg } = await mermaid.render(uniqueId, safeChart);

        if (containerRef.current) {
          containerRef.current.innerHTML = svg;
        }
      } catch (err) {
        console.error("Mermaid render failed:", err);
        setError(true);
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">

      {/* ERROR STATE */}
      {error && (
        <div className="text-red-500 text-sm mb-2">
          ⚠️ Diagram could not be rendered
        </div>
      )}

      {/* EMPTY STATE */}
      {!diagram && (
        <div className="text-gray-400 text-sm">
          No diagram available
        </div>
      )}

      {/* RENDER AREA */}
      <div ref={containerRef} />
    </div>
  );
}

export default MermaidSetup;