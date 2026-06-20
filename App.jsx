import React, { useState } from "react";
import "./App.css";

const reviews = [
  {
    id: 1,
    name: "Srivalli",
    rating: 5,
    comment: "Excellent product. Very easy to use!"
  },
  {
    id: 2,
    name: "Subbu",
    rating: 4,
    comment: "Good experience, but delivery was slow."
  },
  {
    id: 3,
    name: "Kalyan",
    rating: 3,
    comment: "Average service. Could be improved."
  },
  {
    id: 4,
    name: "Sanju",
    rating: 5,
    comment: "Amazing support team!"
  },
  {
    id: 5,
    name: "Kala",
    rating: 2,
    comment: "Not satisfied with the product."
  }
];


function StarRating({ rating }) {
  return (
    <div className="stars">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}


function App() {

  const [filter, setFilter] = useState("All");

  const filteredReviews =
    filter === "All"
      ? reviews
      : reviews.filter(
          review => review.rating === Number(filter)
        );


  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) /
    reviews.length;


  return (
    <div className="container">

      <h1>Customer Feedback Analytics</h1>


      {/* Analytics Cards */}

      <div className="analytics">

        <div className="card">
          <h2>{reviews.length}</h2>
          <p>Total Reviews</p>
        </div>

        <div className="card">
          <h2>{average.toFixed(1)} ⭐</h2>
          <p>Average Rating</p>
        </div>

        <div className="card">
          <h2>
            {reviews.filter(r => r.rating === 5).length}
          </h2>
          <p>5 Star Reviews</p>
        </div>

      </div>



      {/* Filter */}

      <div className="filter">

        <h3>Filter Reviews:</h3>

        <select
          value={filter}
          onChange={(e)=>setFilter(e.target.value)}
        >

          <option value="All">
            All Ratings
          </option>

          {[5,4,3,2,1].map(star => (
            <option key={star} value={star}>
              {star} Star
            </option>
          ))}

        </select>

      </div>



      {/* Review Grid */}

      <div className="review-grid">

        {filteredReviews.map(review => (

          <div className="review-card" key={review.id}>

            <h3>{review.name}</h3>

            <StarRating rating={review.rating}/>

            <p>
              {review.comment}
            </p>

          </div>

        ))}

      </div>


    </div>
  );
}


export default App;