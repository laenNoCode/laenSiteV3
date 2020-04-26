<template>
    <div class="blog">
        <button @click="gatherData()"> test </button>
        <template  v-for="post in posts.data">
            <blogpost :data="post"/>
        </template>
    </div>
</template>
<script>
import blogpost from "~/components/blog-post.vue"
export default {
    components:{blogpost},
    data: function(){ return {posts: {"data":[{"id": 0,"title":"Bienvenue sur mon blog", "short":"ceci est le premier post", "long": "ceci est le premier post, je vais probablement en faire d'autres, mais je ne sais pas encore quand Lorem ipsum dolor sit amet consectetur, adipisicing elit. Excepturi reprehenderit, beatae, blanditiis repellendus odit delectus qui, modi porro voluptatem illo at fugiat pariatur aliquid necessitatibus sit placeat architecto hic non."}]}}},
    methods:{
        gatherData(){
            let xhr = new XMLHttpRequest();
            xhr.open("get", "api/blog2", false)
            xhr.send()
            this.posts = JSON.parse(xhr.response)
        }
    }
}
</script>
