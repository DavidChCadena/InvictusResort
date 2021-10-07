function addService() {

    const url = `http://localhost:3000/addService`;
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const idClient = document.getElementById("idClient").value;
    const idService = document.getElementById("idService").value;

    http.onreadystatechange = function () {
        if (http.status == 200) {
            alert("Servicio añadido con exito.")
        } else {
            alert("Error:\n No se ha podido relizar operacion.\nIntente de nuevo mas tarde")
        }
    }
    http.send(JSON.stringify([{ id: idClient, idService: idService }]));
}

function billingClient() {
    const url = `http://localhost:3000/bilClient`;
    const http = new XMLHttpRequest();
    http.open("POST", url, true);
    http.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
    const idClient = document.getElementById("idClient").value;
    const payment = document.getElementById("payment").value;

    http.onreadystatechange = function () {
        if (http.status == 200) {
            alert("Factura creada con exito")
        } else {
            alert("Error:\n No se ha podido relizar la factura.")
        }
    }
    http.send(JSON.stringify([{ id: idClient, payment: payment }]));
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
                        <td>${item.estado}</td>
                        <td>${item.abono}</td>
                        <td>${item.deuda}</td>
                    <tr>
                `
            }
        }
    }
     
}

function getClientList() {
    getReserveList();
    getServiceList();
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

function getServiceList(){
    const xhttp = new XMLHttpRequest();
    xhttp.open('GET', 'http://localhost:3000/serviceList', true);
    xhttp.send();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            console.log(this.responseText);
            let datos = JSON.parse(this.responseText);
            let res = document.querySelector('#serviceTable');
            res.innerHTML = '';
            for (let item of datos) {
                res.innerHTML += `
                    <tr>
                        <td>${item.idServicio}</td>
                        <td>${item.clase}</td>
                        <td>${item.tipo}</td>
                    <tr>
                `
            }
        }
    }  

}