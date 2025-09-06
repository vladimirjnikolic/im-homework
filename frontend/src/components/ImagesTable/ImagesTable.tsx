import * as React from "react";

import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { IFileProcessing } from "model/IFileProcessing";

interface IImagesTable {
  items: IFileProcessing[];
}

// Component to display the images and their statuses in a table
// If there are no items, it returns null
// If an item has a downloadUrl, it renders a link to download the image
export const ImagesTable = ({ items }: IImagesTable) => {
  if (items.length === 0) {
    return null;
  }
  return (
    <TableContainer>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>File Name</TableCell>
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Download Link</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map((item) => (
            <TableRow
              key={item.fileName}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {item.fileName}
              </TableCell>
              <TableCell align="right">{item.status}</TableCell>
              <TableCell align="right">
                {typeof item.downloadUrl === "string" &&
                item.downloadUrl.trim() !== "" ? (
                  <a
                    href={`${item.downloadUrl}`}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download
                  </a>
                ) : (
                  "N/A"
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
