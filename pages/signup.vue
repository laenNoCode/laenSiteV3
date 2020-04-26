<template>
<div>
    <form action="auth/createUser" method="POST">
    <input type="text" name="username" placeholder="username">
    <input type="text" name="password" placeholder="password">
    <input type="text" name="email"    placeholder="email"   >
    <input type="number" name="group"  value=1 v-if="isAdmin" >
    <input type="submit" name="submit">
    </form>
</div>
</template>
<script>
export default {
    data() {return {
        isAdmin:false
    }},
    methods:{
        fetchData(){
            let xhr = new XMLHttpRequest()
            xhr.open("GET", "api/myInfo", true)
            xhr.onload = (e) => {
                if (xhr.readyState === 4 && xhr.status==200) {
                   let response = JSON.parse(xhr.response) 
                    if (response.response == "success" && response.public.group == 1)
                        this.isAdmin = 1;
                }
            };
            xhr.send() 
        }
    },
    mounted(){
        this.fetchData()
    }
}
</script>