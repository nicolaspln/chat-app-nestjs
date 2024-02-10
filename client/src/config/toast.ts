import { makeVar } from "@apollo/client";
import { ToastMessage } from "../typings/ui/ToastMessage";

export const toastVar = makeVar<ToastMessage | undefined>(undefined);
