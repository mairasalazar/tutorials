/** @odoo-module **/

import { Component } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";

export class Playground extends Component {
    static template = "awesome_owl.playground";

    static components = { Counter, Card };

    card1 = { content: "card 1", title: "content of card 1" };
    card2 = { content: "card 2", title: "content of card 2" };
}
