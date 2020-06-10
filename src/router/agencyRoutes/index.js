const agencyRouter = [
    {
        path: "/agency/assetsInfo",
        name: "assetsInfo",
        component: () =>
            import( "../../views/agencyPage/assetsInfo.vue")
    },
    {
        path: "/agency/applyInfo",
        name: "applyInfo",
        component: () =>
            import( "../../views/agencyPage/applyInfo.vue")
    },
]
export default agencyRouter