
function getRoomList() {
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
                        <td>${item.disponibilidad}</td>
                        <td>${item.precio}</td>
                    <tr>
                `
            }
        }
    }  
}

function getReserveList() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:3000/reserveList', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#reserveTable');
            res.innerHTML = '';
            for (let item of datos) {
                res.innerHTML += `
                    <tr>
                        <td>${item.idReserva}</td>
                        <td>${item.titular}</tdZ
                    <tr>
                `
            }
        }
    }  
}

function getClientList() {
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:3000/data', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#clientTable');
            res.innerHTML = '';
            for (let item of datos) {
                res.innerHTML += `
                    <tr>
                        <td>${item.id}</td>
                        <td>${item.name}</td>
                    <tr>
                `
            }
        }
    }  
}


function reserve() {
    const http = new XMLHttpRequest();
    const url = `http://localhost:3000/reserveRoom`;
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const idClient = document.getElementById("idClient").value;
    const idRoom = document.getElementById("idRoom").value;
    const checkIn = document.getElementById("checkIn").value;
    const checkOut = document.getElementById("checkOut").value;

    http.onreadystatechange = function () {
        if (http.status == 200) {
            alert("La habitacion ha sido reservada con exito.")
        } else {
            alert("Error:\n No se ha podido relizar la reserva.\Intente de nuevo mas tarde")
        }
    }
    http.send(JSON.stringify([{ id: idClient, idRoom: idRoom, checkIn: checkIn, chekOut: checkOut }]));
}

function deleteReserve() {
    const http = new XMLHttpRequest();
    const url = `http://localhost:3000/delReserve`;
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const idReserve = document.getElementById("idReserve").value;


    http.onreadystatechange = function () {
        if (http.status == 200) {
            alert("Le reserva ha sido borrada")
        } else {
            alert("Error:\n No se ha podido relizar la actualizacion.\Intente de nuevo mas tarde")
        }
    }
    http.send(JSON.stringify([{ idReserve: idReserve }]));
}