const loadCategories = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/categories")
        .then((res) => res.json())
        .then((data) => displayCategories(data.categories))
        .catch((error) => console.log(error));
};
const loadPets = () => {
    fetch("https://openapi.programming-hero.com/api/peddy/pets")
        .then((res) => res.json())
        .then((data) => displayPets(data.pets))
        .catch((error) => console.log(error));
};
// {
//     "petId": 1,
//     "breed": "Golden Retriever",
//     "category": "Dog",
//     "date_of_birth": "2023-01-15",
//     "price": 1200,
//     "image": "https://i.ibb.co.com/p0w744T/pet-1.jpg",
//     "gender": "Male",
//     "pet_details": "This friendly male Golden Retriever is energetic and loyal, making him a perfect companion for families. Born on January 15, 2023, he enjoys playing outdoors and is especially great with children. Fully vaccinated, he's ready to join your family and bring endless joy. Priced at $1200, he offers love, loyalty, and a lively spirit for those seeking a playful yet gentle dog.",
//     "vaccinated_status": "Fully",
//     "pet_name": "Sunny"
// }
const displayCategories = (categories) => {
    categories.forEach((item) => {
        const categoryContainer = document.getElementById("categories")
        console.log(categories);
        const button = document.createElement("button");
        button.classList = "btn"
        button.innerText = item.category;
        categoryContainer.append(button)
    });
};
// const cardDemo=[
//     {
//         "id": 1,
//         "category": "Cat",
//         "category_icon": "https://i.ibb.co.com/N7dM2K1/cat.png"
//     },
//     {
//         "id": 2,
//         "category": "Dog",
//         "category_icon": "https://i.ibb.co.com/c8Yp1y7/dog.png"
//     },
//     {
//         "id": 3,
//         "category": "Rabbit",
//         "category_icon": "https://i.ibb.co.com/3hftmLC/rabbit.png"
//     },
//     {
//         "id": 4,
//         "category": "Bird",
//         "category_icon": "https://i.ibb.co.com/6HHZwfq/bird.png"
//     }
// ]
const displayPets = (pets) => {
    const petsContainer = document.getElementById("pets");
    pets.forEach(pet => {
        const card = document.createElement("div");
        card.classList="card card-compact";
        card.innerHTML =
        `
        <figure class="h-[200px]">
            <img
            src="${pet.image}"
            class="h-full w-full rounded-xl object-cover"
            alt="Shoes" />
        </figure>
        <div class="px-0 py-2">
            <h2 class="card-title">${pet.pet_name}</h2>
            <p>Breed:${pet.breed?.length>=0? `${pet.breed}`:"Not Available"}</p>
            <p>Birth:${pet.date_of_birth?.length>=0 ? `${pet.date_of_birth}`: "Not Available"}</p>
            <p>Gender:${pet.gender?.length>=0 ? `${pet.gender}`: "Not Available"}</p>
            <p>Price:${pet.price>0 ? `${pet.price}$`:"Not Available"}</p>
            <div class="card-actions">
            <button class="btn"><i class="fa-regular fa-thumbs-up"></i></button>
            <button class="btn">Adopt</button>
            <button class="btn">Details</button>
            </div>
        </div>
        `;
        petsContainer.append(card);
    })
};
loadCategories()
loadPets()