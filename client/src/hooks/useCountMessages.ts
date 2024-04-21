import { useCallback, useState } from "react";
import env from "../config/env";
import { toastVar } from "../config/toast";
import { UNKNOWN_ERROR_TOAST } from "../utils/errors";

const useCountMessages = (chatId: string) => {
  const [messagesCount, setMessagesCount] = useState<number | undefined>();

  const countMessages = useCallback(async () => {
    const res = await fetch(`${env.urls.api}/chats/count`);
    if (!res.ok) {
      toastVar(UNKNOWN_ERROR_TOAST);
      return;
    }
    const { messages } = await res.json();
    setMessagesCount(messages);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatId]);

  return { messagesCount, countMessages };
};

export { useCountMessages };
