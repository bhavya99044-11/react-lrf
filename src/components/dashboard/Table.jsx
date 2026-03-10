import React from "react";

const Table = ({ headers = [], data = [], rowKey = "id" }) => {
  if (!headers.length) {
    return null;
  }

  return (
    <div className="w-full bg-white">
      <div
        className="grid bg-gray-200 rounded-xl px-6 py-3 text-sm font-bold text-header-black"
        style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
      >
        {headers.map((header) => (
          <div key={header.key || header.label}>{header.label}</div>
        ))}
      </div>

      {data.map((row, index) => (
        <div
          key={row[rowKey] ?? index}
          className="grid items-center px-6 py-4 text-sm text-gray-700"
          style={{ gridTemplateColumns: `repeat(${headers.length}, minmax(0, 1fr))` }}
        >
          {headers.map((header) => (
            <div key={header.key || header.label} className={header.cellClassName}>
              {header.render ? header.render(row) : row[header.key]}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Table;
