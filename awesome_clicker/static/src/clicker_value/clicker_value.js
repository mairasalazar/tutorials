/** @odoo-module */

import { Component, useState } from "@odoo/owl";
import { useService } from "@web/core/utils/hooks";
import { humanNumber } from "@web/core/utils/numbers";

export class ClickerValue extends Component {
    static template = "awesome_clicker.ClickerValue";

    setup() {
        this.clickService = useState(useService("awesome_clicker.clicker_service"));
    }

    get humanizedClicks() {
        return humanNumber(this.clickService.state.clicks, {
            decimals: 1,
        });
    }
}
