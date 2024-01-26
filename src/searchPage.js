import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./App.css";

function SearchPage() {
  const [gadgetName, setGadgetName] = useState("");
  const [searchActivity, setSearchActivity] = useState(null);
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setGadgetName(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Fetch data from your API using the entered gadget name
    fetch("http://localhost:8000/searchActivity/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include", // Include cookies
      body: JSON.stringify({
        gadget: gadgetName,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setSearchActivity(data);
      })
      .catch((error) => console.error("Error fetching data:", error));
  };

  const goToHistoryPage = () => {
    // Use the navigate function to redirect to the HistoryPage
    navigate("/history");
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1> Search Activity Details </h1>{" "}
        <form onSubmit={handleSubmit}>
          <label>
            Enter Gadget Name:
            <input
              type="text"
              value={gadgetName}
              onChange={handleInputChange}
            />{" "}
          </label>{" "}
          <button type="submit"> Search </button>{" "}
        </form>{" "}
        {searchActivity && (
          <div>
            {" "}
            <p> Message: {searchActivity.message} </p>{" "}
            <p> Created At: {searchActivity.searchActivity.createdAt} </p>{" "}
            <p>
              {" "}
              Created By User: {
                searchActivity.searchActivity.createdByUser
              }{" "}
            </p>{" "}
            <h2> Search Activity: </h2>{" "}
            <p> Search Title: {searchActivity.searchActivity.searchTitle} </p>{" "}
            <p>
              {" "}
              Publish Date :{" "}
              {searchActivity.searchActivity.searchResult.publish_date}{" "}
            </p>{" "}
            <h3> Search Result: </h3>{" "}
            <p>
              {" "}
              Summary Text:{" "}
              {searchActivity.searchActivity.searchResult.summary_text}{" "}
            </p>{" "}
            <h3> Review Text: </h3>{" "}
            <ul>
              {" "}
              {searchActivity.searchActivity.searchResult.review_text.map(
                (review) => (
                  <li key={review._id}>
                    Review: {review.review} - Sentiment: {review.sentiment}{" "}
                  </li>
                )
              )}{" "}
            </ul>{" "}
          </div>
        )}{" "}
        {/* History Button */}{" "}
        <button onClick={goToHistoryPage}> Go to History </button>{" "}
      </header>{" "}
    </div>
  );
}

export default SearchPage;
