import React from "react";
import { createContext } from "react";

export const GlobalState = createContext();

export const initialState = {
    activeModal:"",
    loggedIn : false,
    loggedUser : {}
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "activeModal": {
            return {
                ...state,
                activeModal: action.payload
            }
        }
        case "loggedIn": {
            return {
                ...state,
                loggedIn: action.payload
            }
        }
        case "loggedUser": {
            return {
                ...state,
                loggedUser: action.payload
            }
        }
        default: {
            return state
        }
    }
}

