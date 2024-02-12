document.addEventListener("DOMContentLoaded", function () {
    const user_id = localStorage.getItem("user_id");


    if (!user_id) {
        window.location.href = "login.html";
        return;
    }

    const reviewForm = document.getElementById("reviewForm");
    const ratingSelect = document.getElementById("rating");
    const reviewText = document.getElementById("reviewText");

    reviewForm.addEventListener("submit", async function (event) {
        event.preventDefault();

        const selectedRating = ratingSelect.value;
        const review = reviewText.value;

        if (!selectedRating || !review) {
            alert("Please select a rating and enter your review.");
            return;
        }

        try {
            const response = await fetch("http://127.0.0.1:8000/user/reviews/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    rating: selectedRating,
                    text: review,
                    reviewer: user_id,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const responseData = await response.json();
            console.log("Review submitted successfully:", responseData);

            Swal.fire({
                title: "Success!",
                html: "Review Submitted successfully",
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error("Error submitting review:", error);
            alert("An error occurred while submitting the review. Please try again.");
        }
    });
});

const loadReviews = () => {
    const id = localStorage.getItem("user_id");
    fetch(`http://127.0.0.1:8000/user/reviews/`)
        .then((res) => res.json())
        .then((data) => displayReviews(data))

};

const displayReviews = (reviews) => {
    const totalReviews = reviews.length;
    const totalReviewsElement = document.getElementById("total-reviews");
    totalReviewsElement.innerText = `Total Reviews: ${totalReviews}`;
    reviews.forEach((review) => {
        console.log(review);
        fetch(`http://127.0.0.1:8000/user/profile/${review.reviewer}/`)
            .then((res) => res.json())
            .then((data) => {
                const reviewsCard = document.getElementById("ratings-card");
                const div = document.createElement("div");
                const timestamp = new Date(review.created_at);
                const options = { hour: 'numeric', minute: '2-digit' };
                const formattedTime = timestamp.toLocaleTimeString([], options);
                const formattedDate = timestamp.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
                div.innerHTML = `
                <div class="card-body border m-2 lh-1 ">
                <p>
                                        <img src=${data.image} class="profile-pic me-1" alt="Profile Pic"
                                            style="border-radius: 50%; height: 30px; width: 30px; object-fit: cover; object-position: 50% 20%; border: 2px solid #1877f2;">
                                        <b> ${data.user.username}</b> <small>at ${formattedTime}, ${formattedDate}</small>
                                    </p>
                                    <p>${review.rating}</p>
                                    <p>"${review.text}"</p>
                                    </div>
                  `;
                reviewsCard.appendChild(div);
            })

    });
};
loadReviews();