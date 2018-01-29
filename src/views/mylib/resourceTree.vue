<template>
    <Tree ref="tree" :data="treeData" :show-checkbox="showCheckbox" :multiple="multiple" @on-select-change="dofindChild"></Tree>
</template>

<script>
    //资源树
    var treeData = [];
    import Util from '@/libs/util';
    export default{
        name:"resourceTree",
        props:{
            multiple:{
                type:Boolean,
                default:true
            },
            showCheckbox:{
                type:Boolean,
                default:true
            }
        },
        data(){
            return {
                treeData:[],
                childData:[],
                selectId:0
            }
        },
        methods:{
            init(){
                var self = this;
                Util.ajax.post("/api/sys/resource/list").then(function (response) {
                    treeData = Util.jsonToTree(response.data.list);
                    //复制
                    self.treeData = JSON.parse(JSON.stringify(treeData));
                    //单选模式选中
                    if(!self.multiple && !self.showCheckbox){
                        self.childData = [];
                        response.data.list.forEach(function (item) {
                            if(item.parentId==self.selectId){
                                self.childData.push({
                                    title:item.name,
                                    expand:true,
                                    id:item.id,
                                    parentId:item.parentId
                                })
                            }
                        });
                        self.$emit("select");
                    }
                });
            },
            getCheckedNodes(){
                var returnIds = [];
                this.$refs.tree.getCheckedNodes().forEach(function (item) {
                    returnIds.push(item.id);
                });
                return returnIds;
            },
            //清空
            clearCheck(){
                this.treeData = JSON.parse(JSON.stringify(treeData));
            },
            //选中1
            checkResource(arr){
                this.treeData = Util.doEachTree(JSON.parse(JSON.stringify(treeData)),arr,true,false);
            },
            getSelectedNodes(){
                return this.$refs.tree.getSelectedNodes();
            },
            //选中后显示子资源
            dofindChild(arr){
                this.selectId = arr[0].id;
                this.childData = arr[0].children;
                this.$emit("select");
            }
        },
        mounted(){
            this.init();
        }
    }
</script>