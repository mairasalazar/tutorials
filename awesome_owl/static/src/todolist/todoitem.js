/** @odoo-module **/

import { Component } from "@odoo/owl";

export class TodoItem extends Component {
    static template = "awesome_owl.todoitem";
    static props = {
        todo: {
            type: Object,
            shape: {
                id: Number,
                description: String,
                isCompleted: {type: Boolean, optional: true},
            }
        },
        toggleState: {
            type: Function,
        },
        removeTodo: {
            type: Function,
        },
    }

    onClick(ev) {
        this.props.toggleState(this.props.todo.id);
    }

    onClickRemove(ev) {
        this.props.removeTodo(this.props.todo.id);
    }
}
