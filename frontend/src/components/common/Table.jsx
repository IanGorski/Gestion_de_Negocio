import { memo, useMemo } from "react";
import { FixedSizeList as List } from "react-window";
import AutoSizer from "react-virtualized-auto-sizer";
import "./Table.css";

const ROW_HEIGHT = 44;
const VIRTUALIZE_THRESHOLD = 100; // Usa render tradicional si hay pocas filas

function RawTable({ headers, data }) {
  return (
    <table className="table">
      <thead>
        <tr>
          {headers.map((header, index) => (
            <th key={index} className="table-header">
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td key={cellIndex} className="table-cell">
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function VirtualizedBody({ headers, data }) {
  const itemData = useMemo(() => ({ headers, data }), [headers, data]);

  const Row = ({ index, style }) => {
    const row = itemData.data[index];
    return (
      <tr style={style}>
        {row.map((cell, ci) => (
          <td key={ci} className="table-cell">
            {cell}
          </td>
        ))}
      </tr>
    );
  };

  return (
    <div className="table-virtual-wrapper">
      <table className="table">
        <thead>
          <tr>
            {headers.map((h, i) => (
              <th key={i} className="table-header">
                {h}
              </th>
            ))}
          </tr>
        </thead>
      </table>
      <div className="table-virtual-scroll" style={{ height: 480 }}>
        <AutoSizer>
          {({ height, width }) => (
            <List
              height={height}
              width={width}
              itemCount={data.length}
              itemSize={ROW_HEIGHT}
            >
              {({ index, style }) => <Row index={index} style={style} />}
            </List>
          )}
        </AutoSizer>
      </div>
    </div>
  );
}

function Table({ headers, data }) {
  const virtualize = Array.isArray(data) && data.length > VIRTUALIZE_THRESHOLD;
  if (!virtualize) return <RawTable headers={headers} data={data} />;
  return <VirtualizedBody headers={headers} data={data} />;
}

export default memo(Table);
