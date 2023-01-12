import { defineAbility } from "@casl/ability"
export const ability = defineAbility(() => {})
export const abilityPlugin = ({store}) => {
    store.$subscribe((object) => {
        if(object.payload?.authSucces) {
            ability.update()
        }
    })
}