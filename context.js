import React, { useContext } from "react";

export const DBContext = React.createContext();
// context 를 이용하면 prop이 필요 없이 data 전달이 가능하다. useContext 를 이용해서 data 를 가져온다.

// useDB 훅을 이용해 useContext 를 조금더 심플하게 사용한다.
export const useDB = () => useContext(DBContext);
