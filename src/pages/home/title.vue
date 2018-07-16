<template>
  <h2 class="home-title">
    <p>{{name}}</p>
  </h2>
</template>
<script>
  export default{
    props:{
      name:{
        type:String
      }
    }
  }
</script>

<style scoped>
  .home-title{
    background: #fff;
    height: .8rem;
    border-bottom: 1px solid #efefef;
    padding: 0 .3rem;
    display: table;
    width: 100%;
  }
  .home-title p{
    font-size: .32rem;
    color: #333;
    line-height: 1;
    margin-top: .24rem;
    padding-left: .2rem;
    border-left: .06rem solid #4e8cef;
    font-weight: bold;
  }
</style>