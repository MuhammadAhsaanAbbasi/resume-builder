import { createContext, useContext } from "react";

export const ResumeContext = createContext({
    resumeInfo: {} as UserData,
    setResumeInfo: (resumeInfo: UserData) => {},
})

export const ResumeContextProvider = ResumeContext.Provider;

export const useResumeContext = () => useContext(ResumeContext);