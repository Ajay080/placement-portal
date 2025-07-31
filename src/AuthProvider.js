// import axios from "axios";
// import { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext({});

// const AuthProvider = (props) => {
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [token, setToken] = useState("");
//   const [isAdmin, setIsAdmin] = useState(false);

//   const signup = async (name, email, password) => {
//     try {
//       // Your signup logic here
//       console.log("Signup function called");
//     } catch (error) {
//       console.error("Error signing up:", error);
//     }
//   };

//   return (
//     <AuthContext.Provider
//       value={{
//         signup // Make sure signup is included in the value
//       }}
//     >
//       {props.children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;
