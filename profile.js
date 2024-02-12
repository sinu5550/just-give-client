
const updateProfile = (userData) => {
    document.getElementById("pro_username").value = userData.user.username;
    document.getElementById("pro_first_name").value = userData.user.first_name;
    document.getElementById("pro_last_name").value = userData.user.last_name;
    document.getElementById("pro_mobile_no").value = userData.mobile_no;
    document.getElementById("pro_email").value = userData.user.email;

    const profile_img_main = document.querySelector(".profile_img_main");
    profile_img_main.innerHTML = `
    <img src=${userData.image}
                            style="border-radius: 50%; height: 200px; width: 200px; object-fit: cover; object-position: 50% 20%; border: 2px solid #1877f2;margin: auto;"
                            alt="Profile Picture" class="mt-5">
    <label for="pro_image" class="fw-medium form-label">Profile Image</label>
    <input id="pro_image" class="mb-2 form-control" type="file">
    `;
    document.getElementById("pro_image").value = userData.image;
};

const fetchUserProfile = async (user_id) => {
    try {
        const response = await fetch(`http://127.0.0.1:8000/user/profile/${user_id}/`);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const userData = await response.json();
        return userData;
    } catch (error) {
        console.error("Error fetching user profile:", error);
        throw error;
    }
};
const user_id = localStorage.getItem("user_id");
const loadProfile = async () => {
    try {
        const userData = await fetchUserProfile(user_id);
        updateProfile(userData);
    } catch (error) {

    }
};
const handleSaveCHanges = async (event) => {
    event.preventDefault();
    const updatedUserData = {
        user: {
            first_name: document.getElementById("pro_first_name").value,
            last_name: document.getElementById("pro_last_name").value,
        },
        mobile_no: document.getElementById("pro_mobile_no").value,
    };

    const profileImageInput = document.getElementById("pro_image");
    if (profileImageInput.files.length > 0) {
        const formData = new FormData();
        formData.append("image", profileImageInput.files[0]);
        // Append other updatedUserData properties if needed
        // for example: formData.append("first_name", updatedUserData.user.first_name);

        try {
            const imgResponse = await fetch(`http://127.0.0.1:8000/user/profile/${user_id}/`, {
                method: "PATCH",
                body: formData,
            });

            if (!imgResponse.ok) {
                throw new Error(`HTTP error! Status: ${imgResponse.status}`);
            }

            const updatedImageData = await imgResponse.json();
            const response = await fetch(`http://127.0.0.1:8000/user/profile/${user_id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUserData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedProfileData = await response.json();
            console.log("Profile updated successfully:", updatedProfileData);
            console.log("Profile image updated successfully:", updatedImageData);
            Swal.fire({
                title: "Success!",
                html: "Profile Updated Successfully.",
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    } else {
        // If no new profile image is selected, send the other user data directly
        try {
            const response = await fetch(`http://127.0.0.1:8000/user/profile/${user_id}/`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(updatedUserData),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }

            const updatedProfileData = await response.json();
            console.log("Profile updated successfully:", updatedProfileData);
            Swal.fire({
                title: "Success!",
                html: "Profile Updated Successfully.",
                icon: "success"
            }).then(() => {
                window.location.reload();
            });
        } catch (error) {
            console.error("Error updating profile:", error);
        }
    }
};



window.addEventListener('load', loadProfile);
