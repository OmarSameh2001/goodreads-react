import { createContext, useState } from "react";

const UserBooks = createContext();

export function UserBooksProvider({ children }) {
  const [userBooks, setUserBooks] = useState([]);

  return (
    <UserBooks.Provider value={{ userBooks, setUserBooks }}>
      {children}
    </UserBooks.Provider>
  );
}

export default UserBooks;