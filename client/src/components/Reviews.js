import React from 'react';
import AddReview from './AddReview';
import { FaStar } from 'react-icons/fa';
import { Card } from 'react-bootstrap';

export default function Reviews(props) {
  const reviewData = props.data;

  const findPropertyReviews = () => {
    const propertyReviews = [];
    for (let review of reviewData) {
      if (review.category_id === 1) {
        propertyReviews.push(review);
      }
    }
    return propertyReviews;
  };

  const averageStarRating = tenancy => {
    const ratingArr = [];
    let ratingSum = 0;
    for (let review of reviewData) {
      if (tenancy === review.tenancy_id) {
        ratingArr.push(review.rating);
      }
    }
    ratingArr.forEach(num => (ratingSum += num));
    let averageRating = Math.round(ratingSum / ratingArr.length);
    return averageRating;
  };

  const mapData = findPropertyReviews().map(data => {
    return (
      <Card style={{ width: '18rem' }} id={data.id}>
        <Card.Body>
          <Card.Title>{data.user}</Card.Title>
          {/* <Card.Subtitle className='mb-2 text-muted'>5 Stars</Card.Subtitle> */}
          {[...Array(averageStarRating(data.tenancy_id))].map((e, index) => (
            <FaStar />
          ))}
          <Card.Text>{data.review}</Card.Text>
          <Card.Link href='#' onClick={() => props.onClick(data.tenancy_id)}>
            View More
          </Card.Link>
        </Card.Body>
      </Card>
    );
  });
  return (
    <>
      {mapData}
      <AddReview onClick={props.addNew} />
    </>
  );
}
