import { createContext, useContext, useEffect, useState } from 'react';

import { database } from '../misc/firebase';
import { transformToArrWithId } from '../misc/helpers';

const RoomsContext = createContext();

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

  return (
    <RoomsContext.Provider value={rooms}>{children}</RoomsContext.Provider>
  );
};

export const useRooms = () => useContext(RoomsContext);
