const loadCategory = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayPetsCard(data.pets))
        .catch((error) => console.log(error));
};
const loadSortPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => sortPet(data.pets))
        .catch((error) => console.log(error));
};
const loadCategoryPets = (id) => {
    fetch(`https://openapi.programming-hero.com/api/peddy/category/${id}`)
        .then((res) => res.json())
        .then((data) => {
            removeActiveClass()
            const activeBtn = document.getElementById(`${id}`);
            activeBtn.classList.add("active")
            displayPetsCard(data.data)
        })
        .catch((error) => console.log(error));
};
const removeActiveClass = () => {
    const buttons = document.getElementsByClassName("category-btn");
    for (let btn of buttons) {
        btn.classList.remove("active")
    }
}
const loadPetsDetails = async (petId) => {
    console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayPetDetails(data.petData)
};
const loadAdoptPets = async (petId, button) => {
    console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayAdoptPets(data.petData, button)
};
const displayAdoptPets = (petData, button) => {
    const showAdoptModal = document.getElementById('showAdoptModal');
    const countdownElement = document.getElementById('countdown');
    let countdownTime = 3;
    showAdoptModal.classList.add('modal-open');
    countdownElement.textContent = countdownTime;
    var countdownInterval = setInterval(function () {
        countdownTime--;
        countdownElement.textContent = countdownTime;
        if (countdownTime <= 0) {
            showAdoptModal.classList.remove('modal-open');
            clearInterval(countdownInterval);
        }
    }, 1000);
    button.disabled = true;
    document.getElementById('showAdoptModal').click();
};
const loadClickedPets = async (petId) => {
    console.log(petId);
    const uri = `https://openapi.programming-hero.com/api/peddy/pet/${petId}`;
    const res = await fetch(uri);
    const data = await res.json();
    displayClickedPets(data.petData)
};
const displayClickedPets = (petData) => {
    const clickedPetsContainer = document.getElementById('pet-clicked-content');
    const clickedPet = document.createElement('div');
    clickedPet.innerHTML = `
    <div class ="p-3"> <img class="rounded-xl w-full h-[200px] mx-auto" src= ${petData.image} alt="Pets" /></div>`;
    clickedPetsContainer.append(clickedPet)
};
const displayPetDetails = (petData) => {
    console.log(petData);
    const detailContainer = document.getElementById('modal-content');
    detailContainer.innerHTML =
        ` <img class="rounded-lg w-full" src= ${petData.image} alt="Pets" />
            <h2 class="card-title mt-4 mb-2">${petData.pet_name}</h2>
            <div class="flex items-center gap-1">
            <img src="images/frame1.png" alt="">
            <p>Breed: ${petData.breed?.length >= 0 ? `${petData.breed}` : "Not Available"}</p>
            </div>
            <div class="flex items-center gap-1">
            <img src="images/frame2.png" alt="">
            <p>Birth: ${petData.date_of_birth?.length >= 0 ? `${petData.date_of_birth}` : "Not Available"}</p>
            </div>
            <div class="flex items-center gap-1">
            <img src="images/frame3.png" alt="">
            <p>Gender: ${petData.gender?.length >= 0 ? `${petData.gender}` : "Not Available"}</p>
            </div>
            <div class="flex items-center gap-1">
            <img src="images/frame4.png" alt="">
            <p>Price: ${petData.price > 0 ? `${petData.price}$` : "Not Available"}</p>
            </div>
            
            
            
            <h2 class="card-title mt-4">Detail Information</h2>
            <h2 class="mb-4">${petData.pet_details}</h2>
    `;
    document.getElementById('showModal').click();
};
const displayCategories = (categories) => {
    const categoryContainer = document.getElementById('categories');
    categories.forEach(item => {
        const btn = document.createElement('button');
        btn.classList = 'border border-stone-200 rounded-2xl mx-10 lg:mx-0';
        btn.innerHTML = `<button onclick="loadCategoryPets('${item.category}')" id="${item.category}" class="flex justify-center lg:justify-between  px-5 py-4 lg:py-3 items-center font-bold gap-2 rounded-2xl w-full category-btn">
        <img class="w-[20px]" src="${item.category_icon}"/> ${item.category}</button>`;
        categoryContainer.append(btn);
    });
};
const displayPetsCard = (pets) => {
    const allPetsContainers = document.getElementById('pets');
    allPetsContainers.innerHTML = "";
    if (pets.length == 0) {
        allPetsContainers.innerHTML = `
        <div class=lg:col-span-3 md:grid-cols-2 lg:grid-cols-3 auto-rows-min">
        <div class="flex flex-col justify-center items-center hero bg-base-200 p-5 rounded-xl">
        <img src="images/error.webp" alt="">
        <h2 class="text-4xl font-bold">No Information Available</h2>
        <p>This subject-related information is not available.</p>
        </div>
        </div>
        `;
        return;
    }
    pets.forEach((pet) => {
        const card = document.createElement('div');
        card.classList = 'card card-compact mx-2 mb-4 ';
        card.innerHTML = `
        <div class="card card-compact bg-base-100 w-full  border border-stone-200 ">
                <div class="p-4">
                    <figure class =" w-full relative ">
                      <img class="w-full md:h-[200px] lg:h-[200px]  rounded-lg"
                        src= ${pet.image}
                        alt="Pets" />
                    </figure>
                    
                    <div class="mt-4">
                      <h2 class="card-title">${pet.pet_name}</h2>
                      <div class="flex items-center gap-1">
                      <img src="images/frame1.png" alt="">
                      <p>Breed: ${pet.breed?.length >= 0 ? `${pet.breed}` : "Not Available"}</p>
                      </div>
                      <div class="flex items-center gap-1">
                      <img src="images/frame2.png" alt="">
                      <p>Birth: ${pet.date_of_birth?.length >= 0 ? `${pet.date_of_birth}` : "Not Available"}</p>
                      </div>
                      <div class="flex items-center gap-1">
                      <img src="images/frame3.png" alt="">
                      <p>Gender: ${pet.gender?.length >= 0 ? `${pet.gender}` : "Not Available"}</p>
                      </div>
                      <div class="flex items-center gap-1">
                      <img src="images/frame4.png" alt="">
                      <p>Price: ${pet.price > 0 ? `${pet.price}$` : "Not Available"}</p>
                      </div>
                      <div class="card-actions mt-4 flex justify-center gap-x-6">
                        <button onclick="loadClickedPets('${pet.petId}')"class="btn px-7  bg-white hover:bg-[#0E7A81]  hover:text-white transition-colors ease-in duration-100 border-teal-500 font-extrabold"><i class="fa-regular fa-thumbs-up"></i></button>
                        <button onclick="loadAdoptPets('${pet.petId}',this)" class="btn bg-white hover:bg-[#0E7A81]  hover:text-white transition-colors ease-in duration-100 border-teal-500 font-extrabold">Adopt</button>
                        <div>
                        <button onclick="loadPetsDetails('${pet.petId}')" class="btn bg-white hover:bg-[#0E7A81]  hover:text-white transition-colors ease-in duration-100 border-teal-500 font-extrabold">Details</button>
                        </div>
                      </div>
                    </div>
                </div>
            </div>
        `
        allPetsContainers.append(card);
    })
}
loadPets();
loadCategory();
document.getElementById('sorting').addEventListener('click', function () {
    loadSortPets()
})
const sortPet = (pets) => {
    pets.sort((a, b) => b.price - a.price);
    displayPetsCard(pets)
}
