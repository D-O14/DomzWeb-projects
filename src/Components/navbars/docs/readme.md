# Navbar Component

# Purpose
A navbar is a simple component with the purpose of displaying the routes and links of a website and allowing navigation between those links to access multiple pages, or other sections on a single page.

# Features
- Allows SPA and MPA routing
- Displays brand name and logo
- Enables Sidebar Mode
- Responsive

# Modifiable Parts
- Brand name: using the `brandname` attribute on the element e.g.
```html
    <nav-bar brandname="DomzWeb"></nav-bar>
```
- Logo: using the `logo` attribute on the element e.g.
```html
    <nav-bar brandname="DomzWeb" logo="planet"></nav-bar>
```
The logo using the `initializeIcons` function underneath to find and display a matching logo.
- Navigation Link | part name: navlink: The links are exposed to external styling via the `part` attribute.
```css
::part(navlink){
    color: red;
}
```
- Link icon | part name: linkicon: The possibility of an icon being attached to the link raises need for an exposable part.
```css
::part(linkicon){
    width: 25px;
    height: 25px;
}
```
- Button Menu: A menu of buttons on the navbar may be needed depending on the website context, but instead of having it in-built, it can be composed and structured by the user via a slot.
Classic Menu Structure:
```html
<menu>
    <button class="btn">[Button 1]</button>
    <button class="btn">[Button 2]</button>
</menu>
```
Example Use Case:
```html
<nav-bar brandname="DomzWeb" logo="planet">
    <menu slot="navMenu">
        <button class="btn login-btn">Login</button>
        <button class="btn sign-up-btn">Sign Up</button>
    </menu>
</nav-bar>
```
- Dropdown: Sometimes, a mega menu, or a dropdown of possible ways users can contact you on your website may be needed, and there's no better way to display that information than on the navbar.
Classic Dropdown Structure (for navbars):
```html
<li class="dropdown">
    <div class="link">Contact</div>
    <ul class="dropdown-menu">
        <li>
            <a href="#" class="dropdown-link">
                [Possible Icon Of Choice]
                [Social Link 1]
                </a>
        </li>
        <li>
            <a href="#" class="dropdown-link">
                [Possible Icon Of Choice]
                [Social Link 2]
                </a>
        </li>
        <li>
            <a href="#" class="dropdown-link">
                [Possible Icon Of Choice]
                [Social Link 3]
                </a>
        </li>
        <li>
            <a href="#" class="dropdown-link">
                [Possible Icon Of Choice]
                [Social Link 4]
            </a>
        </li>
    </ul>
</li>
```
Example Use Case:
```html
<li class="dropdown">
    <div class="link">
        Contact
        <span class="icon chevron" data-icon="arrowDown"></span>
    </div>
    <ul class="dropdown-menu">
        <li>
            <a href="https://www.instagram.com/john's account" class="dropdown-link">
                <span class="icon instagram-icon" data-icon="instagram"></span>
                Instagram
            </a>
        </li>
        <li>
            <a href="https://github.com/john's account" class="dropdown-link">
                <span class="icon github-icon" data-icon="github"></span>
                Github
            </a>
        </li>
        <li>
            <a href="tel: XXX XXX XXX" class="dropdown-link">
                <span class="icon phone-icon" data-icon="phone"></span>
                Phone
            </a>
        </li>
        <li>
            <a href="mailto: johndoe@example.com" class="dropdown-link">
                <span class="icon email-icon" data-icon="email"></span>
                Email
            </a>
        </li>
    </ul>
</li>
```

# Anatomy
Uses JavaScript `Class` to attach to shadow DOM, create style, clone templates, build render functions.
Render Functions:
```js
    renderNavBar() { 
        this.renderLinks(); // Creates and constructs the structure of the links
        this.showSideBar(); // Creates and constructs the structure of the links into a sidebar on smaller screens
    };
```