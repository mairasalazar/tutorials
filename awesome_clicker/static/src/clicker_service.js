/** @odoo-module */

import { registry } from "@web/core/registry";
import { reactive } from "@odoo/owl";
import { rewards } from "./click_rewards";
import { browser } from "@web/core/browser/browser";

const CURRENT_VERSION = 2.0;
const migrations = [
    {
        fromVersion: 1.0,
        apply: (state) => {
            state.trees.peachTree = {
                price: 1500000,
                unlockLevel: 4,
                produce: "peach",
                purchased: 0,
            };
            state.fruits.peach = 0;
        },
    },
];

const clickerService = {
    dependencies: ["action", "effect", "notification"],
    start(env, services) {
        const milestones = [
            { clicks: 1000, unlock: "clickBot" },
            { clicks: 5000, unlock: "bigBot" },
            { clicks: 100000, unlock: "power multiplier" },
            { clicks: 1000000, unlock: "pear tree & cherry tree" },
        ];
        const state = reactive({
            version: CURRENT_VERSION,
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
            trees: {
                pearTree: {
                    price: 1000000,
                    unlockLevel: 4,
                    produce: "pear",
                    purchased: 0,
                },
                cherryTree: {
                    price: 1000000,
                    unlockLevel: 4,
                    produce: "cherry",
                    purchased: 0,
                },
                peachTree: {
                    price: 1500000,
                    unlockLevel: 4,
                    produce: "peach",
                    purchased: 0,
                },
            },
            fruits: {
                pear: 0,
                cherry: 0,
                peach: 0,
            },
            multiplier: 1,
        });

        // The strategy used for migrations is to apply each migration with fromVersion >= localStorage state version
        // migrations are sorted so they are applied in the right order
        migrations.sort((a, b) => {
            return a.fromVersion - b.fromVersion;
        });
        const localState = JSON.parse(browser.localStorage.getItem("clickerState"));
        if (localState?.version < CURRENT_VERSION) {
            for (const migration of migrations) {
                if (localState.version === migration.fromVersion) {
                    migration.apply(localState);
                }
            }
            localState.version = CURRENT_VERSION;
        }
        Object.assign(state, localState);

        setInterval(() => {
            for (const bot in state.bots) {
                state.clicks +=
                    state.bots[bot].increment * state.bots[bot].purchased * state.multiplier;
            }
            browser.localStorage.setItem("clickerState", JSON.stringify(state));
        }, 10000);

        setInterval(() => {
            for (const tree in state.trees) {
                state.fruits[state.trees[tree].produce] += state.trees[tree].purchased;
            }
        }, 30000);

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

        function buyTree(name) {
            if (state.clicks < state.trees[name].price) {
                return false;
            }
            state.clicks -= state.trees[name].price;
            state.trees[name].purchased += 1;
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
            buyTree,
        };
    },
};

registry.category("services").add("awesome_clicker.clicker_service", clickerService);
