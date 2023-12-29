/** @odoo-module **/

import { Component, useState } from "@odoo/owl";
import { TodoItem } from "./todoitem";
import {useAutofocus} from "../utils";

export class TodoList extends Component {
    static template = "awesome_owl.todolist";
    static components = { TodoItem };
  
    setup() {
        this.todos = useState([]);
        this.counter = 1;
        useAutofocus('my_input');
    }

    addTodo(ev) {
        if (ev.keyCode === 13 && ev.target.value != "") {
            this.todos.push({id: this.counter++, description: ev.target.value, isCompleted: false});
            ev.target.value="";
        }
    }

    toggleId(id_received) {
        let todo = this.todos.find((x) => x.id === id_received)
        if ( todo ) {
            todo.isCompleted = !todo.isCompleted;
        }
    } 

    removeTodoLine(id_received) {
        const todo_index = this.todos.findIndex((x) => x.id === id_received);
        if ( todo_index >=0 ) {
            this.todos.splice(todo_index, 1);
        }
    } 
}
