const cards = []; 

const formFields = {
    name: document.querySelector('#form_name'),
    email: document.querySelector('#form_email'),
    designation: document.querySelector('#form_designation'),
    about: document.querySelector('#form_about'),
    profileImg: document.querySelector('#form_profile_img'),
    coverImg: document.querySelector('#form_profile_cover')
};

const edit_btn = document.getElementById('edit')
const del_btn = document.getElementById('delete')
const container = document.querySelector('.cards_slider')

let profile_url ='';
let cover_url = '';

formFields.profileImg.addEventListener('input',(e)=>{
    profile_url = URL.createObjectURL(e.target.files[0]);
    const uploadedText = document.querySelector('#profile_img_file');
    uploadedText.textContent = e.target.files[0].name;
});

formFields.coverImg.addEventListener('input',(e)=>{
    cover_url = URL.createObjectURL(e.target.files[0]);
    const uploadedText = document.querySelector('#cover_img_file');
    uploadedText.textContent = e.target.files[0].name;
});


document.getElementById('submit_btn').addEventListener('click', () => {
    const cardData = {
        name: formFields.name.value.trim(), 
        email: formFields.email.value.trim(), 
        designation: formFields.designation.value.trim(), 
        about: formFields.about.value.trim(),
        profileImg: profile_url,
        coverImg: cover_url,
    };

    
    if (!cardData.name || !cardData.email || !cardData.designation || !cardData.about || !cardData.profileImg || !cardData.coverImg) {
        alert("Please fill in all fields and upload both images.");
        return;
    }

    cards.push(cardData);
    loadData();
    clearForm(); 
});

function clearForm() {
    formFields.name.value = '';
    formFields.email.value = '';
    formFields.designation.value = '';
    formFields.about.value = '';

    document.querySelectorAll('.uploaded').forEach(p => p.textContent = 'No file chosen');
}

function deleteCard(id){
    if(confirm("Are you sure?")){
    cards.splice(id,1)
    console.log('btn clicked', id)
    loadData();
    }
}

function loadData(){
    container.innerHTML =''
    cards.map((e,i)=>{
        container.innerHTML += `
        <div class="card">
                <div class="function_btn">
                    <span ><ion-icon name="create" id="edit"></ion-icon></span>
                    <span ><ion-icon name="close-circle" id="delete" onclick="deleteCard(${i})"></ion-icon></span>
                </div>
                <div class="cover_image"><img src="${e.coverImg}"
                        alt="Cover Image"></div>
                <div class="profile_pic"><img src="${e.profileImg}"
                        alt="Profile Picture"></div>
                <h3 class="profile_name">${e.name}</h3>
                <p>${e.email}</p>
                <p>${e.designation}</p>
                <p>${e.about}</p>
            </div>
        `
    })
}
 loadData()