import { defineStore } from "pinia";
import notificationsService from "../services/notifications.service";
import { userStore } from "./management/user.store";
export const NotificationStore = defineStore("/notifications",{
    state : () => ({list : {}, todos : []}),
    actions : {
       async getNotifications() {
            let res = await notificationsService.getNotifications();
            this.list = res.data;
            this.todos = res.data.todos;
            performance.mark('notification')
        }
    }
} )