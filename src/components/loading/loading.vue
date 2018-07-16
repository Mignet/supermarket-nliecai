<template>
  <div class="loading-overlay" v-show='show'>
    <div class="content">
      <div class="loading-icon">
      </div>
    </div>
     <div class="loadingMask"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
     name : 'loading',
     data(){
        return {
          show:false
        };
     }
  }
</script>

<style>
    .loading-overlay {
    position: fixed;
    z-index:999;
    left:0;
    top:0;
    width:100%;
    height:100%;
    }
    
  .loading-overlay .content{
    position: fixed;
    left:50%;
    top:50%;
    z-index:1000;
    width:1.2rem;
    height:1.2rem;
    border-radius:10px;
    text-align:center;
    margin-top:-.6rem;
    margin-left:-.6rem;
  }

  .loading-overlay .loadingMask{
    position: fixed;
    z-index:999;
    left:0;
    top:0;
    width:100%;
    height:100%;
    background:rgba(0,0,0,0);
  }

  .loading-overlay .loading-icon{
    position:absolute;
    left:0;
    top:0;  
    width:100%;
    height:100%;
    background-image: url(./loading_01.png);
    background-size: contain;
    background-repeat:no-repeat;
    background-position: center center;
    -webkit-backface-visibility: hidden;
    -webkit-transform-style: preserve-3d;
    -webkit-animation:loadingLoop 1s infinite linear;
  }


  @keyframes loadingLoop {
    10%{
      background-image:url(./loading_02.png);
    }
    20%{
      background-image:url(./loading_03.png);
    }
    30%{ 
      background-image:url(./loading_04.png);
    }
    40%{
      background-image:url(./loading_05.png);
    }
    50%{
      background-image:url(./loading_06.png);
    }
    60%{ 
      background-image:url(./loading_07.png);
    }
    70%{
      background-image:url(./loading_08.png);
    }
    80%{
      background-image:url(./loading_09.png);
    }
    90%{
        background-image:url(./loading_10.png);
    }
    100%{
       background-image:url(./loading_01.png);
    }
  }
</style>