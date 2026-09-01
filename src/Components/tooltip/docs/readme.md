# Tooltip Component
# Purpose
A tooltip component is a highly simplistic component with no interactive controls, no complex actions to perform, and basically nothing special at all. It's singular purpose is to display text that may serve as information to the user, telling them about something, displaying something that appears unclear, or giving more details about an element.

# Use Cases
1. Displaying the aria-label of an icon only button to give more information about it incase it seems unclear. Perfect for accessibilty since it benefits both visual and impaired users.
2. Displaying the labels for links in a dashboard when it is in a collapsed state. 
3. Displaying patch notes when an app gets newly updated.
4. Questioning the user's theme preference - Rare occurence of interactivity on the tooltip as it provides a button that allows the user to perform the theme switch.

# Browser APIs
- Web Components

# Dependencies
- Custom Button Component:
```html
<my-button class="reveal-btn" aria-label="Create Note">
    <span slot="text" class="text">
        Reveal Tooltip
    </span>
</my-button>
```
While the tooltip itself rarely displays any interactive capabilities, it is most commonly triggered by a button click, hence the participation of the custom button web component through the use of custom events to reveal it.
# Events Involved include;
- onHover: Custom event that works on the button element being moused over. Most common trigger of the tooltip
- HoverOut: This is a custom event that runs when the button component is moused out. It's intention is to hide the tooltip display.
- onClick: Least common, but still used as a trigger for the tooltip. It takes place when the button is clicked. It is commonly used in situations like clicking a question mark icon to display information about an input field. 


# Functions:
- none

# Structure:
The simplicity of the tooltip also means it is highly unpredictable, there is no predefined data that one can expect to see by using the component. Instead, there is the capability of configuring the component to take arbitrary values, or only one actually, which is the text, or information conveyed by the tooltip.
```html
<tool-tip>
    <p slot="info">This is a tooltip</p>
</tool-tip>
```
The structure is extremely simple. All that there is, is text to be displayed by a paragraph element sitting in the component. 
```html
<div part="tooltip" class="tooltip">
    <slot name="info"></slot>
</div>
```
The internal structure is exactly as is in the component rendering, container and text. The tooltip can accept all sorts of text, and it is able to do so with the help of web component slots which function like children props in react. 
```html
<tool-tip>
    <p slot="info">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore ullam fugiat consequatur voluptatem, unde
        quaerat minus reprehenderit modi quo ad explicabo omnis! Culpa non sit odit fugiat minima sint ratione
        laborum soluta illum iste ad sapiente quam, nostrum omnis ab expedita impedit accusamus nulla magni qui vel
        maxime repudiandae ea. Perferendis sequi voluptas eaque porro neque! Doloremque non debitis ratione soluta
        porro velit excepturi ea cupiditate autem quae neque amet exercitationem voluptatibus dolor distinctio,
        voluptatem iure obcaecati vero repellat reprehenderit laboriosam! Quos est assumenda veritatis,
        reprehenderit laborum, dolore, voluptate necessitatibus perspiciatis atque voluptas tempore esse.
        Praesentium eos magnam maxime molestiae!
    </p>
</tool-tip>
```
Although, it is designed to simply display text, it is advisable to use a reasonable amount during configuration. The above example is a bad use case, and may cause overflowing, or drastic height increase, which is the point where it stops being a tooltip, and rather becomes a really huge and ugly container no matter the styling.

# Accessibility
- None yet