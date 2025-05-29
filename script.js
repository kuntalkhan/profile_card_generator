const cards = []; // Temporary storage

const formFields = {
    name: document.getElementById('form_name'),
    email: document.getElementById('form_email'),
    designation: document.getElementById('form_designation'),
    about: document.getElementById('form_about'),
    profileImg: document.getElementById('form_profile_img'),
    coverImg: document.getElementById('form_profile_cover')
};

let profileImgData = '';
let coverImgData = '';

// Update displayed file names
formFields.profileImg.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        readImage(file, (dataUrl) => profileImgData = dataUrl);
        const uploadedText = formFields.profileImg.closest('.img_upload_container').querySelector('.uploaded');
        uploadedText.textContent = file.name;
    }
});

formFields.coverImg.addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        readImage(file, (dataUrl) => coverImgData = dataUrl);
        const uploadedText = formFields.coverImg.closest('.img_upload_container').querySelector('.uploaded');
        uploadedText.textContent = file.name;
    }
});

function readImage(file, callback) {
    const reader = new FileReader();
    reader.onload = function (e) {
        callback(e.target.result);
    };
    reader.readAsDataURL(file);
}

// On Generate button click
document.getElementById('submit_btn').addEventListener('click', () => {
    const cardData = {
        name: formFields.name.value,
        email: formFields.email.value,
        designation: formFields.designation.value,
        about: formFields.about.value,
        profileImg: profileImgData,
        coverImg: coverImgData
    };

    if (!cardData.name || !cardData.email || !cardData.designation || !cardData.about || !cardData.profileImg || !cardData.coverImg) {
        alert("Please fill in all fields and upload both images.");
        return;
    }

    cards.push(cardData); // store in array
    appendCard(cardData); // render on page
    clearForm();
});

function appendCard({ name, email, designation, about, profileImg, coverImg }) {
    const container = document.querySelector('.cards_slider');

    const card = document.createElement('div');
    card.className = 'card';
    card.innerHTML = `
        <div class="cover_image"><img src="${coverImg}" alt="Cover Image"></div>
        <div class="profile_pic"><img src="${profileImg}" alt="Profile Picture"></div>
        <h3 class="profile_name">${name}</h3>
        <p>${email}</p>
        <p>${designation}</p>
        <p>${about}</p>
    `;

    container.appendChild(card);
}

function clearForm() {
    formFields.name.value = '';
    formFields.email.value = '';
    formFields.designation.value = '';
    formFields.about.value = '';
    formFields.profileImg.value = '';
    formFields.coverImg.value = '';
    profileImgData = '';
    coverImgData = '';

    // reset displayed file name
    document.querySelectorAll('.uploaded').forEach(p => p.textContent = 'Untitled.png');
}
