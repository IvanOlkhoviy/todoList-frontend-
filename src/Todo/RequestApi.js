import $ from 'jquery';



const URL = "http://localhost:8080/"

export function getRequest (requestBody){

    requestBody = {
        url: URL + requestBody.url,
        method: "GET",
        contentType: requestBody.contentType || "application/json",
        complete: requestBody.complete
    }
    $.ajax(requestBody)
}



export function postRequest (requestBody, todo){

    requestBody = {
        url: URL + requestBody.url,
        method: "POST",
        contentType: requestBody.contentType || "application/json",
        data: JSON.stringify(todo),
        complete: requestBody.complete
    }
    $.ajax(requestBody)
}

export function deleteRequest (requestBody, id){

    requestBody = {
        url: URL + "todolist" + id,
        method: "DELETE",
        contentType:"application/json",
        complete: requestBody.complete
    }
    $.ajax(requestBody)
}



