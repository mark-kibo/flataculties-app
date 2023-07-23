// Your code here

// create a fetch functon to get all animals from our local db
const fetchAllAnimals = async () => {
    try {
        // get our response
        const response = await fetch("http://localhost:3000/characters")
        // check if our request is accepted
        if (response.status != 200) {
            // throw aan error of our own
            throw new Error("Data is not available")
        } else {
            // if request is valid return our data
            const data = await response.json()
            return data;
        }

    } catch (e) {
        console.log(e)
    }
}


// create a fetch function that gets details of one animal
//  receives an id as an input

const fetchSpecficAnimal = async (id) => {
    try {
        // get our response
        const response = await fetch(`http://localhost:3000/characters/${id}`)
        // check if our request is accepted
        if (response.status != 200) {
            // throw aan error of our own
            throw new Error("Data is not available")
        } else {
            // if request is valid return our data
            const data = await response.json()
            return data;
        }

    } catch (e) {
        console.log(e)
    }
}


// launch our dom
document.addEventListener("DOMContentLoaded", () => {
    // access page elements
    let characterBar = document.getElementById("character-bar")
    let characterInfoName=document.querySelector("#name")
    let characterInfoImage=document.querySelector("#image")
    let characterInfoVote=document.querySelector("#vote-count")
    let form=document.querySelector("#votes-form")


    // fetch my data from local db
    let animalNames = fetchAllAnimals()
    animalNames.then(data => {
        data.map(animal => {
            // access each animal name and add it to the character bar
            let p = document.createElement('p')
            p.innerHTML = `${animal.name}`
            p.setAttribute('id', `${animal.id}`)
            characterBar.append(p)
            // add an event listener to our animal name
            p.addEventListener("click", (e) => {
                // get my animal data
                let animalInfo=fetchSpecficAnimal(e.target.id)
                animalInfo.then(data=>{
                    // access each animal and display its info on the front end
                    characterInfoName.innerHTML=`${data.name}`
                    characterInfoImage.src=`${data.image}`
                    characterInfoVote.innerHTML=`${data.votes}`
                    
                })
            })
        })
    })

    // add event listener on form to add votes to image
    form.addEventListener("submit", (e)=>{
        console.log(e.target.querySelector("#votes").value)
    })


})

