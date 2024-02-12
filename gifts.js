document.addEventListener("DOMContentLoaded", function () {

    fetch(`http://127.0.0.1:8000/gift/list/`)
        .then((res) => res.json())
        .then((data) => displayGifts(data))


});

const displayGifts = (gifts) => {
    gifts.forEach((gift) => {

        const giftsCard = document.getElementById("gift_card");
        const div = document.createElement("div");
        div.classList.add('col');
        div.innerHTML = `
                <div class="card h-100 border-0 shadow pt-2 rounded-5">
                    <img src=${gift.image} class="card-img-top w-75 mx-auto" alt="...">
                    <div class="card-body d-flex flex-column">

                        
                            <p class="card-title fw-bold fs-4">${gift.name}</p>
                            <p class="fw-bold mt-2 fs-4 text-danger d-flex align-items-center">
                            <i class="bi bi-coin  me-2 fw-medium  my-0"></i>
                             <span>${gift.coin_price}</span>
                             </p>
                        
                        <p class="card-text">${gift.description}</p>
                        <a class="btn btn-outline-danger rounded-5 mt-auto" onclick="handleRedeem(event,${gift?.coin_price})">Redeem</a>
                    </div>
                </div>
                  `;
        giftsCard.appendChild(div);
    })


};
const user_id = localStorage.getItem("user_id");
const handleRedeem = (event, giftCoin) => {
    if (!user_id) {
        window.location.href = "login.html";
        return;
    }
    event.preventDefault();
    fetch(`http://127.0.0.1:8000/user/list/${user_id}/`)
        .then((res) => res.json())
        .then((data) => {
            const currentCoin = data.coins - giftCoin;
            if (currentCoin < 0) {

                Swal.fire({
                    title: "Error!",
                    text: "Insufficient coins!",
                    icon: "error",
                });
                return;
            }

            fetch(`http://127.0.0.1:8000/user/list/${user_id}/`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ coins: currentCoin })
            })
                .then((res) => {
                    if (res.ok) {

                        Swal.fire({
                            title: "Success!",
                            html: `Gift Redeem Success! <br> You have now <b class="text-danger">${currentCoin}</b> coin`,
                            icon: "success",
                        }).then(() => {

                            window.location.reload();
                        });
                    } else {
                        console.error('Failed to update gift coin price');
                    }
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        });
};