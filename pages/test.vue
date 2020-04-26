<template>
    <div>
    <div v-if="public_info.public !== undefined">
        bienvenue {{public_info.public.username}}, comment allez-vous aujourd'hui ?
    </div>
    </div>
</template>
<script>
export default {
    data() {return {
        public_info:""
    }},
    methods:{
        gatherUserData(){
            let xhr = new XMLHttpRequest();
            xhr.open("get", "api/myInfo", false)
            xhr.send()
            this.public_info = JSON.parse(xhr.response)
        }
    },
    mounted(){
        console.log ("created vue test")
        this.gatherUserData()
    }
}
</script>