
const loadFirst = () => {
    const login_signup = document.querySelector(".login-signup");
    const pro_pic = document.querySelector(".pro-pic");
    const after_login_nav = document.querySelector(".after-login-nav");
    const coin_container = document.querySelector(".coin-container");
    const user_id = localStorage.getItem("user_id");




    const token = localStorage.getItem("token");
    if (token) {
        // User is logged in, hide login-signup and show pro_pic
        after_login_nav.innerHTML = `
        <a class="btn btn-sm btn-outline-secondary rounded-5  border-0  fw-medium px-3" aria-current="page"
                            href="addBooks.html">List Books</a>
        <a class="btn btn-sm btn-outline-secondary rounded-5 border-0  fw-medium px-3" aria-current="page"
                            href="listedbooks.html">Donated</a>
        <a class="btn btn-sm btn-outline-secondary rounded-5 border-0  fw-medium px-3" aria-current="page"
                            href="reviews.html">Reviews</a>
        `;


        login_signup.classList.remove("d-block");
        pro_pic.classList.remove("d-none");
        login_signup.classList.add("d-none");
        pro_pic.classList.add("d-block");
        fetch(`http://127.0.0.1:8000/user/profile/${user_id}`)
            .then((res) => res.json())
            .then((data) => {
                const pro_pic_btn = document.querySelector(".profile-pic-btn");
                const welcome = document.querySelector(".welcome");
                console.log(data);
                welcome.innerHTML = `Welcome, ${data.user.first_name} ${data.user.last_name}`;
                coin_container.innerHTML = `
                <div class="btn border-2 border-danger rounded-5 py-0">
                            <div class="d-flex align-items-center  py-0 my-0">
                                <i class="bi bi-coin  me-2 fw-medium fs-4 my-0"></i>
                                <span class="fw-medium my-0 " id="coin">${data.coins}</span>
                            </div>
                        </div>
                `;
                if (data.image) {
                    pro_pic_btn.innerHTML = `
                <img src=${data?.image} class="profile-pic" alt=" Profile Pic"
                style="border-radius: 50%; height: 45px; width: 45px; object-fit: cover; object-position: 50% 20%; border: 2px solid #1877f2;">

          `;
                }
                else {
                    pro_pic_btn.innerHTML = `
                <img src='./images/user.png' class="profile-pic" alt=" Profile Pic"
                style="border-radius: 50%; height: 45px; width: 45px; object-fit: cover; object-position: 50% 20%; border: 2px solid #1877f2;">

          `;
                }
            });
    } else {
        // User is not logged in, show login-signup and hide pro_pic
        login_signup.classList.remove("d-none");
        pro_pic.classList.remove("d-block");
        login_signup.classList.add("d-block");
        pro_pic.classList.add("d-none");
    }
};

loadFirst();

const handleListBook = async (event) => {
    event.preventDefault();

    const user_id = localStorage.getItem("user_id");
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;
    if (!user_id) {
        window.location.href = "login.html";
        return;
    }
    const info = {
        title,
        author,
        description,
        user: user_id,
    };

    try {

        const response = await fetch("http://127.0.0.1:8000/book/list/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify(info),
        });

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userResponse = await fetch(`http://127.0.0.1:8000/user/list/${user_id}/`);
        const userData = await userResponse.json();
        if (!userResponse.ok) {
            throw new Error(`HTTP error! Status: ${userResponse.status}`);
        }

        const newCoins = userData.coins + 50;
        console.log(newCoins);

        const coinsResponse = await fetch(`http://127.0.0.1:8000/user/list/${user_id}/`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ coins: newCoins }),
        });

        if (!coinsResponse.ok) {
            throw new Error(`HTTP error! Status: ${coinsResponse.status}`);
        }

        const coinsData = await coinsResponse.json();
        console.log(coinsData);

        const data = await response.json();
        console.log(data);

        Swal.fire({
            title: "Success!",
            html: "Book Listed Successfully <br> You Got <b>50</b> coins.",
            icon: "success",
        }).then(() => {

            window.location.reload();
        });

    } catch (error) {
        console.error("Error:", error);
    }
};


const loadTestimonials = () => {
    fetch(`http://127.0.0.1:8000/user/reviews/`)
        .then((res) => res.json())
        .then((data) => displayTestimonials(data))

};

const displayTestimonials = (reviews) => {

    const reviewsCard = document.querySelector(".review-carousel");
    reviews.forEach((review) => {
        console.log(review);
        const li = document.createElement("li");
        fetch(`http://127.0.0.1:8000/user/profile/${review.reviewer}/`)
            .then((res) => res.json())
            .then((data) => {
                const timestamp = new Date(review.created_at);
                const options = { hour: 'numeric', minute: '2-digit' };
                const formattedTime = timestamp.toLocaleTimeString([], options);
                const formattedDate = timestamp.toLocaleDateString([], { day: '2-digit', month: 'short', year: 'numeric' });
                li.innerHTML = `
                
               
                <div class="card shadow h-100 border-0 rounded-4 ">
                    <div class="ratio ratio-16x9">
                        <div class="d-flex justify-content-center">
                            <img src=${data.image}
                                style="border-radius: 50%; height: 150px; width: 150px; object-fit: cover; object-position: 50% 20%; border: 2px solid #1877f2;"
                                alt="Profile Picture" class="card-img-top mt-4" loading="lazy">
                        </div>
                    </div>
                    <div class="card-body ">
                        <div class="d-flex flex-column flex-md-row">
                            <div class="flex-grow-1">
                                <strong>${data.user.first_name} ${data.user.last_name}</strong>
                                <p class="card-text">${review.rating}</p>
                            </div>
                            <div class="px-md-2">${formattedDate}</div>
                        </div>
                        <p class="card-text">"${review.text}"</p>
                        
                    </div>
                </div>
           
               
              `;
                reviewsCard.appendChild(li);
            })

    });
};
loadTestimonials();
