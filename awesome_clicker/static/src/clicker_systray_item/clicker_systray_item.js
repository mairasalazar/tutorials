/** @odoo-module */

import { Component, useState, useExternalListener } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";

export class ClickerSystray extends Component {
    static template = "awesome_clicker.ClickerSystray";

    setup() {
        this.state = useState({ counter: 0 });
        this.action = useService("action");
        useExternalListener(
            document.body,
            "click",
            () => {
                this.state.counter++;
            },
            true
        );
    }

    increment() {
        this.state.counter += 9;
    }

    openClientAction() {
        this.action.doAction("awesome_clicker.dashboard");
    }
}

export const systrayItem = {
    Component: ClickerSystray,
};

registry.category("systray").add("awesome_clicker.ClickerSystray", systrayItem, { sequence: 1000 });
