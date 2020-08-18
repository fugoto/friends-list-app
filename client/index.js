//do we not need to require index.html file?

document.getElementById('create').addEventListener('click',function(){
    const newFriend = document.getElementById('new-friend').value
    //const newFriendLi = document.createElement('li')
    //newFriendLi.innerHTML = newFriend
    console.log(newFriend)
    document.getElementById('list').appendChild(`
    <li class='name'>${newFriend}</li>
    <span class='votes'>5</span>
    <button id='add-vote'>+</button>
    <button id='sub-vote'>-</button>
    <button id='remove'>x</button>`)
})

async function updateFriends (){
    try{
        // document.getElementById('create').addEventListener('click',function(){
        //     const newFriend = document.getElementById('new-friend').value
        //     //const newFriendLi = document.createElement('li')
        //     //newFriendLi.innerHTML = newFriend
        //     console.log(newFriend)
        //     document.getElementById('list').appendChild(`
        //     <li class='name'>${newFriend}</li>
        //     <span class='votes'>5</span>
        //     <button id='add-vote'>+</button>
        //     <button id='sub-vote'>-</button>
        //     <button id='remove'>x</button>`)
        // }
        //add event listener to create
        const result = fetch('/api')
        const data = await (result.json())

    } catch(error) {
        console.error(error)
    }
}

updateFriends()

// DOM manipulation 

//addEventListener for click for vote button

//sort the friends by resulting vote number i.e. select id and append to div in index.html file - 

// then fetch api
