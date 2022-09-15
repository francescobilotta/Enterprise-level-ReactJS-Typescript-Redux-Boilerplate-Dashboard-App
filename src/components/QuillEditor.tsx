import { Box, Theme } from "@mui/material";
import * as React from "react";
import ReactQuill from "react-quill";

const style = {
  editor: {
    "& .ql-editor": {
      height: 400,
    },
  },

  root: {
    "& .ql-container": {
      "& .ql-editor": {
        "&.ql-blank::before": {
          color: (theme: Theme) => theme.palette.text.secondary,
        },
        color: (theme: Theme) => theme.palette.text.primary,
        fontFamily: (theme: Theme) => theme.typography.fontFamily,
        fontSize: 16,
      },
      border: "none",
    },
    "& .ql-toolbar": {
      "& .ql-picker": {
        color: (theme: Theme) => theme.palette.text.primary,
      },
      "& .ql-picker-item.ql-selected": {
        color: (theme: Theme) => theme.palette.secondary.main,
      },
      "& .ql-picker-item:hover": {
        color: (theme: Theme) => theme.palette.secondary.main,
      },
      "& .ql-picker-label.ql-active": {
        color: (theme: Theme) => theme.palette.secondary.main,
      },
      "& .ql-picker-label:hover": {
        color: (theme: Theme) => theme.palette.secondary.main,
      },
      "& .ql-picker-options": {
        bgcolor: (theme: Theme) => theme.palette.background.default,
        border: "none",
        borderRadius: (theme: Theme) => theme.shape.borderRadius,
        boxShadow: 10,
        p: 2,
      },
      "& .ql-stroke": {
        stroke: (theme: Theme) => theme.palette.text.primary,
      },
      "& button.ql-active": {
        "& .ql-stroke": {
          stroke: (theme: Theme) => theme.palette.secondary.main,
        },
      },
      "& button:focus": {
        "& .ql-stroke": {
          stroke: (theme: Theme) => theme.palette.secondary.main,
        },
        color: (theme: Theme) => theme.palette.secondary.main,
      },
      "& button:hover": {
        "& .ql-stroke": {
          stroke: (theme: Theme) => theme.palette.secondary.main,
        },
        color: (theme: Theme) => theme.palette.secondary.main,
      },
      borderBottom: (theme: Theme) => `1px solid ${theme.palette.divider}`,
      borderLeft: "none",
      borderRight: "none",
      borderTop: "none",
    },
  },
};

type Props = {
  [key: string]: any;
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
function QuillEditor(props: Props) {
  return (
    <Box sx={{ ...style.root, ...style.editor }}>
      <ReactQuill />
    </Box>
  );
}

export default QuillEditor;
