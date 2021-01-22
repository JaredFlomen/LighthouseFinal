import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import Reviews from './Reviews';
import ReviewForm from './ReviewInput/ReviewForm';
import ReviewShow from './ReviewInput/ReviewShow';
import ReviewSubmit from './ReviewInput/ReviewSubmit';
import UserAuth from './UserAuth';
import useVisualMode from '../hooks/useVisualMode';
import useReviewBuilder from '../hooks/useReviewBuilder';
import TenancyForm from './ReviewInput/TenancyForm';

export default function VisualModeBox(props) {
  // Keeps container overtop of map
  const containerStyle = {
    width: '100%',
    position: 'absolute',
    top: '60vh',
    zIndex: '1',
  };

  const LOG_IN = 'LOG_IN';
  // const CREATE_ACCOUNT = 'CREATE_ACCOUNT';
  const SHOW_REVIEWS = 'SHOW_REVIEWS';
  const SHOW_FULL_REVIEW = 'SHOW_FULL_REVIEW';
  const CREATE_TENANCY = 'CREATE_TENANCY';
  const CREATE_PROPERTY_REVIEW = 'CREATE_PROPERTY_REVIEW';
  const CREATE_LANDLORD_REVIEW = 'CREATE_LANDLORD_REVIEW';
  const CREATE_NEIGHBOURHOOD_REVIEW = 'CREATE_NEIGHBOURHOOD_REVIEW';
  const SUBMIT_REVIEW = 'SUBMIT_REVIEW';

  // declare helper functions from hooks
  const { mode, transition, back } = useVisualMode(SHOW_REVIEWS);

  const [tenancyID, setTenancyID] = useState();

  const {
    state,
    setTenancyStartDate,
    setTenancyEndDate,
    setPropertyRating,
    setPropertyReview,
    setLandlordRating,
    setLandlordReview,
    setNeighbourhoodRating,
    setNeighbourhoodReview,
  } = useReviewBuilder();

  return (
    <Container style={containerStyle}>
      {mode === SHOW_REVIEWS && props.selectedPlace && (
        <Reviews
          data={props.reviewData}
          addNew={() =>
            // transition(localStorage.getItem('user') ? CREATE_TENANCY : LOG_IN)
            transition(CREATE_TENANCY)
          }
          onClick={tenancyID => {
            setTenancyID(tenancyID);
            transition(SHOW_FULL_REVIEW);
          }}
        />
      )}
      {mode === SHOW_FULL_REVIEW && (
        <ReviewShow
          onClose={() => {
            transition(SHOW_REVIEWS);
          }}
          data={props.reviewData}
          tenancyID={tenancyID}
        />
      )}
      {mode === LOG_IN && <UserAuth />}
      {mode === CREATE_TENANCY && (
        <TenancyForm
          startDate={state.tenancyStartDate || ''}
          endDate={state.tenancyEndDate || ''}
          onStartChange={value => setTenancyStartDate(value)}
          onEndChange={value => setTenancyEndDate(value)}
          onNext={() => transition(CREATE_PROPERTY_REVIEW)}
          onBack={() => back()}
        />
      )}
      {mode === CREATE_PROPERTY_REVIEW && (
        <ReviewForm
          title={'property'}
          rating={state.propertyRating || null}
          onRatingChange={value => setPropertyRating(value)}
          review={state.propertyReview || null}
          onChange={value => setPropertyReview(value)}
          onNext={() => transition(CREATE_LANDLORD_REVIEW)}
          onBack={() => back()}
        />
      )}
      {mode === CREATE_LANDLORD_REVIEW && (
        <ReviewForm
          title={'landlord'}
          rating={state.landlordRating || null}
          onRatingChange={value => setLandlordRating(value)}
          review={state.landlordReview || null}
          onChange={value => setLandlordReview(value)}
          onNext={() => transition(CREATE_NEIGHBOURHOOD_REVIEW)}
          onBack={() => back()}
        />
      )}
      {mode === CREATE_NEIGHBOURHOOD_REVIEW && (
        <ReviewForm
          title={'neighbourhood'}
          rating={state.neighbourhoodRating}
          onRatingChange={value => setNeighbourhoodRating(value)}
          review={state.neighbourhoodReview || null}
          onChange={value => setNeighbourhoodReview(value)}
          onNext={() => transition(SUBMIT_REVIEW)}
          onBack={() => back()}
        />
      )}
      {mode === SUBMIT_REVIEW && (
        <ReviewSubmit
          tenancyStartDate={state.tenancyStartDate}
          tenancyEndDate={state.tenancyEndDate}
          propertyRating={state.propertyRating}
          propertyReview={state.propertyReview}
          landlordRating={state.landlordRating}
          landlordReview={state.landlordReview}
          neighbourhoodRating={state.neighbourhoodRating}
          neighbourhoodReview={state.neighbourhoodReview}
          onSubmit={() => props.onSubmit(state)}
          onBack={() => back()}
          buttonName={'Submit'}
        />
      )}
      {/* {mode === SHOW_FULL_REVIEW && (
        <ReviewShow onClose={() => transition(SHOW_REVIEWS)} />
      )} */}
      {/* {mode === LOG_IN && <UserAuth />} */}
    </Container>
  );
}
