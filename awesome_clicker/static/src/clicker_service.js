/** @odoo-module */

import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

const clickerService = {
    dependencies: ["effect"],
    start(env, services) {
        const state = reactive({
            clicks: 0,
            unlockLevel: 0,
            clickBots: 0,
        });

        setInterval(() => {
            state.clicks += state.clickBots * 10;
        }, 10000);

        function increment(inc) {
            state.clicks += inc;
            if (state.clicks >= 1000 && state.unlockLevel < 1) {
                services.effect.add({
                    message: "Milestone reached! You can now buy clickbots",
                    type: "rainbow_man",
                });
                state.unlockLevel++;
            }
        }

        function buyClickBot() {
            const clickBotPrice = 1000;
            if (state.clicks < clickBotPrice) {
                return false;
            }
            state.clicks -= clickBotPrice;
            state.clickBots += 1;
        }

        return {
            state,
            increment,
            buyClickBot,
        };
    },
};

registry.category("services").add("awesome_clicker.clicker_service", clickerService);
