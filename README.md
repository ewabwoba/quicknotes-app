# QuickNotes

QuickNotes is a small note-taking web app built with plain HTML, CSS and JavaScript. You can write short notes, file them under a category, search through them and delete them. Your notes are saved in the browser, so they are still there after a refresh.

## Features

- Add notes (up to 200 characters) with a Personal, Work or Study category
- Each note shows its text, category and the date and time it was created
- Delete a single note, or clear all notes (with confirmation)
- Live search that ignores upper and lower case
- Validation messages for empty or too-long notes
- Note count that handles zero, one and many notes
- Notes saved with localStorage
- Responsive layout for small screens

## How to run locally

1. Clone or download this repository.
2. Open `index.html` in your web browser.

No installation or build step is needed.

## What I learned

- How to build a page with semantic HTML tags and labels linked to inputs
- How to lay out a form with Flexbox and use a media query for small screens
- How to keep data in an array of objects and rebuild the page with a `render()` function
- How to use `createElement` and `textContent` so user text is displayed safely
- How to save and load data with `localStorage`, `JSON.stringify` and `JSON.parse`
