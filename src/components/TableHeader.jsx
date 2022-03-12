import React from "react";
import { TableCell, Button } from "@mui/material";
import { ArrowDownward, ArrowUpward } from "@mui/icons-material";

function TableHeader({ columns, handleClick, arrowOrder }) {
  return (
    <>
      {columns.map((column, index) => (
        <TableCell
          key={column.id}
          align={column.align}
          style={{ minWidth: column.minWidth }}
        >
          <div>
            <span>
              <Button onClick={() => handleClick(column.id)}>
                {column.label}
              </Button>
            </span>
            <span>
              {arrowOrder[index] && (
                <ArrowDownward style={{ opacity: 0.75, color: "#3f50b5" }} />
              )}
              {!arrowOrder[index] && (
                <ArrowUpward style={{ opacity: 0.75, color: "#3f50b5" }} />
              )}
            </span>
          </div>
        </TableCell>
      ))}
    </>
  );
}

export default TableHeader;
