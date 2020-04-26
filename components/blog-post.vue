<template>
    <div>
        <div class="blog-title">{{data.title}}</div>
        <div class="blog-short hidden">{{data.short}}</div>
        <div class="blog-long">
            <p v-for="line of data.long.split('\n')">
                {{line}}
            </p>
        </div>
    </div>
</template>

<script>
export default {
    props:{data:{"data": {title:"placeholder", short:"placeholder", long:"placeholder"}}},
}
</script>
<style>
.hidden{
    display: none;
}
.blog-title{
     font-size: 50px;
     padding-left: 20vw;
     background-color: #c1a57b1f;
     color: #30475e;
}
.blog-short, .blog-long{
    border:1px solid #ffb43a;
    background-color: #c1a57b4f;
    padding-left: 12vw;
    font-size: 30px;
}
</style>