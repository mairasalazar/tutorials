/** @odoo-module **/

import { Component, useState } from "@odoo/owl";

export class Card extends Component {
    static template = "awesome_owl.card";

    static props = ['title', 'slots']
    
    setup(){
        this.state = useState({card_open: true});
    }

    toggleCard() {
        this.state.card_open = !this.state.card_open;
    }
}
