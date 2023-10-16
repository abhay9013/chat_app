import ChatTop from '../../components/chatwindow/top';
import ChatBottom from '../../components/chatwindow/bottom';
import Messages from '../../components/chatwindow/messages';
import { useParams } from 'react-router-dom';

import { useRooms } from '../../context/roomscontext';
import { Loader } from 'rsuite';
import { CurrentRoomProvider } from '../../context/currentroomcontext';

const Chat = () => {
  const { chatId } = useParams();
  const rooms = useRooms();

  if (!rooms) {
    return <Loader center vertical size="md" content="Loading" speed="slow" />;
  }

  const currentRoom = rooms.find(room => room.id === chatId);

  if (!currentRoom) {
    return <h6 className="text-center mt-page">Chay {chatId} not found!!</h6>;
  }

  const { name, description } = currentRoom;

  const currentRoomData = {
    name,
    description,
  };

  return (
    <CurrentRoomProvider data={currentRoomData}>
      <div className="chat-top">
        <ChatTop />
      </div>
      <div className="chat-middle">
        <Messages />
      </div>
      <div className="chat-bottom">
        <ChatBottom />
      </div>
    </CurrentRoomProvider>
  );
};

export default Chat;
