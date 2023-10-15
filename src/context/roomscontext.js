import { createContext, useEffect, useState } from 'react';

import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helpers';

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [rooms, setRooms] = useState(null);

  useEffect(() => {
    const roomListRef = database.ref('rooms');
    roomListRef.on('value', snap => {
      //on is real time listern

      const data = transformToArrWithId(snap.val());
      setRooms(data);
    });

    return () => {
      //cleanup funciton
      roomListRef.off();
    };
  });

  return <RoomContext.Provider value={rooms}>{children}</RoomContext.Provider>;
};
