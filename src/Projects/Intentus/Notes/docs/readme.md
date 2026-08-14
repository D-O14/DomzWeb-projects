# Intentus Notes Section
The notes section of the Intentus productivity app.

# Features:
- Dialog to create note
- Grid-style notes
- Deletion of notes
- Editing of notes
- Theme Switching
- Floating action button

# Upcoming:
- [✔️] Layout Changes
- [✔️] Animated Deletion state
- [] Theme change transitions
- [] Date of creation
- [] Extract Dialog Component
- [] Use illustration for empty state
- [] Add deleted item toast

# Roadmap
-----------------------------------------------
**Version-1/Initial Launch**:
- Editing & Deleting: Click on edit button to make title and content editable
```html
<h1 contenteditable="true">Note Title</h1>
<p contenteditable="true">Note Content...</p>
``` 
- Edited tag (possibly).
- Use `localstorage` to save settings.
- Relative Date of Creation.
- Modal to create note

**Version-2**:
- Date Sorting (replaces `Relative Date of Creation`).
- Checkbox to delete.
- Delete all feature.
- Layout Changes: Allow users to decide to use grid or list view for their notes

**Version-3**:
- Sidebar.
- Filters.
- Searchable content.
- Full page editing: Contains amount of characters.
- Pinned Notes

**Version-4**:
- Firebase Server and Database Integration.
- Account Creation and syncing.
- Folder Creation.
- Shareable notes.
- Remote configurations.

**Version-5**:
- Rich text editing
- Special commands: Allow commands using "/" e.g. "/link" to create a link. Inspo from Notion.
- Attachments: Allow attachment of files, excel tables, word documents, images and even powerpoint slides.
- Auto-complete and auto-correct in full page editing with AI(if possible)

**Version-6/Final Update**:
- React-based restructuring & UI changes. 