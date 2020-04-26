<template>
    <div class="blog-post">
        <form action="api/blog2" method="post">
            <div class="blog-post-title">
                <input type="text" class="blog-post-title" name="title" placeholder="title">
            </div>
            <div class="blog-post-long">
                <textarea          class="blog-post-long"  name="long"  placeholder="long"></textarea>
            </div>
            <div class="blog-post-short">
                <input type="text" class="blog-post-short" name="short" placeholder="short">
            </div>
            <input type="submit" value="POST ! ">
        </form>
    </div>
</template>
<style>
.blog-post{
    width: 100vw;
    margin: 0 auto;
}
.blog-post-title{
    color:red;
    text-align : center;
    font-size: 50px; /* uniquement pour IE */

}
.blog-post-short{
    width: 100vw;
}
input.blog-post-short{
    color: black;
    margin-left: 10%;
    width: 80vw;
    font-size: 25px; /* uniquement pour IE */

}
div.blog-post-long{
    text-align: center;
    margin-left: 5%;
}
.blog-post-long{
    font-size: 30px;
    height   : 70vh;
    width    : 90vw;
}
input[type="submit"]{
    font-size: 60px;
    font-weight: bolder;
}    
</style>