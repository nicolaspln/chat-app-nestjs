import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { ListItemButton } from "@mui/material";
import router from "../../Routes";
import { Chat } from "../../../gql/graphql";

interface ChatListProps {
  chat: Chat;
  selected: boolean;
}

const ChatListItem = ({ chat, selected }: ChatListProps) => {
  return (
    <>
      <ListItem alignItems="flex-start" disablePadding>
        <ListItemButton
          onClick={() => router.navigate(`/chats/${chat._id}`)}
          selected={selected}
        >
          <ListItemAvatar>
            <Avatar
              alt="Cute Dog"
              src="data:image/jpeg;base64,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"
            />
          </ListItemAvatar>
          <ListItemText
            primary={chat.name}
            secondary={
              <>
                <Typography
                  sx={{
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    display: "-webkit-box",
                    WebkitLineClamp: "1",
                    WebkitBoxOrient: "vertical",
                  }}
                  component="span"
                  variant="body2"
                >
                  <Typography
                    sx={{ display: "inline" }}
                    component="span"
                    variant="body2"
                    color="text.primary"
                  >
                    {chat.latestMessage?.user.username ||
                      "Let's start a discussion!"}
                  </Typography>
                  {" " + (chat.latestMessage?.content || "")}
                </Typography>
              </>
            }
          />
        </ListItemButton>
      </ListItem>
      <Divider variant="inset" component="li" />
    </>
  );
};

export default ChatListItem;
