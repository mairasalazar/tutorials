/** @odoo-module */

import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";
import { rewards } from "./click_rewards";

const clickerService = {
    dependencies: ["action", "effect", "notification"],
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

        function giveReward() {
            const availableReward = [];
            for (const reward of rewards) {
                if (reward.minLevel <= state.unlockLevel || !reward.minLevel) {
                    if (reward.maxLevel >= state.unlockLevel || !reward.maxLevel) {
                        availableReward.push(reward);
                    }
                }
            }
            const reward = availableReward[Math.floor(Math.random() * availableReward.length)];
            const closeNotification = services.notification.add(
                `Congrats you won a reward: "${reward.description}"`,
                {
                    type: "success",
                    sticky: true,
                    buttons: [
                        {
                            name: "Collect",
                            onClick: () => {
                                reward.apply(this);
                                closeNotification();
                                if (
                                    services.action.currentController.action.tag !==
                                    "awesome_clicker.dashboard"
                                ) {
                                    services.action.doAction("awesome_clicker.dashboard");
                                }
                                services.action.doAction("awesome_clicker.dashboard");
                            },
                        },
                    ],
                }
            );
        }

        return {
            state,
            increment,
            buyBot,
            buyMultiplier,
            giveReward,
        };
    },
};

registry.category("services").add("awesome_clicker.clicker_service", clickerService);
