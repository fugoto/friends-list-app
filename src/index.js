//[PK] Why require this if you don't use it?
const html = require("html-template-tag")

async function updateFriends() {
	try {
		const result = await fetch("/api/friends")
		const data = await result.json()
		//[PK] your try-catch should probably end here -- lines 6 & 7 are the places where you are more likely to have an error. if you get an error below this, your code is really not ready for production!
		document.getElementById("error").innerHTML = ""
		data.forEach(obj => {
			//is there a better way to do this where I can just append a chunk of html code?
			// document.getElementById('list').append(`${data.forEach(obj => html`
			// <li class='name'>${obj.name}</li>
			// <span class='ratings'>${obj.ratings}</span>
			// <button id='add-vote'>+</button>
			// <button id='sub-vote'>-</button>
			// <button id='remove'>x</button>`)}`)
			let newDiv = document.createElement("div")
			document.getElementById("list").append(newDiv)
			newDiv.id = obj.name

			let newLi = document.createElement("li")
			newLi.innerHTML = obj.name
			newLi.className = "friendName"

			let newRating = document.createElement("span")
			newRating.innerHTML = obj.rating
			newRating.id = `${obj.name}-rating`
			newRating.className = "rating"

			let addButton = document.createElement("button")
			addButton.innerHTML = "+"
			addButton.className = "add-button"
			addButton.id = `${obj.name}-add`
			addButtonClick(addButton)

			let minusButton = document.createElement("button")
			minusButton.innerHTML = "-"
			minusButton.className = "minus-button"
			minusButton.id = `${obj.name}-minus`
			minusButtonClick(minusButton)

			let delButton = document.createElement("button")
			delButton.innerHTML = "x"
			delButton.className = "del-button"
			delButton.id = `${obj.name}-del`
			delButtonClick(delButton)

			newDiv.append(newLi, newRating, addButton, minusButton, delButton)
		})
	} catch (error) {
		//[PK] it's a good idea to try-catch something that might throw an error, but on the front-end there's not much point in doing it unless you use it to give the user a very friendly error message!
		console.error(error)
	}
}

updateFriends()
//what is :id trying to do here? is it an issue that PUT and DELETE returns a 404?
document.getElementById("create").addEventListener("click", async function () {
	try {
		let newFriend = document.getElementById("new-friend").value
		if (!newFriend)
			document.getElementById("error").innerHTML =
				"Validation Error: Validation notEmpty on name failed"
		else {
			//[PK] Delete this comment!
			// await fetch(`/api/friends/${newFriend}`,{
			//     method: 'PUT'
			//     }
			await fetch("/api/friends/:id", {
				method: "PUT",
				body: JSON.stringify({ newFriend }),
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
			}).then(response => {
				if (response.redirected) window.location.href = response.url
				else if (!response.ok) {
					document.getElementById("error").innerHTML = "Validation Error"
				}
				return response
			})
			//[PK] Delete this comment!
			// .then(response => {
			//     if(response.redirected) {
			//     window.location.href = response.url
			//     }
			// })
		}
	} catch (error) {
		console.error(error)
	}
})

//could the vote be added on the backend, and then DOM update - or would that risk being too slow to update rating # on webpage given the await on fetch?
function addButtonClick(addButton) {
	addButton.addEventListener("click", async function (event) {
		try {
			const updated = event.target.parentNode.id
			const updatedRating = ++document.getElementById(`${updated}-rating`)
				.innerHTML
			//[PK] Not using `result` so just `await fetch(...` is fine
			const result = await fetch("/api/friends", {
				method: "POST",
				body: JSON.stringify({ updated, updatedRating }),
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
			}).then(response => {
				if (response.redirected) {
					window.location.href = response.url
				}
			})
		} catch (error) {
			console.error(error)
		}
	})
}

function minusButtonClick(minusButton) {
	minusButton.addEventListener("click", async function (event) {
		try {
			const updated = event.target.parentNode.id
			const updatedRating = --document.getElementById(`${updated}-rating`)
				.innerHTML
			//[PK] again `result` unused
			const result = await fetch("/api/friends", {
				method: "POST",
				body: JSON.stringify({ updated, updatedRating }),
				headers: {
					"Content-Type": "application/json",
				},
				redirect: "follow",
			}).then(response => {
				if (response.redirected) {
					window.location.href = response.url
				}
			})
		} catch (error) {
			console.error(error)
		}
	})
}

//how do i do the redirect with async await? do i need async await if i have .then?
function delButtonClick(delButton) {
	delButton.addEventListener("click", async function (event) {
		try {
			const deleted = event.target.parentNode.id
			//[PK] delete comment
			// const result =  await fetch(`/api/friends/${deleted}`,{
			//     method: 'DELETE',
			//     redirect: 'follow'
			await fetch(`/api/friends/:id`, {
				method: "DELETE",
				redirect: "follow",
				body: JSON.stringify({ deleted }),
				headers: {
					"Content-Type": "application/json",
				},
			}).then(response => {
				if (response.redirected) {
					window.location.href = response.url
				}
			})
		} catch (error) {
			console.error(error)
		}
	})
}

// potential other implementation with same eventhandler with conditions on whether its an add or minus button
// function ratingsButtonClick(button){
//     button.addEventListener('click',async function(event){
//         try{
//             const added = event.target.parentNode.id
//             console.log(added)
//             if (event.target.id === 'add-button') const addedRating = ++document.getElementById(`${added}-rating`).innerHTML
//             if (event.target.id === 'minus-button') const addedRating = --document.getElementById(`${added}-rating`).innerHTML

//             console.log(addedRating)
//             const result = await fetch('/api/friends', {
//                 method: 'POST',
//                 body: JSON.stringify( {added, addedRating} ),
//             headers: {
//                 "Content-Type": "application/json"
//             }
//         })
//             const data = await result.json()
//             }catch(error) { console.error(error)}
//         })
//     }
