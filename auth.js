

const handleRegistration = (event) => {
    event.preventDefault();
    const username = getValue("username");
    const first_name = getValue("first_name");
    const last_name = getValue("last_name");
    const mobile_no = getValue("mobile_no");
    const email = getValue("email");
    const password = getValue("password");
    const confirm_password = getValue("confirm_password");
    const info = {
        username,
        first_name,
        last_name,
        mobile_no,
        email,
        password,
        confirm_password,
    };

    if (password === confirm_password) {
        document.getElementById("error").innerText = "";
        if (
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/.test(
                password
            )
        ) {
            console.log(info);

            fetch("https://justgive-api-sinu5550.onrender.com/user/register/", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(info),
            })
                .then((res) => res.json())
                .then((data) => {
                    console.log(data);
                    Swal.fire({
                        title: "Verification Email Sent !",
                        html: data,
                        icon: "success"
                    })

                });
        } else {
            document.getElementById("error").innerText =
                "Password must contain eight characters, at least one letter, one number and one special character:";
        }
    } else {
        document.getElementById("error").innerText =
            "Password and Confirm password do not match";
        alert("Password and Confirm password do not match");
    }
};

const getValue = (id) => {
    const value = document.getElementById(id).value;
    return value;
};

const handleLogin = (event) => {
    event.preventDefault();

    const username = getValue("login-username");
    const password = getValue("login-password");
    console.log(username, password);
    if ((username, password)) {
        fetch("https://justgive-api-sinu5550.onrender.com/user/login/", {
            method: "POST",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({ username, password }),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log(data);
                if (data.error) {
                    Swal.fire({
                        title: "Error !",
                        html: data.error,
                        icon: "error"
                    })
                }

                if (data.token && data.user_id) {
                    localStorage.setItem("token", data.token);
                    localStorage.setItem("user_id", data.user_id);
                    Swal.fire({
                        title: "Success!",
                        html: "Logged in Successful!",
                        icon: "success",
                        showConfirmButton: false,
                        timer: 1500
                    });
                    window.location.href = "index.html";

                }

            });
    }
};
