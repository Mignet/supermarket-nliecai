<template>
    <div class="template" v-html="strategy">
        
    </div>
</template>
<script>
import service from '../../resource/service';
export default {
    data (){
        return {
            orgNumber : this.$route.query.orgNumber,
            strategy  : "",
        }
    },
    created (){
        var self = this;
        service.serverRequest('investmentStrategy',{
          orgCode : self.orgNumber,
        },(result)=>{
            if(result){
                self.strategy = result.orgPlannerStrategy;
            }
        })
    }
}
</script>
<style scoped>
</style>