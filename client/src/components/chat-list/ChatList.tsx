import ChatListItem from "./chat-list-item/ChatListItem";
import { Box, Divider, Stack } from "@mui/material";
import ChatListHeader from "./chat-list-header/ChatListHeader";
import ChatListAdd from "./chat-list-add/ChatListAdd";
import { useEffect, useState } from "react";
import { useGetChats } from "../../hooks/useGetChats";
import { usePath } from "../../hooks/usePath";
import { useMessageCreated } from "../../hooks/useMessageCreated";
import { PAGE_SIZE } from "../../config/page-size";
import InfiniteScroll from "react-infinite-scroller";
import { useCountChats } from "../../hooks/useCountChats";

const ChatList = () => {
  const [chatListAddVisible, setChatListAddVisible] = useState(false);
  const [selectedChatId, setSelectedChatId] = useState("");
  const { data, fetchMore } = useGetChats({
    offset: 0,
    limit: PAGE_SIZE,
  });
  const { path } = usePath();
  const { chatsCount, countChats } = useCountChats();

  const chats = data?.chats || [];

  useEffect(() => {
    countChats();
  }, [countChats]);

  useMessageCreated({ chatIds: chats.map((chat) => chat._id) || [] });

  useEffect(() => {
    const pathSplit = path.split("chats/");
    if (pathSplit.length === 2) {
      setSelectedChatId(pathSplit[1]);
    }
  }, [path]);

  return (
    <>
      <ChatListAdd
        open={chatListAddVisible}
        handleClose={() => setChatListAddVisible(false)}
      />
      <Stack>
        <ChatListHeader handleAddChat={() => setChatListAddVisible(true)} />
        <Divider />
        <Box
          sx={{
            width: "100%",
            bgcolor: "background.paper",
            maxHeight: "80vh",
            overflow: "auto",
          }}
        >
          <InfiniteScroll
            pageStart={0}
            loadMore={() =>
              fetchMore({
                variables: {
                  skip: chats.length,
                },
              })
            }
            hasMore={chats && chatsCount ? chats.length < chatsCount : false}
            useWindow={false}
          >
            {[...chats]
              .sort((chatA, chatB) => {
                const chatADate = chatA.updatedAt || chatA.createdAt;
                const chatBDate = chatB.updatedAt || chatB.createdAt;

                return (
                  new Date(chatBDate).getTime() - new Date(chatADate).getTime()
                );
              })
              .map((chat) => (
                <ChatListItem
                  chat={chat}
                  selected={chat._id === selectedChatId}
                />
              ))}
          </InfiniteScroll>
        </Box>
      </Stack>
    </>
  );
};

export default ChatList;
