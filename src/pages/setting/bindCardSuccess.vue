<!-- 绑卡成功页 -->
<template>
  <div class="bindCardSuccess-container">
    <div class="bind-top">
      <img src="../../../static/images/bind/bind_success.png">
      <p>绑定成功</p>
    </div>
    <div class="button-wrap">
      <button @click.stop="goNext">{{buttonTips}}</button>
    </div>
  </div>
</template>
<script>
export default {
  name:'bindCardSuccess',
  computed:{
    // 绑卡来源
    bindCardOrigin(){
      return localStorage.getItem("__BINDCARDORIGIN__")
    },
    buttonTips(){
      let tip = '继续提现'
      switch(this.bindCardOrigin){
        case 'productDetail' :
         tip = '继续投资';
        break;
        case 'balance' : 
          tip = '继续提现';
        break;
        case 'platformDetail' :
          tip  = '继续投资';
        break;
        default :
          tip = '继续提现';
      }
      return tip;
    },
    originPath(){
      return this.$store.state.originPath
    },
    originQuery(){
      return this.$store.state.originQuery
    }
  },
  created(){
    console.log(this.fromQuery)
  },
  methods:{
    goNext(){
      switch(this.bindCardOrigin){
        case 'productDetail' :
          this.$router.replace({
            path:this.originPath,
            query:this.originQuery
          })
        break;
        case 'platformDetail' :
          this.$router.replace({
            path:this.originPath,
            query:this.originQuery
          })
        break;
        case 'balance' : 
          this.$router.replace('/mine/widthdraw')
        break;
        default :
          this.$router.replace('/mine/widthdraw')
      }
    }
  }
}
</script>
<style scoped>
.bindCardSuccess-container{
  text-align: center;
  background-color: #fff;
  height: 100%;
}
.bindCardSuccess-container .bind-top{
  padding: 0 .5rem;
  background-color: #fff;
}
.bindCardSuccess-container img{
  width: 1.56rem;
  padding-top: .5rem;
}
.bindCardSuccess-container p{
  padding-top: .34rem;
  font-size: .32rem;
  color: #323232;
  padding-bottom: .5rem;
}
.bindCardSuccess-container .button-wrap{
  padding-top: .5rem;
}
.bindCardSuccess-container .button-wrap button{
  width: 6.9rem;
  height: 1.1rem;
  color: #fff;
  font-size:18px;
  background-color: #4e8cef;
  border-radius: 6px;
  margin: 0 auto;
}
</style>
