

const loadListedBooks = () => {
    const id = localStorage.getItem("user_id");
    if (!id) {
        window.location.href = "login.html";
        return;
    }
    if (id) {
        fetch(`http://justgive-api-sinu5550.onrender.com/book/list/?user_id=${id}`)
            .then((res) => res.json())
            .then((data) => displayBooks(data))

    }
};

const displayBooks = (books) => {
    books.forEach((book) => {

        const parent = document.getElementById("donated-list");
        const tr = document.createElement("tr");
        tr.innerHTML = `
        <td>${book?.title}</td>
        <td>${book?.author}</td>
        <td> ${book?.description.slice(0, 60)}...</td>
        <td>
            <div>
               <!-- <a href="listedbooks.html" class="btn btn-primary btn-sm ">Edit</a> -->
                <a href="listedbooks.html" class="btn btn-danger btn-sm" onclick="handleDeleteBook(event,${book?.id})" >Delete</a>
            </div>
        </td>
          `;
        parent.appendChild(tr);
    });
};
const handleDeleteBook = (event, id) => {
    event.preventDefault();
    fetch(`http://justgive-api-sinu5550.onrender.com/book/list/${id}/`, {
        method: "DELETE",
    })
        .then(response => {
            if (response.ok) {
                console.log("Book deleted successfully");
                Swal.fire({
                    title: "Success!",
                    html: "Book deleted successfully",
                    icon: "success"
                }).then(() => {
                    window.location.reload();
                });
            } else {
                console.error("Failed to delete book");
            }
        })
        .catch(error => {
            console.error("Error deleting book:", error);
        });


};
loadListedBooks();