/** @odoo-module */

import { Component, useState, useExternalListener } from "@odoo/owl";
import { registry } from "@web/core/registry";
import { useService } from "@web/core/utils/hooks";
import { ClickerValue } from "../clicker_value/clicker_value";

export class ClickerSystray extends Component {
    static template = "awesome_clicker.ClickerSystray";
    static components = { ClickerValue };

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
}

export const systrayItem = {
    Component: ClickerSystray,
};

registry.category("systray").add("awesome_clicker.ClickerSystray", systrayItem, { sequence: 1000 });
