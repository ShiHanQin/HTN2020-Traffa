import { createContext } from 'react';

export const UserContext = createContext({
    name: {
        value: "",
        setValue: () => {},
    },
    userId: {
        value: "",
        setValue: () => {},
    },
    roomCode: {
        value: "",
        setValue: () => {},
    }
})