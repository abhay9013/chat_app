import { createContext, useContextSelector } from 'use-context-selector';

//if any one value then only that component will be render not all eg{name, description}

const CurrentRoomContext = createContext();

export const CurrentRoomProvider = ({ children, data }) => {
  return (
    <CurrentRoomContext.Provider value={data}>
      {children}
    </CurrentRoomContext.Provider>
  );
};

export const useCurrentRoom = selector =>
  useContextSelector(CurrentRoomContext, selector);
