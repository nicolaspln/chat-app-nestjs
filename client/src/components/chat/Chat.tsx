import { useParams } from "react-router-dom";
import { useGetChat } from "../../hooks/useGetChat";
import {
  Box,
  Divider,
  IconButton,
  InputBase,
  Paper,
  Stack,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useCreateMessage } from "../../hooks/useCreateMessage";
import { useState } from "react";
import { useGetMessages } from "../../hooks/useGetMessages";

const Chat = () => {
  const params = useParams();
  const chatId = params._id!;

  const [message, setMessage] = useState("");

  const { data } = useGetChat({ _id: chatId });
  const [createMessage] = useCreateMessage(chatId);
  const { data: { messages = [] } = {} } = useGetMessages({ chatId });

  const handleSubmit = () => {
    createMessage({
      variables: { createMessageInput: { content: message, chatId } },
    });
    setMessage("");
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
        justifyContent: "space-between",
      }}
    >
      <h1>{data?.chat.name}</h1>
      <Box>
        {messages.map((message) => (
          <p key={message._id}>{message.content}</p>
        ))}
      </Box>
      <Paper
        sx={{
          p: "2px 4px",
          display: "flex",
          justifySelf: "flex-end",
          alignItems: "center",
          width: "100%",
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
        <IconButton onClick={handleSubmit} color="primary" sx={{ p: "10px" }}>
          <SendIcon />
        </IconButton>
      </Paper>
    </Stack>
  );
};

export default Chat;
