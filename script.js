const form = document.querySelector("#note-form");
const noteInput = document.querySelector("#note-input");
const categorySelect = document.querySelector("#note-category");
const errorMessage = document.querySelector("#error-message");
const searchInput = document.querySelector("#search-input");
const noteCount = document.querySelector("#note-count");
const notesList = document.querySelector("#notes-list");
const clearAllBtn = document.querySelector("#clear-all-btn");
const pagination = document.querySelector("#pagination");
const prevBtn = document.querySelector("#prev-btn");
const nextBtn = document.querySelector("#next-btn");
const pageInfo = document.querySelector("#page-info");

const NOTES_PER_PAGE = 5;
let currentPage = 1;

let notes = JSON.parse(localStorage.getItem("quicknotes")) || [];

function saveNotes() {
  localStorage.setItem("quicknotes", JSON.stringify(notes));
}

function updateCount() {
  if (notes.length === 0) {
    noteCount.textContent = "You have no notes yet.";
  } else if (notes.length === 1) {
    noteCount.textContent = "You have 1 note.";
  } else {
    noteCount.textContent = `You have ${notes.length} notes.`;
  }
}

function render() {
  const words = searchInput.value.toLowerCase().split(" ").filter(Boolean);
  const visible = notes
    .filter((note) =>
      words.every((word) => note.text.toLowerCase().includes(word))
    )
    .reverse(); // newest first

  const totalPages = Math.max(1, Math.ceil(visible.length / NOTES_PER_PAGE));
  if (currentPage > totalPages) currentPage = totalPages;
  const start = (currentPage - 1) * NOTES_PER_PAGE;
  const pageNotes = visible.slice(start, start + NOTES_PER_PAGE);

  pagination.hidden = totalPages === 1;
  pageInfo.textContent = `Page ${currentPage} of ${totalPages}`;
  prevBtn.disabled = currentPage === 1;
  nextBtn.disabled = currentPage === totalPages;

  notesList.innerHTML = "";
  updateCount();

  if (notes.length > 0 && visible.length === 0) {
    const empty = document.createElement("li");
    empty.className = "empty";
    empty.textContent = "No notes match your search.";
    notesList.appendChild(empty);
    return;
  }

  pageNotes.forEach((note) => {
    const li = document.createElement("li");
    li.className = `note category-${note.category}`;

    const text = document.createElement("p");
    text.textContent = note.text;

    const info = document.createElement("small");
    info.textContent = `${note.category} · ${note.createdAt}`;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", () => {
      notes = notes.filter((n) => n.id !== note.id);
      saveNotes();
      render();
    });

    li.append(text, info, deleteBtn);
    notesList.appendChild(li);
  });
}

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = noteInput.value.trim();

  if (text === "") {
    errorMessage.textContent = "Please type a note first.";
    return;
  }
  if (text.length > 200) {
    errorMessage.textContent = "Notes must be 200 characters or fewer.";
    return;
  }

  notes.push({
    id: Date.now(),
    text: text,
    category: categorySelect.value,
    createdAt: new Date().toLocaleString(),
  });

  errorMessage.textContent = "";
  noteInput.value = "";
  currentPage = 1;
  saveNotes();
  render();
});

searchInput.addEventListener("input", () => {
  currentPage = 1;
  render();
});

prevBtn.addEventListener("click", () => {
  currentPage--;
  render();
});

nextBtn.addEventListener("click", () => {
  currentPage++;
  render();
});

clearAllBtn.addEventListener("click", () => {
  if (notes.length > 0 && confirm("Delete all notes?")) {
    notes = [];
    saveNotes();
    render();
  }
});

render();