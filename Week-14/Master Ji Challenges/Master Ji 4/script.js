const searchInput = document.getElementById("searchInput")
const sortSelection = document.getElementById('sortSelection')
const gridBtn = document.getElementById('gridBtn')
const listBtn = document.getElementById('listBtn')
const bookContainer = document.getElementById('bookContainer')
const loader = document.getElementById('loader')

let allBooks = []
let currentPage = 1;
let isFetching = false;

async function fetchBooks(page = 1) {
    if (isFetching) return;
    isFetching = true;
    loader.classList.remove('hidden');

    try {
        const response = await fetch(`https://api.freeapi.app/api/v1/public/books?page=${page}&limit=12`);
        const result = await response.json();
        const newBooks = result.data?.data || [];
        allBooks = [...allBooks, ...newBooks];
        applyFiltersAndRender();
    } catch (error) {
        console.error("Error fetching books:", error);
    } finally {
        isFetching = false;
        loader.classList.add('hidden');
    }
}

function renderBooks(booksToRender) {
    bookContainer.innerHTML = ''
    if (booksToRender.length === 0) {
        bookContainer.innerHTML = '<h2>No books found.</h2>';
        return;
    }
    booksToRender.forEach(book => {
        const title = book?.volumeInfo?.title || book?.title || 'Unknown Title';
        const author = book?.volumeInfo?.authors?.join(", ") || book?.author || 'Unknown Author'
        const publisher = book?.volumeInfo?.publisher || book?.publisher || 'Unknown Publisher'
        const publishedDate = book?.volumeInfo?.publishedDate || book?.publishedDate || 'Unknown Date'
        const thumbnail = book?.volumeInfo?.imageLinks?.thumbnail || book?.thumbnail || 'https://via.placeholder.com/150x200?text=No+Cover'; '#';
        const infoLink = book?.volumeInfo?.infoLink || book?.infoLink || "#"

        const card = document.createElement('a')
        card.className = 'book-card'
        card.href = infoLink;
        card.target = '_blank'

        card.innerHTML = `
            <img src="${thumbnail}" alt="${title}" class="book-thumbnail">
            <div class="book-info">
                <h3>${title}</h3>
                <p><strong>Author:</strong> ${author}</p>
                <p><strong>Publisher:</strong> ${publisher}</p>
                <p><strong>Released:</strong> ${publishedDate}</p>
            </div>
        `;
        bookContainer.appendChild(card);
    })
}

function applyFiltersAndRender() {
    const searchTerm = searchInput.value.toLowerCase();
    const sortValue = sortSelection.value;

    let filteredBooks = allBooks.filter(book => {
        const title = (book?.volumeInfo?.title || book?.title || "").toLowerCase()
        const author = (book?.volumeInfo?.author.join(", ") || book?.author || "").toLowerCase()
        return title.includes(searchTerm) || author.includes(searchTerm)
    });

    filteredBooks.sort((a, b) => {
        const titleA = (a?.volumeInfo?.title || a?.title || '').toLowerCase()
        const titleB = (b?.volumeInfo?.title || b?.title || '').toLowerCase()

        const dateA = new Date(a?.volumeInfo?.publishedDate || a?.publishedDate || 0).getTime();
        const dateB = new Date(b?.volumeInfo?.publishedDate || b?.publishedDate || 0).getTime();

        if (sortValue === 'title-asc') return titleA.localeCompare(titleB);
        if (sortValue === 'title-desc') return titleB.localeCompare(titleA);
        if (sortValue === 'date-new') return dateB - dateA;
        if (sortValue === 'date-old') return dateA - dateB
        return 0;
    })
    renderBooks(filteredBooks);
}

searchInput.addEventListener('input', applyFiltersAndRender)
sortSelection.addEventListener('change', applyFiltersAndRender)

gridBtn.addEventListener('click', () => {
    bookContainer.className = 'grid-view'
    gridBtn.classList.add('active')
    listBtn.classList.remove('active')
})

listBtn.addEventListener('click', () => {
    bookContainer.className = 'list-view'
    listBtn.classList.add('active')
    gridBtn.classList.remove('active')
})

window.addEventListener('scroll', () => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight - 200) {
        if (searchInput.value === '') {
            currentPage++;
            fetchBooks(currentPage)
        }
    }
})

fetchBooks(currentPage);