const contactForm = document.querySelector(".contact-form");
const nameInput = document.querySelector("#name-input");
const phoneInput = document.querySelector("#phone-input");
const contactList = document.querySelector(".contacts-list");
const contactImageInput = document.querySelector(".contact-image-input");
let src = null;
let contactArr = [];
let id = 1;

contactForm.addEventListener("submit", addContact);
contactImageInput.addEventListener("change", onImageInputChange);
function onImageInputChange(event) {
    console.log(event.target.files);
    console.log("onchange");
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    console.log(reader);
    reader.addEventListener("load", function () {
        if (reader.result) {
            src = reader.result;
            console.log(src);
        }
    });
}
// function onImageLoad() {

// }

const localContact = JSON.parse(localStorage.getItem("contacts"));
console.log(localContact);

contactArr = localContact ? localContact : [];

document.addEventListener("DOMContentLoaded", renderContacts);

function addContact(event) {
    event.preventDefault();
    const elements = contactForm.elements;
    if (elements.name.value === "") {
        alert("поле 'name' не может быть пустым");
        return;
    }
    if (elements.phone.value === "") {
        alert("поле 'phone' не может быть пустым");
        return;
    }
    const contact = {
        id,
        name: elements.name.value,
        phone: elements.phone.value,
        src,
        spanIdPhone,
        spanIdName,
    };
    contactArr.push(contact);
    id += 1;

    contactForm.reset();
    renderContacts();
    localStorage.setItem("contacts", JSON.stringify(contactArr));
}

function renderContacts() {
    const result = contactArr
        .map((item) => {
            return `
            <li class="contactItem" id=${item.id}>
         
                <div class="contact-form-wrapper">
                <img width='64' height='64' class="contact-image" src=${item.src} alt="">
                <div class="contactsTextWrapper">
                    <p class="contact-name">name:    <span class="contact-span-name" id='span1'>${item.name}</span></p>
                    <p class="contact-phone">phone:    <span class="contact-span-phone"id = 'span2'>${item.phone}</span></p>
                </div>
                </div>
                <div class="btn-wrapper">
                <button class="delete-button">DELETE</button>
                <buttton class="edit-button">EDIT</buttton>
                 </div>
         
            </li>`;
        })
        .join("");
    contactList.innerHTML = result;
    // addDeleteEventListeners();
}

// let counter = 0;
// function addDeleteEventListeners() {
//     const deleteButton = document.querySelectorAll(".deleteButton");
//     deleteButton.forEach((button) => {
//         button.addEventListener("click", OnDeleteButtonClick);
//         counter += 1;
//         console.log(counter);
//     });
// }

contactList.addEventListener("click", OnDeleteButtonClick);
contactList.addEventListener("click", onEditBtnClick);
contactList.addEventListener("click", OnSaveButtonClick);
function OnDeleteButtonClick(event) {
    // const contactId = Number(event.currentTarget.closest("li").id);
    // contactArr = contactArr.filter((item) => item.id !== contactId);
    // renderContacts();
    if (event.target.classList.contains("delete-button")) {
        console.log("click");
        const contactId = Number(event.target.closest("li").id);
        contactArr = contactArr.filter((item) => item.id !== contactId);
        localStorage.setItem("contacts", JSON.stringify(contactArr));
        renderContacts();
    }
}

function onEditBtnClick(event) {
    if (event.target.classList.contains("edit-button")) {
        const textAreaName = document.createElement("textarea");
        textAreaName.classList.add("textAreaName", "textAreaElement");
        textAreaName.value = event.target
            .closest("li")
            .querySelector("#span1").textContent;
        // event.target.closest(
        //     "li"
        // ).firstElementChild.nextElementSibling.nextElementSibling.firstElementChild.firstElementChild.firstElementChild.textContent;

        const textAreaPhone = document.createElement("textarea");
        textAreaPhone.classList.add("textAreaPhone", "textAreaElement");
        textAreaPhone.value = event.target
            .closest("li")
            .querySelector("#span2").textContent;
        const saveButton = document.createElement("div");
        saveButton.classList.add("saveButton", "textAreaElement");
        saveButton.textContent = "SAVE";
        event.target
            .closest("li")
            .append(textAreaName, textAreaPhone, saveButton);
    }
}

function OnSaveButtonClick(event) {
    if (event.target.classList.contains("saveButton")) {
        event.target.closest(
            "li"
        ).firstElementChild.firstElementChild.firstElementChild.firstElementChild.textContent =
            event.target.closest(
                "li"
            ).firstElementChild.nextElementSibling.value;
        event.target.closest(
            "li"
        ).firstElementChild.firstElementChild.lastElementChild.firstElementChild.textContent =
            event.target.closest(
                "li"
            ).lastElementChild.previousElementSibling.value;
        event.target
            .closest("li")
            .querySelectorAll(".textAreaElement")
            .forEach((item) => item.remove());
    }
}
