var url = "http://localhost:3000/login";

function verifyLogin(name, password){    
    fetch(url, {
        method: 'POST',
        body: JSON.stringify({id_trabajador: name, contrasenia: password}),
        headers: {'Content-type': 'application/json'}
    })
    .then(function(res) {
        return res.json();
    })
    .then(json => console.log(json));
}


document.getElementById("Login")
.addEventListener("click", (evt) => {
    evt.preventDefault();
    let name = document.getElementById("Name").value
    let password = document.getElementById("Password").value

    verifyLogin(name,password);
    //verifyConnection();
})



/*function verifyConnection(){
    fetch(url).then(function(res) {
        return res.json();
    }).then(function (json) {
        console.log(json);
    })
}*/