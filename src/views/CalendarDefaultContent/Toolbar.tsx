import ViewAgendaIcon from "@mui/icons-material/ViewAgendaOutlined";
import ViewConfigIcon from "@mui/icons-material/ViewComfyOutlined";
import ViewDayIcon from "@mui/icons-material/ViewDayOutlined";
import ViewWeekIcon from "@mui/icons-material/ViewWeekOutlined";
import {
  Button,
  ButtonGroup,
  Grid,
  Hidden,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import moment from "moment";
import * as React from "react";

import { ViewType } from "../../models";

type ViewOption = {
  label: string;
  value: ViewType;
  icon: React.ElementType;
};

const viewOptions: ViewOption[] = [
  {
    icon: ViewConfigIcon,
    label: "Month",
    value: "dayGridMonth",
  },
  {
    icon: ViewWeekIcon,
    label: "Week",
    value: "timeGridWeek",
  },
  {
    icon: ViewDayIcon,
    label: "Day",
    value: "timeGridDay",
  },
  {
    icon: ViewAgendaIcon,
    label: "Agenda",
    value: "listWeek",
  },
];

type Props = {
  children?: React.ReactNode;
  date: Date;
  onDateNext?: () => void;
  onDatePrev?: () => void;
  onDateToday?: () => void;
  onViewChange?: (view: ViewType) => void;
  view: ViewType;
};

const style = {
  root: {
    alignItems: "center",
    justifyContent: "space-between",
  },
};

function Toolbar({
  date,
  children = undefined,
  onDateNext = undefined,
  onDatePrev = undefined,
  onDateToday = undefined,
  onViewChange = undefined,
  view,
}: Props) {
  return (
    <Grid container spacing={3} sx={{ ...style.root }}>
      <Grid item>
        <ButtonGroup size="small">
          <Button onClick={onDatePrev}>Prev</Button>
          <Button onClick={onDateToday}>Today</Button>
          <Button onClick={onDateNext}>Next</Button>
        </ButtonGroup>
      </Grid>
      <Hidden smDown>
        <Grid item>
          <Typography color="textPrimary" variant="h3">
            {moment(date).format("MMMM YYYY")}
          </Typography>
        </Grid>
        <Grid item>
          {viewOptions.map((viewOption) => {
            const Icon = viewOption.icon;

            return (
              <Tooltip key={viewOption.value} title={viewOption.label}>
                <IconButton
                  color={viewOption.value === view ? "primary" : "default"}
                  onClick={() => {
                    if (onViewChange) {
                      onViewChange(viewOption.value);
                    }
                  }}
                >
                  <Icon />
                </IconButton>
              </Tooltip>
            );
          })}
        </Grid>
        {children}
      </Hidden>
    </Grid>
  );
}

export default Toolbar;
