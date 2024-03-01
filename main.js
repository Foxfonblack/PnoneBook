const contactForm = document.querySelector(".contact-form");
const nameInput = document.querySelector("#name-input");
const phoneInput = document.querySelector("#phone-input");
const contactList = document.querySelector(".contacts-list");
let contactArr = [];

let id = 1;
contactForm.addEventListener("submit", addContact);
function addContact(event) {
    event.preventDefault();
    const elements = event.currentTarget.elements;
    const contact = {
        id,
        name: elements.name.value,
        phone: elements.phone.value,
    };
    contactArr.push(contact);
    id += 1;
    console.log(contactArr);
    event.currentTarget.reset();
    const result = contactArr
        .map((item) => {
            return `
        <li class="contactItem" id=${item.id}>
            <div class="contactsTextWrapper">
                <p class="contact-name">name:    ${item.name}</p>
                <p class="contact-phone">phone:    ${item.phone}</p>
            </div>
            <button class="deleteButton">DELETE</button>
        </li>`;
        })
        .join("");
    contactList.innerHTML = result;
    const deleteButton = document.querySelector(".deleteButton");
    deleteButton.addEventListener("click", OnDeleteButtonClick);
}
function OnDeleteButtonClick(event) {
    console.log(event.currentTarget.closest("li").id);

    const result = contactArr
        .filter((item) => {
            console.log(item.id);
            return item.id !== Number(event.currentTarget.closest("li").id);
        })
        .map((item) => {
            return `
    <li class="contactItem" id=${item.id}>
        <div class="contactsTextWrapper">
            <p class="contact-name">name:    ${item.name}</p>
            <p class="contact-phone">phone:    ${item.phone}</p>
        </div>
        <button class="deleteButton">DELETE</button>
    </li>`;
        })
        .join("");

    contactArr = result;
    contactList.innerHTML = result;
}
