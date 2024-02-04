const handlelogOut = () => {
    const token = localStorage.getItem("token");

    fetch("http://127.0.0.1:8000/user/logout/", {
        method: "POST",
        headers: {
            Authorization: `Token ${token}`,
            "Content-Type": "application/json",
        },
    })
        .then((res) => res.json())
        .then((data) => {
            console.log(data);
            localStorage.removeItem("token");
            localStorage.removeItem("user_id");
            window.location.href = "index.html";
        });
};