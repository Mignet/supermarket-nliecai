<template>
	<div class="wraper">
	    <h1>职级规则介绍</h1>
	    <table>
	        <tr>
	            <td>职级</td>
	            <td>职级要求</td>
	        </tr>
	        <tr>
	            <td>见习</td>
	            <td>注册即可</td>
	        </tr>
	        <tr>
	            <td>顾问</td>
	            <td>个人年化业绩≥100元</td>
	        </tr>
	        <tr>
	            <td>经理</td>
	            <td>个人年化业绩≥2000元<br>顾问及以上职级的直接下级理财师≥2名</td>
	        </tr>
	        <tr>
	            <td>总监</td>
	            <td>个人年化业绩≥1万元<br>经理及以上职级的直接下级理财师≥4名</td>
	        </tr>
	    </table>
	    <p style="padding-top: .3rem;">1、职级每月考核一次，并根据本月考核结果，评定下月职级。</p>
	    <p style="padding-top: .6rem;">2、理财师的下月职级，由理财师本月的个人年化业绩和直接理财师的职级/人数共同决定，缺一不可。具体评级规则如下：</p>
	    <p>（1）晋升：如果本月就已达到更高职级的职级要求，那么下月即可晋升为该职级</p>
	    <p>（2）降级：如果本月未完成本月职级对应的职级要求，那么下月降级为与本月业绩相匹配的最高职级。</p>
	    <p>（3）保级：如果本月仅完成了本月职级对应的职级要求，那么下月职级将与本月一致。</p>
	</div>
</template>
<script>
	
</script>
<style scoped>
	.wraper{
	    padding: 0 .3rem;
	    height: 100%;
	    background-color: #fff;
	}
	h1{
	    line-height: .94rem;
	    color: #3e4446;
	    font-size: .34rem;
	}
	table{
	    width: 100%;
	}
	td{
	    height: .8rem;
	    border: 1px solid #c7c7cd;
	    text-align: center;
	    background-color: #f6f6f6;
	    color: #6c6e6d;
	    font-size: .26rem;
	    line-height: 1.2;
	}
	tr td:first-child{
	    width: 15%;
	}
	tr td:last-child{
	    width: 85%;
	}
	p{
	    font-size: .3rem;
	    color: #686868;
	    line-height: 1.8em;
	}
</style>