import "./accordion.css";

const template = document.querySelector("template");
const leftColumn = document.querySelector(".left-column");
const accordionElem = document.querySelector(".accordion");
const rightColumn = document.querySelector(".right-column");

const accordionItems = [
    {
        id: 1,
        question: "How to add recurring tasks in Intentus?",
        answer: `Adding recurring tasks in Intentus is simply done by seting a date and time 
        on the date-picker when displayed, then assign the repeat feature to everyday when creating
        the task and you want.`,
        column: "column1",
    },
    {
        id: 2,
        question: "How do I sync my notes across my devices?",
        answer: `In order to successfully sync your notes across all devices, you can simply install the 
        desktop app version of Intentus and login into your account, if previously created on your phone.
        This allows automatic sync of all notes and app across devices.`,
        column: "column2",
    },
    {
        id: 3,
        question: "Can the recurring tasks chart data be disabled?",
        answer: `The chart data that displays your streak of recurring tasks is automatically activated
        when you set your first recurring task, but can be disabled by opening settings on the app sidebar,
        then opening features, and simply toggling the chart on and off.`,
        column: "column1",
    },
    {
        id: 4,
        question: "Can I opt out of recurring tasks?",
        answer: `Of course! Recurring tasks are created the first time that you ask a task to repeat at a 
        set amount of time, it could be every Thursday, every July 4th and so on, all you need to do is
        right-click on desktop, or long press on mobile to activate the menu then select edit and remove
        the set time. It's simply a choice.`,
        column: "column2",
    },
    {
        id: 5,
        question: "Can I share notes to my friends?",
        answer: `Absolutely! Sharing is one of the awesome features of the note card. You simply 
        long-press on mobile to display the menu, right-click for desktop, then click on share to
        open up the share menu, you can then select where you want your note to be shared to. The
        share button is also visible in the full page editing mode, activated via double click on
        both mobile and desktop.`,
        column: "column1",
    },
    {
        id: 6,
        question: "Can I add images to my notes?",
        answer: `Unfortunately, the ability to add images to notes hasn't yet been implemented
        into our app, but is a coming possibility OR demo feature to be used by Intentus.`,
        column: "column2",
    },
];
const columns = { column1: leftColumn, column2: rightColumn };

function renderAccordion(items) {
    items.forEach(accordion => {
        const accordionItem = template.content.cloneNode(true);
        const accordionHeader = accordionItem.querySelector(".accordion-header");
        const accordionContent = accordionItem.querySelector(".accordion-content");
        accordionHeader.textContent = `${ accordion.question }`;
        accordionContent.textContent = `${ accordion.answer }`;
        columns[accordion.column].append(accordionItem);
    });
};

function setUpAccordion(accordionElem) {
    const accordionHeaders = accordionElem.querySelectorAll(".accordion-header");
    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const wasActive = header.classList.contains("active");
            accordionHeaders.forEach(header => {
                header.classList.remove("active");
                header.nextElementSibling.style.maxHeight = 0;
            });
            if (!wasActive) {
                header.classList.add("active");
                header.nextElementSibling.style.maxHeight = header.nextElementSibling.scrollHeight + "px";
            }
        });
    });
}

setUpAccordion(accordionElem);
renderAccordion(accordionItems);