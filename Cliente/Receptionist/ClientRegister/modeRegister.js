function registerClient(){

    const http = new XMLHttpRequest();
    const url = `http://localhost:3000/register`;
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const idClient = document.getElementById("idClient").value;
    const phone = document.getElementById("phone").value;

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    http.onreadystatechange = function () {
        var res = http.response
        if (res == "0") {
            location.href = '../initReceptionist/ViewReceptionist.html';
            alert("Se registro con exito")
        }else if (res == "1"){
            alert("Error:\n No se ha podido relizar el registro.\nIntente de nuevo mas tarde")
        }
    }
    http.send(JSON.stringify([{ name: name, lastname: lastName, id: idClient, phone: phone }]));

}