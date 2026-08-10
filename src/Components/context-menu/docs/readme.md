# Context Menu: 
    A context menu is a general-purpose component with the ability to perform certain actions based on the buttons clicked on it.

## Completed
- [✔] Made Menu Dynamic
- [✔] Added Copy Link Action
- [✔] Added Right Click
- [✔] Added Keyboard Support
- [✔] Added Click outside to exit
- [✔] Added ClassNames 
- [✔] Added Icons Library
- [✔] Section separation
- [✔] Pointer support
- [✔] Added Animation
- [✔] Added Positioning

## To-do
- [✔] Turn into web component
- [] Re-use in notes app:
    - [✔] Use Web Share API
    - [] Make Content downloadable
    - [✔] Copy notes
    - [] Edit Content
- [✔] Add aria-attributes
- [✔] Learn Web Share API
- [✔] Add functionality to other buttons

## Events
- contextmenu event handler: to enable right click to reveal the menu
- pointerdown: to exit the context menu
- keydown: to check keys pressed and perform actions based on them

## Dependencies
- none

## Browser APIs
- `Clipboard API`:
    for copying text:
    ```js
    navigator.clipboard.writeText();
    ```
- Web Share API for sharing content: 
```js
navigator.share();
```
- Web components

## Accessibility
- `Esc` keyboard event escapes the menu when open (closes it)
- Can be focused
- Arrow down keys for navigating to the previous item
- Arrow up keys for navigating to the next item
- First item is focused on initial open
- Previously selected item is focused on next open

## Concepts Learned
- Pointer events
- Accessibility
- Dynamic object rendering
- Using functions from objects
- context menu event listener

## Ideas
- Mobile bottom sheet

## Will be used by
- Notes App
- Dashboards