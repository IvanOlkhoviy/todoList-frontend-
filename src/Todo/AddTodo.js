import React, { useState } from "react";
import PropTypes from "prop-types";
import $ from "jquery"

function AddTodo({ onCreate }){
    const [value, setValue] = useState("");

    function submitHandler(event){
        event.preventDefault()

        const todo = {
            title:value
        }

        if(value.trim()){
            $.ajax({
                url: "http://localhost:8080/todolist/",
                method: "POST",
                contentType: "application/json",
                data: JSON.stringify(todo),
                complete: function(serverResponse){
                    console.log(serverResponse);
                    if(serverResponse.status === 201){
                        alert("Todo added to database")
                    }
                    if(serverResponse.status === 400){
                        // alert(serverResponse.responseJSON.message);
                    }
                }
            });
            onCreate(value)
            setValue("")
        }
    }

    return(
        <form onSubmit={submitHandler}>
            <label htmlFor="inputTodo" className="ml-0">Your todo:</label>
            <div className="row mb-3">
            
            <input className="form-control col-9" id="inputTodo" 
             value={value}
             onChange={event =>setValue(event.target.value)}>
            </input>
            <button type="submit" className="btn btn-primary col-3">Add todo</button>
            </div>

        </form>

    )
}

AddTodo.propTypes ={
    onCreate: PropTypes.func.isRequired
}

export default AddTodo;