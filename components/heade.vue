<template>
    <div class="header">
        <div class="header-page" v-for="link in links">
            <nuxt-link :to="link.link" tag="p">
            {{link.text}}
            </nuxt-link>
        </div>
        <div class="header-page right" v-for="link in rightLinks">
            <nuxt-link :to="link.link" tag="p">
            {{link.text}}
            </nuxt-link>
        </div>
    </div>
</template>
<script>
export default {
    data: function(){
        return{
            links: [{text:"home", link:"/"},
                    {text:"blog", link:"/blog"},
                    {text:"projects", link:"/projects"}
                    ],
            rightLinks: [{text:"login", link:"/login"},
                    {text:"signup", link:"/signup"}
                    ]
        }
    }
}
</script>
<style>
.header{
    background-color: #30475E;
    font-size: 35px;
    color:#ececec;
}
.header-page{
    background-color: "#30475E";
    display: inline-block;
    margin-right: 20px;
}
.header-page:hover{
    color:#cafebabe;
    cursor: pointer; 
}
.right{
    float: right;
}

</style>