import {
  Box,
  Button,
  Divider,
  FormControlLabel,
  FormHelperText,
  IconButton,
  SvgIcon,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { DateTimePicker } from "@mui/x-date-pickers";
import { Formik } from "formik";
import { useSnackbar } from "notistack";
import * as React from "react";
import { Trash as TrashIcon } from "react-feather";

import { useAppDispatch } from "../../hooks";
import {
  eventDefaultValue,
  EventType,
  RangeType,
  yupEventValidation,
} from "../../models";
import {
  createEventAsync,
  deleteEventAsync,
  updateEventAsync,
} from "../../slices/calendar";

const style = {
  confirmButton: {
    ml: 2,
  },
};

type Props = {
  event?: EventType;
  onAddComplete: () => void;
  onCancel: () => void;
  onDeleteComplete: () => void;
  onEditComplete: () => void;
  range?: RangeType;
};

function AddEditEventForm({
  event = undefined,
  onAddComplete,
  onCancel,
  onDeleteComplete,
  onEditComplete,
  range = undefined,
}: Props) {
  const dispatch = useAppDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const isCreating = !event; // event is coming from the parent of the AddEditEventForm */
  const handleDelete = async (): Promise<void> => {
    try {
      await dispatch(deleteEventAsync(event?.id));
      onDeleteComplete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Formik
      initialValues={eventDefaultValue(event, range)}
      validationSchema={yupEventValidation}
      onSubmit={async (
        /* where the input formikProps.values (i.e. from TextField) are being combined. */
        values,
        { resetForm, setErrors, setStatus, setSubmitting } // Formik helper deconstructed.
      ) => {
        try {
          const data = {
            allDay: values.allDay,
            description: values.description,
            end: values.end,
            id: "",
            start: values.start,
            title: values.title,
          };
          if (event) {
            data.id = event.id;
            await dispatch(updateEventAsync(data));
          } else {
            await dispatch(createEventAsync(data));
          }
          resetForm();
          setStatus({ success: true });
          setSubmitting(false);

          enqueueSnackbar("Calendar updated", {
            variant: "success",
          });
          if (isCreating) {
            onAddComplete();
          } else {
            onEditComplete();
          }
        } catch (error) {
          if (error instanceof Error) {
            console.error(error);
            setErrors({ submit: error.message });
          }
          setStatus({ success: false });
          setSubmitting(false);
        }
      }}
    >
      {(formikProps) => (
        <form onSubmit={formikProps.handleSubmit}>
          <Box p={3}>
            <Typography
              gutterBottom
              align="center"
              color="textPrimary"
              variant="h3"
            >
              {isCreating ? "Add Event" : "Edit Event"}
            </Typography>
          </Box>
          <Box p={3}>
            <TextField
              fullWidth
              helperText={formikProps.touched.title && formikProps.errors.title}
              label="Title"
              name="title"
              value={formikProps.values.title}
              variant="outlined"
              error={Boolean(
                formikProps.touched.title && formikProps.errors.title
              )}
              onBlur={formikProps.handleBlur}
              onChange={formikProps.handleChange}
            />
            <Box mt={2}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formikProps.values.description}
                variant="outlined"
                error={Boolean(
                  formikProps.touched.description &&
                    formikProps.errors.description
                )}
                helperText={
                  formikProps.touched.description &&
                  formikProps.errors.description
                }
                onBlur={formikProps.handleBlur}
                onChange={formikProps.handleChange}
              />
            </Box>
            <Box mt={2}>
              <FormControlLabel
                label="All day"
                control={
                  <Switch
                    checked={formikProps.values.allDay}
                    name="allDay"
                    onChange={formikProps.handleChange}
                  />
                }
              />
            </Box>
            <Box mt={2}>
              <DateTimePicker
                value={formikProps.values.start}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    fullWidth
                    label="Start date"
                    name="start"
                    onClick={() => formikProps.setFieldTouched("end")}
                  />
                )}
                onChange={(date) => formikProps.setFieldValue("start", date)}
              />
            </Box>
            <Box mt={2}>
              <DateTimePicker
                value={formikProps.values.end}
                renderInput={(params) => (
                  <TextField
                    // eslint-disable-next-line react/jsx-props-no-spreading
                    {...params}
                    fullWidth
                    label="End date"
                    name="end"
                    onClick={() => formikProps.setFieldTouched("end")}
                  />
                )}
                onChange={(date) => formikProps.setFieldValue("end", date)}
              />
            </Box>
            {Boolean(formikProps.touched.end && formikProps.errors.end) &&
              typeof formikProps.errors.end === "string" && (
                <Box mt={2}>
                  <FormHelperText error>
                    {formikProps.errors.end}
                  </FormHelperText>
                </Box>
              )}
          </Box>
          <Divider />
          <Box alignItems="center" display="flex" p={2}>
            {!isCreating && (
              <IconButton onClick={() => handleDelete()}>
                <SvgIcon>
                  <TrashIcon />
                </SvgIcon>
              </IconButton>
            )}
            <Box flexGrow={1} />
            <Button onClick={onCancel}>Cancel</Button>
            <Button
              color="primary"
              disabled={formikProps.isSubmitting}
              type="submit" /* this is to prevent double clicking */
              variant="contained"
              sx={{
                ...style.confirmButton,
              }}
            >
              Confirm
            </Button>
          </Box>
        </form>
      )}
    </Formik>
  );
}

export default AddEditEventForm;
