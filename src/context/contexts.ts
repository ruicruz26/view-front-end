import {createContext, useContext } from "react";
import User from "../models/user";
import Flashbag from "../models/flashbag";

export type UserContextType = {
    user: User;
    setUser: (User: User) => void;
}

export const UserContext = createContext<UserContextType>({user : new User(), setUser: user => console.warn("No User Provided")});
export const useUser = () => useContext(UserContext);

export type TokenContextType = {
    token: string;
    setToken: (token: string) => void;
}

export const TokenContext = createContext<TokenContextType>({token: "", setToken: token => console.warn("No Token Provided")});
export const useToken = () => useContext(TokenContext);

export type FlashbagContextType = {
    flashbag: Flashbag;
    setFlashbag: (flashbag: Flashbag) => void;
}

export const FlashbagContext = createContext<FlashbagContextType>({flashbag: new Flashbag() , setFlashbag: flashbag => console.warn("No Flashbag Provided")});
export const useFlashbag = () => useContext(FlashbagContext);