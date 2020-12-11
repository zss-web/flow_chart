<template>
  <div style="margin:12px">
      <button id="upButton" class="btnstyle">路线变宽</button>
      <button id="downButton" class="btnstyle">路线变窄</button>
      <button id="cutButton" class="btnstyle">切换路线</button>
    <right-tree
      v-if="list && list.length"
      :list="list"
      :showfields="showFields"

    ></right-tree>
  </div>
</template>
<script>
import RightTree from './RightTree'
export default {
    components:{
        RightTree,
    },
    data(){
        return{
            lineStyle:'',
            list: [//datasource
                {
                    id: '1',
                    name: 'span1',
                    serviceId: 'service1',
                    children: [
                        {
                            id: '1-1',
                            name: 'user',
                            serviceId: 'service-user',
                            children: [
                                {
                                    id: '1-1-1',
                                    name: 'shop',
                                    serviceId: '18',
                                    children: [
                                        {
                                            id: '1-1-1-1',
                                            name: 'common',
                                            serviceId: 'common-service',
                                        },
                                    ],
                                },
                                {
                                    id: '1-1-2',
                                    name: 'account1',
                                    serviceId: 'account-service',
                                },
                                {
                                    id: '1-1-3',
                                    name: 'account2',
                                    serviceId: 'account-service',

                                },
                                {
                                    id: '1-1-4',
                                    name: 'account3',
                                    serviceId: 'account-service',
                                },
                            ],
                        },
                        {
                            id: '1-2',
                            name: 'truck',
                            serviceId: 'truck-pay',
                            work: 'web',
                        },
                    ],
                },
            ],
            showFields: [
                {
                    name: '服务名称：',
                    key: 'name',
                },
                {
                    name: '服务编号：',
                    key: 'serviceId',
                },
            ],
        }
    },
    methods:{
        // onchangeLine(){
        //     //父调用子方法
        //   this.$refs.childTree.linechange()
        // }
    },
    
}
</script>
<style lang="less" scoped>
.btnstyle{
   width: 90px;
   height: 45px;
   font-size: 12px;
   margin: 0 12px;
   background: wheat;
    box-shadow: 0px 2px 3px rgba(233, 233, 233, 0.6);
}
</style>