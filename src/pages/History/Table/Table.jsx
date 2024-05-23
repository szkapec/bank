import TextWrapper from "components/Contents/TextWrapper";
import React from "react";
import { useTable, useExpanded } from "react-table";

const TableSearch = ({ columns, data, lastBookElementRef }) => {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    // state: { expanded },
  } = useTable(
    {
      columns: columns || [],
      data: data || [],
      initialState: { expanded: { 0: false } },
    },
    useExpanded
  );

  return (
    <>
      <table {...getTableProps()}>
        <thead>
          {headerGroups.map((headerGroup) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column) => (
                <th {...column.getHeaderProps()}>{column.render("Header")}</th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {data.length === 0 && (
            <div className="no-data">
              <TextWrapper label="history.noData" />
            </div>
          )}
          {rows.map((row, index) => {
            prepareRow(row);
            return (
              <tr
                ref={data.length === index + 1 ? lastBookElementRef : null}
                key={row._id}
                className={`${row.depth >= 1 ? "row-depth" : "row"}`}
                {...row.getRowProps()}
              >
                {row.cells.map((cell) => {
                  return (
                    <td
                      style={{ padding: "20px 0.5rem" }}
                      {...cell.getCellProps()}
                    >
                      {cell.render("Cell")}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default React.memo(TableSearch);
