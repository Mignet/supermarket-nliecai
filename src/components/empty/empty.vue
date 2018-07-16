<template>
    <div class="empty">
        <p>{{emptyMsg}}</p>
    </div>
</template>
<script>
    export default {
        props:['emptyMsg'],
    }
</script>
<style scoped>
    .empty{
        width: 100%;
        height: 100%;
        padding-top: .74rem;
        background-color: #fff;
    }
    .empty p{
        width: 100%;
        height: 6rem;
        text-align: center;
        line-height: 6rem;
        font-size: .33rem;
        color: #646464;
    }
</style>