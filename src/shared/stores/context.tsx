'use client'

import React, { createContext, useContext, useEffect } from "react";
import { RootStore } from "./RootStore";

const rootStore = new RootStore();

const StoreContext = createContext<RootStore>(rootStore);

export const RootStoreProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  useEffect(() => {
    rootStore.authStore.init();
  }, []);

  return (
    <StoreContext.Provider value={rootStore}>{children}</StoreContext.Provider>
  );
};

export const useStore = (): RootStore => {
  return useContext(StoreContext);
};
