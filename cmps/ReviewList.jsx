import { ReviewPreview } from "../cmps/ReviewPreview.jsx"

export function ReviewList({ reviews, onRemoveReview }) {
    
    if (!reviews) {
        return <div>No reviews available.</div>;
    }

    return (
        <div>
            <h3>Reviews:</h3>
            {reviews.map(review =>
                <ReviewPreview
                    key={review.id}
                    review={review}
                    onRemoveReview={onRemoveReview}
                />
            )}
        </div>
    )
}