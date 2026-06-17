const nameInput = document.getElementById('name')
const jobTitleInput = document.getElementById('jobTitle')
const AgeInput = document.getElementById('Age')
const BioInput = document.getElementById('Bio')

const submitBtn = document.getElementById('submitBtn')

const previewName = document.getElementById('previewName')
const previewJobTitle = document.getElementById('previewJobTitle')
const previewAge = document.getElementById('previewAge')
const previewBio = document.getElementById('previewBio')

nameInput.addEventListener('input', function(){
    if(nameInput.value === ''){
        previewName.innerText = 'Not provided';
    }else{
        previewName.innerText = nameInput.value;
    }
});

jobTitleInput.addEventListener('input', function(){
    if(jobTitleInput.value === ''){
        previewJobTitle.innerText = 'Not provided';
    }else{
        previewJobTitle.innerText = jobTitleInput.value;
    }
})

AgeInput.addEventListener('input', function (){
    if(AgeInput.value === ''){
        previewAge.innerText = 'Not provided';
    }else{
        previewAge.innerText = AgeInput.value;
    }
})

BioInput.addEventListener('input',function(){
    if(BioInput.value === ''){
        previewBio.innerText = 'Not provided';
    }else{
        previewBio.innerText = BioInput.value;
    }
})

submitBtn.addEventListener('click', function(event){
    event.preventDefault();
    alert('Profile saved !')
})