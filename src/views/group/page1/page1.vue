<style scope>
    .layout{
        position: relative;
    }
</style>
<template>
    <div class="layout">
        <Row type="flex" justify="start" class="ivu-row-flex">
            <Col  :xs="8" :sm="6" :md="6" :lg="3">
            <col-tree></col-tree>
            </Col>
            <Col :xs="16" :sm="18" :md="18" :lg="21">
            <Row>
                <Button-group>
                    <i-button type="info">添加</i-button>
                    <i-button type="error">删除</i-button>
                    <i-button type="ghost">日志</i-button>
                </Button-group>
                <Input placeholder="请输入关键字搜搜..." style="width: 200px" />
                <span  style="margin: 0 10px;"><Button type="primary" icon="search">搜索</Button></span>
            </Row>
            <br>
            <Table stripe border :columns="columns1" :data="data1"></Table>
            </Col>
        </Row>
        <!-- 自定义Modal -->
        <Modal v-model="modal.show" width="700" @keyup.esc="modal.show = false">
            <p slot="header" style="text-align:center">
                <span></span>
            </p>
            <div>
                <modalFormList></modalFormList>
            </div>
            <Row slot="footer">
                <Button type="info" size="large">确定</Button>
                <Button type="ghost" size="large" @click="modal.show = false">取消</Button>
            </Row>
        </Modal>
    </div>
</template>

<script>
    import modalFormList from './modal-form-list.vue';
    import colTree from '../../mylib/col-tree.vue';
    export default {
        name:'page1',
        components:{
            modalFormList,
            colTree
        },
        data () {
            return {
                modal:{
                  show:false
                },
                columns1: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '序号',
                        type:'index',
                        width:'60',
                        align:'center'
                    },
                    {
                        title: '名称',
                        key: 'name'
                    },
                    {
                        title: '更新时间',
                        key: 'time'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        fixed: 'right',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.modal.show=true
                                        }
                                    }
                                }, '编辑'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                data1: [
                    {
                        name: '测试',
                        time: 2013,
                    },{
                        name: '测试2',
                        time: 2013,
                    }
                ]
            }
        },
        methods:{
            remove (index) {
                this.data1.splice(index, 1);
            }
        }
    }
</script>
