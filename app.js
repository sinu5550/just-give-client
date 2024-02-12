const loadFirst = () => {
    const login_signup = document.querySelector(".login-signup");
    const pro_pic = document.querySelector(".pro-pic");
    const after_login_nav = document.querySelector(".after-login-nav");
    const coin_container = document.querySelector(".coin-container");


    // Check if the user is already logged in
    const token = localStorage.getItem("token");
    if (token) {
        // User is logged in, hide login-signup and show pro_pic
        after_login_nav.innerHTML = `
        <a class="btn btn-sm btn-outline-dark rounded-0 border-0  fw-medium" aria-current="page"
                            href="addBooks.html">List Books</a>
        <a class="btn btn-sm btn-outline-dark rounded-0 border-0  fw-medium" aria-current="page"
                            href="listedbooks.html">Book Listed by You</a>
        `;


        login_signup.classList.remove("d-block");
        pro_pic.classList.remove("d-none");
        login_signup.classList.add("d-none");
        pro_pic.classList.add("d-block");
        const user_id = localStorage.getItem("user_id");
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
// const loadBooks = () => {
//     fetch("http://127.0.0.1:8000/book/list/")
//         .then((res) => res.json())
//         .then((data) => displayBooks(data))
// };

// const displayBooks = (books) => {
//     books.forEach((book) => {
//         const parent = document.getElementById("donated-list");
//         const tr = document.createElement("tr");
//         tr.innerHTML = `
//         <td>${book?.title}</td>
//         <td>${book?.author}</td>
//         <td> ${book?.description.slice(0, 60)}...</td>
//         <td>
//             <div>
//                 <a href="#" class="btn btn-primary btn-sm ">Edit</a>
//                 <a href="#" class="btn btn-danger btn-sm">Delete</a>
//             </div>
//         </td>
//           `;
//         parent.appendChild(tr);
//     });
// };
// loadBooks();

loadFirst();

const handleListBook = async (event) => {
    event.preventDefault();
    const user_id = localStorage.getItem("user_id");
    const title = document.getElementById("title").value;
    const author = document.getElementById("author").value;
    const description = document.getElementById("description").value;

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



