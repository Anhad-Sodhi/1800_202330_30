const submissionForm = document.querySelector("#submission-form");
const photo = document.querySelector("#food-photo");
const foodType = document.querySelector("#food-type");
const price = document.querySelector("#food-price");
const description = document.querySelector("#food-description");
const address = document.querySelector("#adress");
const submit = document.querySelector("#submit-button");

submit.addEventListener('click', (e) => {
    e.preventDefault();
    db.collection('submission-form').doc().set({
        photo: photo.value,
        foodType: foodType.value,
        foodPrice: price.value,
        foodDescription: description.value,
        address: address.value,
    }).then(() => {
        submissionForm.reset();      
    })
});