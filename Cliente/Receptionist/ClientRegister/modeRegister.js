function registerClient(){

    const http = new XMLHttpRequest();
    const url = `http://localhost:3000/registerClient`;
    const name = document.getElementById("name").value;
    const lastName = document.getElementById("lastName").value;
    const idClient = document.getElementById("idClient").value;
    const phone = document.getElementById("phone").value;

    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");

    http.onreadystatechange = function () {
        if (http.status == 200) {
            location.href = '../initReceptionist/ViewReceptionist.html';
            alert("Se regitro con exito")
        }else{
            alert("Error:\n No se ha podido relizar el registro.\nIntente de nuevo mas tarde")
        }
    }
    http.send(JSON.stringify([{ name: name, lastName: lastName, id: idClient, phone: phone }]));

}