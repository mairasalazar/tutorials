/** @odoo-module */

import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";

const clickerService = {
    dependencies: ["effect"],
    start(env, services) {
        const milestones = [
            { clicks: 1000, unlock: "clickBot" },
            { clicks: 5000, unlock: "bigBot" },
            { clicks: 100000, unlock: "power multiplier" },
        ];
        const state = reactive({
            clicks: 0,
            unlockLevel: 0,
            clickBots: 0,
            bots: {
                clickbot: {
                    price: 1000,
                    unlockLevel: 1,
                    increment: 10,
                    purchased: 0,
                },
                bigbot: {
                    price: 5000,
                    unlockLevel: 2,
                    increment: 100,
                    purchased: 0,
                },
            },
            multiplier: 1,
        });

        setInterval(() => {
            for (const bot in state.bots) {
                state.clicks +=
                    state.bots[bot].increment * state.bots[bot].purchased * state.multiplier;
            }
        }, 10000);

        function increment(inc) {
            state.clicks += inc;
            if (
                milestones[state.unlockLevel] &&
                state.clicks >= milestones[state.unlockLevel].clicks
            ) {
                services.effect.add({
                    message: `Milestone reached! You can now buy ${
                        milestones[state.unlockLevel].unlock
                    }`,
                    type: "rainbow_man",
                });
                state.unlockLevel += 1;
            }
        }

        function buyBot(name) {
            if (state.clicks < state.bots[name].price) {
                return false;
            }
            state.clicks -= state.bots[name].price;
            state.bots[name].purchased += 1;
        }

        function buyMultiplier() {
            if (state.clicks < 50000) {
                return false;
            }
            state.clicks -= 50000;
            state.multiplier++;
        }

        return {
            state,
            increment,
            buyBot,
            buyMultiplier,
        };
    },
};

registry.category("services").add("awesome_clicker.clicker_service", clickerService);
