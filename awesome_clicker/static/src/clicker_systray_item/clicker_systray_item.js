/** @odoo-module */

import { Component, useState, useExternalListener } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { ClickerValue } from "../clicker_value/clicker_value";
import { Dropdown } from "@web/core/dropdown/dropdown";
import { DropdownItem } from "@web/core/dropdown/dropdown_item";

export class ClickerSystray extends Component {
    static template = "awesome_clicker.ClickerSystray";
    static components = { ClickerValue, Dropdown, DropdownItem };

    setup() {
        this.action = useService("action");
        this.clickService = useState(useService("awesome_clicker.clicker_service"));
        useExternalListener(
            document.body,
            "click",
            () => {
                this.clickService.increment(1);
            },
            true
        );
    }

    openClientAction() {
        this.action.doAction("awesome_clicker.dashboard");
    }

    get numberTrees() {
        let sum = 0;
        for (const tree in this.clickService.state.trees) {
            sum += this.clickService.state.trees[tree].purchased;
        }
        return sum;
    }

    get numberFruits() {
        let sum = 0;
        for (const fruit in this.clickService.state.fruits) {
            sum += this.clickService.state.fruits[fruit];
        }
        return sum;
    }
}

export const systrayItem = {
    Component: ClickerSystray,
};

registry.category("systray").add("awesome_clicker.ClickerSystray", systrayItem, { sequence: 1000 });
