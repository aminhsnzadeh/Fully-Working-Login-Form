const form = {
    username : document.getElementById('username'),
    password : document.getElementById('password')
}
async function load() {
    const file = await fetch('src/data/data.json')
    if (!file.ok) {
        document.getElementById('loading').classList.add('load-done')
    } else {
        document.getElementById('loading').classList.remove('load-done')
    }
    let data = await file.json()
    return data
}
let _username 
let _password  
let _flag = 1
load().then(data => {
        // testing data base ====> 
        // _username = data.results[_flag].login.username
        // _password = data.results[_flag].login.password
        // console.log(_username)
        // console.log(_password)
        let userVal = document.getElementById('username')
        let userPass = document.getElementById('password')
        document.getElementById('send').addEventListener('click', function() {
            for(let i = 0; i < data.results.length; i++) {
                if(userVal.value == data.results[i].login.username) {
                    // testing object index 
                    // console.log(data.results[i].login.password)
                    // console.log(i)
                    _flag = i
                }
            }
            _username = data.results[_flag].login.username
            _password = data.results[_flag].login.password
            if(userVal.value == _username && userPass.value == _password) {
                console.log('agreed')
                document.getElementById('form').classList.add('oppening')
                innerData(data, _flag)
                document.getElementById('success').classList.add('active')
                function succ() {
                    document.getElementById('success').classList.remove('active')
                }
                setTimeout(succ, 4000)
                userVal.style.border ='1px solid transparent'
                userPass.style.border ='1px solid transparent'
                
            } else {
                if(userVal.value != _username || userPass.value != _password || userVal.value == '' || userPass.value == '') {
                    document.getElementById('error').classList.add('active')
                    userVal.style.border ='1px solid red'
                    userPass.style.border ='1px solid red'
                    function err() {
                        document.getElementById('error').classList.remove('active')
                    }
                    setTimeout(err, 4000)
                }
            }
        })
        document.getElementById('again').addEventListener('click', function() {
            document.getElementById('form').classList.remove('oppening')
            userVal.value = null
            userPass.value = null
            userVal.focus()
        })
    }
)
function innerData(data, x) {
    document.getElementById('name').innerHTML = `<span class="bi-person"></span> <b>User's name :</b>${data.results[x].name.first} ${data.results[x].name.last}`
    document.getElementById('gend').innerHTML = `<span class="bi-person-heart"></span> <b>User's Gender :</b> <span id="genders"></span> ${data.results[x].gender}`
    document.getElementById('email').innerHTML = `<span class="bi-envelope"></span> <b>User's Email :</b> ${data.results[x].email}`
    document.getElementById('phone').innerHTML = `<span class="bi-phone"></span> <b>User's Phone :</b> ${data.results[x].phone}`
    document.getElementById('country').innerHTML = `<span class="bi-stack"></span> <b>User's Country :</b> ${data.results[x].location.country}`
    document.getElementById('address').innerHTML = `<span class="bi-map"></span> <b>User's Address :</b> ${data.results[x].location.state}, ${data.results[x].location.city}, ${data.results[x].location.street.name}, ${data.results[x].location.street.number}`
    document.getElementById('userImg').innerHTML = ` <img src="${data.results[x].picture.large}" alt="">`
    if(data.results[x].gender == 'male') {
        document.getElementById('genders').classList.add('bi-gender-male')
    } else {
        document.getElementById('genders').classList.add('bi-gender-female')
    }
}