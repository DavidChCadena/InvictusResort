const http = new XMLHttpRequest();
function changeValueRoom() {

    const url = `http://localhost:3000/changePriceRoom`;
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const idRoom = document.getElementById("idRoom").value;
    const price = document.getElementById("price").value;

    http.onreadystatechange = function () {
        if (http.status == 200) {
            location.href = '../initAdministrator/initAdministrator.html';
            alert("Precio actualizado")
        } else {
            alert("Error:\n No se ha podido relizar la actualizacion.\nIntente de nuevo mas tarde")
        }
    }
    http.send(JSON.stringify([{ idRoom: idRoom, price: price }]));
}

function changeRoomStatus() {

    const url = `http://localhost:3000/changeStatusRoom`;
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const idRoom = document.getElementById("idRoom").value;
    const dispo = document.getElementById("dsipo").value;

    http.onreadystatechange = function () {
        if (http.status == 200) {
            location.href = '../initAdministrator/initAdministrator.html';
            alert("Disponibilidad actualizada")
        } else {
            alert("Error:\n No se ha podido relizar la actualizacion.\nIntente de nuevo mas tarde")
        }
    }
    http.send(JSON.stringify([{ idRoom: idRoom, dispo: dispo }]));
}

function changeValueService() {

    const url = `http://localhost:3000/changeStatusRoom`;
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const idService = document.getElementById("idService").value;
    const price = document.getElementById("price").value;

    http.onreadystatechange = function () {
        if (http.status == 200) {
            location.href = '../initAdministrator/initAdministrator.html';
            alert("Valor de servicio actualizado")
        } else {
            alert("Error:\n No se ha podido relizar la actualizacion.\nIntente de nuevo mas tarde")
        }
    }
    http.send(JSON.stringify([{ idService: idService, price: price }]));
}

function setName(){

    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:3000/data', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#Welcome');
            res.innerHTML = 'Bienvenido ';
        }
    }  

}

function getRoomList(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:3000/roomList', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#updateRoom');
            res.innerHTML = '';
            for (let item of datos) {
                res.innerHTML += `
                    <tr>
                        <td>${item.IdHabitacion}</td>
                        <td>${item.tipoHabitacion}</td>
                        <td>${item.disponibilidad}</td>
                    <tr>
                `
            }
        }
    }  
}

function getRoom(){
    
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:3000/roomList', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#roomTable');
            res.innerHTML = '';
            for (let item of datos) {
                res.innerHTML += `
                    <tr>
                        <td>${item.IdHabitacion}</td>
                        <td>${item.tipoHabitacion}</td>
                        <td>${item.precio}</td>
                    <tr>
                `
            }
        }
    }  
}