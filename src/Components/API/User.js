import { useEffect, useState, useMemo } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const User = () => {
  const [user, setUser] = useState([]);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const token = useSelector((state) => state.user.token);

  useEffect(() => {
    console.log("useEffect triggered");

    try {
      if (isAuthenticated) {
        console.log("Fetching user data...");

        axios
          .get(`https://englishforum.zeabur.app/api/v1/auth/${token}`)
          .then((response) => {
            if (response.data && response.data.username) {
              setUser(response.data);
              console.log("User data fetched:", response.data);
            } else {
              throw new Error("Invalid user data");
            }
          })
          .catch((error) => {
            console.error("Error fetching user data:", error);
          });
      }
    } catch (error) {
      console.error("Error in useEffect:", error);
    }
  }, [isAuthenticated, token]);

  const memoizedUser = useMemo(() => user, [user]);

  return memoizedUser;
};

export default User;
