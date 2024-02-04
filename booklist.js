

const loadListedBooks = () => {
    const id = localStorage.getItem("user_id");
    if (id) {
        fetch(`http://127.0.0.1:8000/book/list/?user_id=${id}`)
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
                <a href="#" class="btn btn-primary btn-sm ">Edit</a>
                <a href="#" class="btn btn-danger btn-sm">Delete</a>
            </div>
        </td>
          `;
        parent.appendChild(tr);
    });
};
loadListedBooks();