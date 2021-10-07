function init() {

    const http = new XMLHttpRequest();
    const url = 'http://localhost:3000/';
    const user = document.getElementById("user").value;
    const password = document.getElementById("password").value;

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    http.onreadystatechange = function () {
        if (http.status == 200) {
            location.href = '../Administrator/initAdministrator/initAdministrator.html';
        }else if(http.status == 201){
            location.href = '../Receptionist/initReceptionist/ViewReceptionist.html';
        }else{
            alert("Error:\n Los datos ingresados son incorrectos")
        }
    }
    http.send(JSON.stringify([{ user: user, password: password}]));


}