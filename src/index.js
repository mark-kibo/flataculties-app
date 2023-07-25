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
// create a fetch functon to get the first animal from our local db
const fetchFirstAnimal = async () => {
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
          // this will return the first data of our object
            return data[0];
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

// create a post request to add a new animal
// takes a body object as a parameter body-{
    // "name":"animalname",
    // "image":"imageurl",
    // "votes":"0"
// }

const postAnimal = async (body) => {
    // create our options for the request
    let options={
        method:"POST",
        headers:{
            "Content-Type":"application/json",
            Accept:"application/json"
        },
        body:JSON.stringify(body)
    }
    try {
        // get our response and pass our options
        const response = await fetch("http://localhost:3000/characters", options)
        // check if our request is accepted
        if (response.status != 200) {
            // throw aan error of our own
            throw new Error("the passed data is not valid")
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
    let resetButton=document.querySelector("#reset-btn")
    let addAnimalForm=document.querySelector("#character-form")

    // store my original vote
    let originalVoteCount = characterInfoVote.innerHTML;
  
    // add a default first animal before click
     fetchFirstAnimal().then(
        data=>{
            characterInfoName.innerHTML=`${data.name}`
            characterInfoImage.src=`${data.image}`
            characterInfoVote.innerHTML=`${data.votes}`
            characterInfoVote.setAttribute('id', data.id)
  
            originalVoteCount=0;
        }
    )


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
                    // update my original vote
                    originalVoteCount=data.votes
                    
                })
            })
        })
    })
    // add event listener on form to add votes to image
    form.addEventListener("submit", (e)=>{
        e.preventDefault()
        // set my original vote count to the animal vote
         // check if my vote container actually has a number on it
        if (Number.isInteger(parseInt(characterInfoVote.innerHTML))){
            // update my vote count
            let updatedVote =parseInt(characterInfoVote.innerHTML) +parseInt(e.target.querySelector("#votes").value)
            characterInfoVote.innerHTML=``
            characterInfoVote.innerHTML=updatedVote
        }
        form.reset()
    })

    // add an event listener on the reset button
    resetButton.addEventListener("click", ()=>{
        // return my vote count to the original one
        characterInfoVote.innerHTML=``
        characterInfoVote.innerHTML=`${originalVoteCount}`
    })

    // add event listener on our character form to add a new animal
    addAnimalForm.addEventListener("submit", (e)=>{
        e.preventDefault()
        // create empty body
        let body={}
        // access the values of our input
        let name=e.target.querySelector("#name").value
        let image= e.target.querySelector("#image-url").value

        // store our values in the body object
        body.name=name
        body.image=image
        body.votes=0
        console.log(body)

        // post out data to the db
        postAnimal(body)
        form.reset()
    })


})
