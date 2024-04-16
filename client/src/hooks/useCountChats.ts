import { useCallback, useState } from "react";
import env from "../config/env";
import { toastVar } from "../config/toast";
import { UNKNOWN_ERROR_TOAST } from "../utils/errors";

const useCountChats = () => {
  const [chatsCount, setChatsCount] = useState<number | undefined>();

  const countChats = useCallback(async () => {
    const res = await fetch(`${env.urls.api}/chats/count`);
    if (!res.ok) {
      toastVar(UNKNOWN_ERROR_TOAST);
      return;
    }
    setChatsCount(parseInt(await res.text()));
  }, []);

  return { chatsCount, countChats };
};

export { useCountChats };
