import React, {useContext} from "react";
import PropTypes from "prop-types";
import Context from "../context";
import $ from "jquery"

const styles = {
    li:{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: ".5rem 1rem",
        border: "1px solid #ccc",
        borderRadius: "4px",
        marginBottom: ".5rem"
    },
    input:{
        marginRight: "1rem"
    }
}

function TodoItem({todo, index, onChange}){
    const{ removeTodo }=useContext(Context);
    const classes =[];

    if(todo.completed){
        $.ajax({
            url: "http://localhost:8080/todolist/" + todo.id,
            method: "POST",
            contentType: "application/json",
            data: JSON.stringify(todo),
        });
        classes.push("done")
    }
    
    return (
        <li className="row alert alert-success align-items-center">
            <span className={classes.join(" ")}>
                <input type="checkbox"
                    checked={todo.completed}
                    style={styles.input}
                    onChange={()=> onChange(todo.id)} 
                />
            <strong>{index + 1}</strong>
            {todo.title}
            </span>
            <button className="btn btn-danger ml-auto mr-0" onClick={removeTodo.bind(null, todo.id)}>&times;</button>
        </li>
    )
}

TodoItem.propTypes = {
    todo: PropTypes.object.isRequired,
    index: PropTypes.number,
    onChange: PropTypes.func.isRequired
}

export default TodoItem;