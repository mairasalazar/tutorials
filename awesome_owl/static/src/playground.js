/** @odoo-module **/

import { Component, markup, useState } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";
import { TodoList } from "./todolist/todolist";

export class Playground extends Component {
    static template = "awesome_owl.playground";

    static components = { Counter, Card, TodoList };
    
    state = useState({ sum: 2 });
    
    setup() {
        this.card1 = { content: "<div class='text-primary'>some content</div>", title: "content of card 1" };
        this.card2 = { content: markup("<div class='text-primary'>some content</div>"), title: "content of card 2" };
    }

    incrementSum() {
        this.state.sum++; 
    } 
}
