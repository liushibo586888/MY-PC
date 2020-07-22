
<template>
    <div></div>
</template>

<script>
export default {
    name: 'home',
    data () {
        return {
            
        }
    },
    computed: {
    },
    methods: {
    },
    created () {
        let that = this
        let slideMenu = JSON.parse(sessionStorage.getItem('menuList'))
        that.$router.replace({
            name: slideMenu[0].children[0].name
        })
    }
};
</script>
