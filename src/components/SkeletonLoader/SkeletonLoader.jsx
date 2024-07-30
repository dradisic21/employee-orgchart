import * as React from "react";
import { TableCell, TableRow, Skeleton } from "@mui/material";
import "./SkeletonLoader.scss";

export function SkeletonLoader({ rowsNum }) {
  return [...Array(rowsNum)].map((row, index) => (
    <TableRow key={index} sx={{ width: 1200, margin: '0 auto 16px' }}>
      <TableCell component="th" scope="row">
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
      <TableCell>
        <Skeleton animation="wave" variant="text" />
      </TableCell>
    </TableRow>
  ));
}
