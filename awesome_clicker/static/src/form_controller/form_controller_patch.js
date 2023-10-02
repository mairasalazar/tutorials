/** @odoo-module */

import { FormController } from "@web/views/form/form_controller";
import { patch } from "@web/core/utils/patch";
import { useService } from "@web/core/utils/hooks";

const FormControllerPatch = {
    setup() {
        super.setup(...arguments);
        this.clickerService = useService("awesome_clicker.clicker_service");
        if (Math.random() < 0.01) {
            this.clickerService.giveReward();
        }
    },
};

patch(FormController.prototype, FormControllerPatch);
