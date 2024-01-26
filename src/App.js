import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./home";
import Login from "./login";
import SearchPage from "./searchPage";
import Signup from "./signup";
import HistoryPage from "./historyPage"; // Import the HistoryPage component
import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [historyData, setHistoryData] = useState([]); // Store the history data

  useEffect(() => {
    // Fetch the user email and token from local storage
    const user = JSON.parse(localStorage.getItem("user"));

    // If the token/email does not exist, mark the user as logged out
    if (!user || !user.token) {
      setLoggedIn(false);
      return;
    }

    // If the token exists, verify it with the auth server to see if it is valid
    fetch("http://localhost:8000/auth/login", {
      method: "POST",
      headers: {
        "jwt-token": user.token,
      },
      credentials: "include",
    })
      .then((r) => r.json())
      .then((r) => {
        setLoggedIn("User Found" === r.message);
        setEmail(user.email || "");
      });

    // Fetch history data from the API
    fetch("http://localhost:8000/searchActivity?page=1&limit=5", {
      method: "GET",
      credentials: "include", // This includes credentials (cookies) with the request
    }) // Update with the correct endpoint
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setHistoryData(data.paginatedSearchActivity || []);
      })
      .catch((error) => console.error("Error fetching history data:", error));
  }, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                email={email}
                loggedIn={loggedIn}
                setLoggedIn={setLoggedIn}
              />
            }
          />{" "}
          <Route
            path="/login"
            element={<Login setLoggedIn={setLoggedIn} setEmail={setEmail} />}
          />
          <Route path="/search" element={<SearchPage />} />{" "}
          <Route path="/signup" element={<Signup />} />{" "}
          <Route
            path="/history"
            element={<HistoryPage historyData={historyData} />}
          />
        </Routes>{" "}
      </BrowserRouter>{" "}
    </div>
  );
}

export default App;
