import React, { useCallback, useMemo } from "react";
import data from "./data.json";
import ForceGraph from "./ForceGraph";

const GraphContainer = () => {

  const newData = useMemo(() => {
    return data;
  }, []);

  const nodeHoverTooltip = useCallback((node: any) => {
    return `<div>     
      <b>${node.name}</b>
    </div>`;
  }, []);

  return (
    <div className="App">
      <header className="App-header">Force Graph Example</header>
      <section className="Main">
        <ForceGraph
          linksData={newData.links}
          nodesData={newData.nodes}
          nodeHoverTooltip={nodeHoverTooltip}
        />
      </section>
    </div>
  );
};

export default React.memo(GraphContainer);
