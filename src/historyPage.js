import React from "react";

const HistoryPage = ({ historyData }) => {
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
