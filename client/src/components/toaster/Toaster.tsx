import Stack from "@mui/material/Stack";
import { Snackbar as MUISnackbar } from "@mui/material";
import MuiAlert, { AlertProps } from "@mui/material/Alert";
import { forwardRef } from "react";
import { useReactiveVar } from "@apollo/client";
import { toastVar } from "../../config/toast";

const Alert = forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const Toaster = () => {
  const toast = useReactiveVar(toastVar);
  console.log("UI :: TOAST :: toast", toast);

  const handleClose = (
    _event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    toastVar(undefined);
  };

  if (!toast) return null;

  return (
    <>
      <Stack spacing={2} sx={{ width: "100%" }}>
        <MUISnackbar
          open={!!toast}
          autoHideDuration={6000}
          onClose={handleClose}
        >
          <Alert
            onClose={handleClose}
            severity={toast.type}
            sx={{ width: "100%" }}
          >
            {toast.message}
          </Alert>
        </MUISnackbar>
      </Stack>
    </>
  );
};

export default Toaster;
