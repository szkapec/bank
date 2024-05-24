import React, { useEffect } from "react";
import { runForceGraph } from "./forceGraphGenerator";
import './forceGraph.scss'
const ForceGraph = ({ linksData, nodesData, nodeHoverTooltip }: any)  => {
  const containerRef = React.useRef(null);


  useEffect(() => {
    let destroyFn;
    if (containerRef.current) {
      const { destroy } = runForceGraph(containerRef.current, linksData, nodesData, nodeHoverTooltip);
      destroyFn = destroy;
    }
    return destroyFn;
  }, [containerRef.current]);
  
  return <div ref={containerRef} className="container1" />;
}

export default React.memo(ForceGraph)