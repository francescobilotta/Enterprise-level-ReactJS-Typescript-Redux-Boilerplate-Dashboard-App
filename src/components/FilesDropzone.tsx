/* eslint-disable react/jsx-props-no-spreading */
import {
  Box,
  Button,
  IconButton,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Theme,
  Tooltip,
  Typography,
} from "@mui/material";
import * as React from "react";
import { useDropzone } from "react-dropzone";
import {
  Copy as CopyIcon,
  MoreVertical as MoreVerticalIcon,
} from "react-feather";
import PerfectScrollbar from "react-perfect-scrollbar";

import { bytesToSize } from "../utils";

const style = {
  actions: {
    "& > * + *": {
      ml: 2,
    },
    display: "flex",
    justifyContent: "flex-end",
    mt: 2,
  },
  dragActive: {
    bgcolor: (theme: Theme) => theme.palette.action.active,
    opacity: 0.5,
  },
  dropZone: {
    "&:hover": {
      bgcolor: (theme: Theme) => theme.palette.action.hover,
      cursor: "pointer",
      opacity: 0.5,
    },
    alignItems: "center",
    border: (theme: Theme) => `1px dashed ${theme.palette.divider}`,
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    outline: "none",
    p: 6,
  },
  image: {
    width: 130,
  },
  info: {
    mt: 1,
  },
  list: {
    maxHeight: 320,
  },
  root: {},
};

function FilesDropzone() {
  const [files, setFiles] = React.useState<any[]>([]);

  const handleDrop = React.useCallback((acceptedFiles: any) => {
    setFiles((prevFiles) => [...prevFiles].concat(acceptedFiles));
  }, []);
  const handleRemoveAll = () => {
    setFiles([]);
  };
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop: handleDrop,
  });
  return (
    <Box sx={{ ...style.root }}>
      <div>
        <Box
          sx={
            isDragActive
              ? { ...style.dropZone, ...style.dragActive }
              : { ...style.dropZone }
          }
          {...getRootProps()}
        >
          <input {...getInputProps()} />
          <div>
            <Box
              alt="Select file"
              component="img"
              src="/images/products/add_file.svg"
              sx={{ ...style.image }}
            />
          </div>
          <div>
            <Typography gutterBottom variant="h5">
              Select files
            </Typography>
            <Box mt={2}>
              <Typography color="textPrimary" variant="body1">
                Drop files here or click{" "}
                <Link href="#/" underline="always">
                  browse
                </Link>{" "}
                thorough your machine
              </Typography>
            </Box>
          </div>
        </Box>
      </div>
      {files.length > 0 && (
        <div>
          <PerfectScrollbar options={{ suppressScrollX: true }}>
            <List sx={{ ...style.list }}>
              {files.map((file, i) => (
                <ListItem
                  key={files.indexOf(file)}
                  divider={i < files.length - 1}
                >
                  <ListItemIcon>
                    <CopyIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={file.name}
                    primaryTypographyProps={{ variant: "h5" }}
                    secondary={bytesToSize(file.size)}
                  />
                  <Tooltip title="More options">
                    <IconButton edge="end">
                      <MoreVerticalIcon />
                    </IconButton>
                  </Tooltip>
                </ListItem>
              ))}
            </List>
          </PerfectScrollbar>
          <Box sx={{ ...style.actions }}>
            <Button size="small" onClick={handleRemoveAll}>
              Remove all
            </Button>
            <Button color="secondary" size="small" variant="contained">
              Upload files
            </Button>
          </Box>
        </div>
      )}
    </Box>
  );
}

export default FilesDropzone;
