const accordionElem = document.querySelector(".accordion");
const leftColumn = document.querySelector(".left-column");
const rightColumn = document.querySelector(".right-column");
const accordionHeaders = document.querySelectorAll(".accordion-header");
const template = document.querySelector("template");
let currentVote = null;

const accordionItems = [
    {
        id: 1,
        question: "How to add recurring tasks in Intentus?",
        answer: `Adding recurring tasks in Intentus is simply done by seting a date and time 
        on the date-picker when displayed, then assign the repeat feature to everyday when creating
        the task and you want.`,
        helpful: 436,
        notHelpful: 65,
        column: "column1",
    },
    {
        id: 2,
        question: "How do I sync my notes across my devices?",
        answer: `In order to successfully sync your notes across all devices, you can simply install the 
        desktop app version of Intentus and login into your account, if previously created on your phone.
        This allows automatic sync of all notes and app across devices.`,
        helpful: 500,
        notHelpful: 13,
        column: "column2",
    },
    {
        id: 3,
        question: "Can the recurring tasks chart data be disabled?",
        answer: `The chart data that displays your streak of recurring tasks is automatically activated
        when you set your first recurring task, but can be disabled by opening settings on the app sidebar,
        then opening features, and simply toggling the chart on and off.`,
        helpful: 152,
        notHelpful: 6,
        column: "column1",
    },
    {
        id: 4,
        question: "Can I opt out of recurring tasks?",
        answer: `Of course! Recurring tasks are created the first time that you ask a task to repeat at a 
        set amount of time, it could be every Thursday, every July 4th and so on, all you need to do is
        right-click on desktop, or long press on mobile to activate the menu then select edit and remove
        the set time. It's simply a choice.`,
        helpful: 36,
        notHelpful: 0,
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
        helpful: 812,
        notHelpful: 0,
        column: "column1",
    },
    {
        id: 6,
        question: "Can I add images to my notes?",
        answer: `Unfortunately, the ability to add images to notes hasn't yet been implemented
        into our app, but is a coming possibility OR demo feature to be used by Intentus.`,
        helpful: 41,
        notHelpful: 26,
        column: "column2",
    },
];

const columns = {
    column1: leftColumn,
    column2: rightColumn,
}

const accordion = accordionItems;

const icons = {
    thumbsDown: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
        stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
        class="lucide lucide-thumbs-down-icon lucide-thumbs-down">
        <path
            d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" />
        <path d="M17 14V2" />
    </svg>`,
    thumbsUp: `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none"
    stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"
    class="lucide lucide-thumbs-up-icon lucide-thumbs-up">
    <path
        d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" />
    <path d="M7 10v12" />
</svg>`,
}

function renderAccordion(items) {
    items.forEach(accordion => {
        const accordionItem = template.content.cloneNode(true);
        const accordionHeader = accordionItem.querySelector(".accordion-header");
        const accordionContent = accordionItem.querySelector(".accordion-content");
        const accordionBody = accordionItem.querySelector(".accordion-body");
        accordionHeader.textContent = `${ accordion.question }`;
        accordionContent.textContent = `${ accordion.answer }`;
        columns[accordion.column].append(accordionItem);
    });
};

renderAccordion(accordionItems);

function setUpAccordion() {
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

setUpAccordion();