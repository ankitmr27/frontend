import React from "react";

const HistoryPage = ({ historyData }) => {
  // Fetch history data from the API
  fetch("http://localhost:8000/searchActivity?page=1&limit=5", {
    method: "GET",
    credentials: "include", // This includes credentials (cookies) with the request
  }) // Update with the correct endpoint
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      historyData = data;
    })
    .catch((error) => console.error("Error fetching history data:", error));
  return (
    <div>
      <h1> Search Activity History </h1>{" "}
      <p> Total Search Activities shown below: {historyData.length} </p>{" "}
      {historyData.map((activity, index) => (
        <div key={activity._id}>
          <h2> {`Result ${index + 1}: ${activity.searchTitle}`} </h2>{" "}
          <p> Created at: {activity.createdAt} </p>{" "}
          <p> Created by User: {activity.createdByUser} </p>{" "}
          <h3> Search Result </h3>{" "}
          <p> Summary Text: {activity.searchResult.summary_text} </p>{" "}
          <h3> Review Text </h3>{" "}
          <ul>
            {" "}
            {activity.searchResult.review_text.map((review) => (
              <li key={review._id}>
                Review: {review.review} - Sentiment: {review.sentiment}{" "}
              </li>
            ))}{" "}
          </ul>{" "}
        </div>
      ))}{" "}
    </div>
  );
};

export default HistoryPage;
