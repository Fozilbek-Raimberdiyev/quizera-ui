import { defineStore } from "pinia";

export const permissionStore = defineStore("permStore", {
  state: () => ({
    newsPerm : {
        name : "News",
        permissions : [
            {
                action : "read",
                subject : "News"
            },
            {
                action : "create",
                subject : "News"
            },
            {
                action : "update",
                subject : "News"
            },
            {
                action : "delete",
                subject : "News"
            }
        ]
    },
    postPerm : {
        name : "Post",
        permissions : [
            {
                action : "read",
                subject : "Post"
            },
            {
                action : "create",
                subject : "Post"
            },
            {
                action : "update",
                subject : "Post"
            },
            {
                action : "delete",
                subject : "Post"
            }
        ]
    },
    moviePerm : {
        name : "Movie",
        permissions: [
            {
                action : "read",
                subject : "Movie"
            },
            {
                action : "create",
                subject : "Movie"
            },
            {
                action : "update",
                subject : "Movie"
            },
            {
                action : "delete",
                subject : "Movie"
            }
        ],
    },
    weatherPerm : {
        name : "Weather",
        permissions : [
            {
                action : "read",
                subject : "Weather"
            },
            {
                action : "create",
                subject : "Weather"
            },
            {
                action : "update",
                subject : "Weather"
            },
            {
                action : "delete",
                subject : "Weather"
            }
        ]
    },
    managementPerm : {
        name : "Management",
        permissions : [
            {
                action : "read",
                subject : "Management"
            },
            {
                action : "create",
                subject : "Management"
            },
            {
                action : "update",
                subject : "Management"
            },
            {
                action : "delete",
                subject : "Management"
            }
        ]
    }
  }),
});
