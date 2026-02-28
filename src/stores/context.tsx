import React, { createContext, useContext } from "react";
import { RootStore } from "./RootStore";

const rootStore = new RootStore();
rootStore.authStore.init();

const StoreContext = createContext<RootStore>(rootStore);

export const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): RootStore => {
  return useContext(StoreContext);
};
