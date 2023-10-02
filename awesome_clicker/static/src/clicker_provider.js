/** @odoo-module **/

import { registry } from "@web/core/registry";

const commandProviderRegistry = registry.category("command_provider");

commandProviderRegistry.add("clicker", {
    provide: (env, options) => {
        const result = [];

        result.push(
            {
                name: "Buy 1 click bot",
                action() {
                    env.services["awesome_clicker.clicker_service"].buyBot("clickbot");
                },
            },
            {
                name: "Open Clicker Game",
                action() {
                    env.services.action.doAction("awesome_clicker.dashboard");
                },
            }
        );
        return result;
    },
});
