/** @odoo-module **/

import { Component, markup } from "@odoo/owl";
import { Counter } from "./counter/counter";
import { Card } from "./card/card";

export class Playground extends Component {
    static template = "awesome_owl.playground";

    static components = { Counter, Card };

    card1 = { content: "<div class='text-primary'>some content</div>", title: "content of card 1" };
    card2 = { content: markup("<div class='text-primary'>some content</div>"), title: "content of card 2" };
}
