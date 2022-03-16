function init() {

    const http = new XMLHttpRequest();
    const url = 'http://localhost:3000/login';
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    http.onreadystatechange = function () {
        var res =  http.response
        console.log (res)
        if (res== "200") {
            location.href = '../Administrator/initAdministrator/initAdministrator.html';
        }else if(res == "201"){
            location.href = '../Receptionist/initReceptionist/ViewReceptionist.html';
        }else if(res == 0){
            alert("Error:\n Error usuario")
        }else if(res == 1){
            alert("Error:\n Error contraseña")
        }
    }
    http.send(JSON.stringify([{ user: user, password: password}]));


}