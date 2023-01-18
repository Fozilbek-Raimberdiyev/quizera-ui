import { defineAbility } from "@casl/ability"
import { app } from "../main"
export const ability = defineAbility(() => {})
export const abilityPlugin = ({store}) => {
    app.config.globalProperties.$ability = ability
    store.$subscribe((object) => {
        if( object?.payload?.user) {
            let permissions = object?.payload?.user?.rules
            ability.update(permissions)
        }
    })
}