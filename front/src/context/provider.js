import { createContext, useReducer } from "react";
import { AppReducer } from "./reducer";

export const AppStore = createContext();

export const AppDispatcher = createContext();

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AppReducer);
    return (
        <AppStore.Provider value={state}>
            <AppDispatcher.Provider value={dispatch}>
                {children}
            </AppDispatcher.Provider>
        </AppStore.Provider>
    )
}