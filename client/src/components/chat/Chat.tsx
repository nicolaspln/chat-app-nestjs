import { useLocation, useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Avatar,
  Box,
  Divider,
  Grid,
  IconButton,
  InputBase,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useEffect, useRef, useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";
import { PAGE_SIZE } from "../../config/page-size";
import { useCountMessages } from "../../hooks/useCountMessages";
import InfiniteScroll from "react-infinite-scroller";

import "./Chat.css";

const Chat = () => {
  const params = useParams();
  const chatId = params._id!;
  const location = useLocation();

  const [message, setMessage] = useState("");

  const divRef = useRef<HTMLDivElement | null>(null);

  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage();
  const { data: { messages = [] } = {}, fetchMore } = useGetMessages({
    chatId,
    offset: 0,
    limit: PAGE_SIZE,
  });
  const { messagesCount, countMessages } = useCountMessages(chatId);

  useEffect(() => {
    countMessages();
  }, [countMessages]);

  const scrollToBottom = () => divRef.current?.scrollIntoView();

  useEffect(() => {
    if (messages && messages.length <= PAGE_SIZE) {
      setMessage("");
      scrollToBottom();
    }
  }, [location.pathname, messages]);

  const handleSubmit = () => {
    createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage("");
    scrollToBottom();
  };

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Stack
      sx={{
        height: "80vh",
        justifyContent: "end",
      }}
    >
      <h1 className="chat-title">{data?.chat.name || "NAME NOT DISPLAYED"}</h1>
      <Box sx={{ maxHeight: "80vh", overflow: "auto" }}>
        <InfiniteScroll
          pageStart={0}
          isReverse={true}
          loadMore={() => fetchMore({ variables: { offset: messages.length } })}
          hasMore={
            messages && messagesCount ? messages.length < messagesCount : false
          }
          useWindow={false}
        >
          {messages &&
            [...messages]
              ?.sort(
                (messageA, messageB) =>
                  new Date(messageA.createdAt).getTime() -
                  new Date(messageB.createdAt).getTime()
              )
              .map((message) => (
                <Grid container alignItems="center" marginBottom="1rem">
                  <Grid item xs={2} lg={1}>
                    <Avatar src="" sx={{ width: 52, height: 52 }} />
                  </Grid>
                  <Grid item xs={10} lg={11}>
                    <Stack>
                      <Paper sx={{ width: "fit-content" }}>
                        <Typography sx={{ padding: "0.9rem" }}>
                          {message.content}
                        </Typography>
                      </Paper>
                      <Typography
                        variant="caption"
                        sx={{ marginLeft: "0.25rem" }}
                      >
                        {new Date(message.createdAt).toLocaleTimeString()} -{" "}
                        {new Date(message.createdAt).toLocaleDateString()}{" "}
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              ))}
          <div ref={divRef}></div>
        </InfiniteScroll>
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          // justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
          margin: "1rem 0",
        }}
      >
        <InputBase
          sx={{ ml: 1, flex: 1, width: "100%" }}
          onChange={(event) => setMessage(event.target.value)}
          value={message}
          placeholder="Message"
          onKeyDown={handleKeyPress}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          disabled={!message}
          onClick={handleSubmit}
          color="primary"
          sx={{ p: "10px" }}
        >
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
