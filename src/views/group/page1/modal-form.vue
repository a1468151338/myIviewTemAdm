<template>
    <Tabs type="card">
        <TabPane label="基本设置">
            <Form :model="formItem" :label-width="80">
                <Row>
                    <Col span="12">
                    <FormItem label="任务名称:">
                        <Input v-model="formItem.input" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="保存路径:">
                        <Input v-model="formItem.input" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="域名:">
                        <Input v-model="formItem.input" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="下载前缀（域名）:">
                        <Input v-model="formItem.input" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="编码:">
                        <RadioGroup v-model="formItem.radio">
                            <Radio label="UTF-8">UTF-8</Radio>
                            <Radio label="GBK">GBK</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="请求方式:">
                        <RadioGroup v-model="formItem.radio">
                            <Radio label="GET">GET</Radio>
                            <Radio label="female">POST</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                </Row>
                <Row justify="center">
                    <Col span="6">
                    <FormItem label="文章抓取间隔（毫秒）:" label-width=140>
                        <Input v-model="formItem.input" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="图片抓取间隔（毫秒）:" label-width=140>
                        <Input v-model="formItem.input" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="栏目抓取间隔（毫秒）:" label-width=140>
                        <Input v-model="formItem.input" placeholder=""></Input>
                    </FormItem>
                    </Col>
                    <Col span="6">
                    <FormItem label="超时重试次数:" label-width=120>
                        <Input v-model="formItem.input" placeholder=""></Input>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="8">
                    <FormItem label="是否下载图片:">
                        <RadioGroup v-model="formItem.radio">
                            <Radio label="是">是</Radio>
                            <Radio label="否">否</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="是否下载附件:">
                        <RadioGroup v-model="formItem.radio">
                            <Radio label="是">是</Radio>
                            <Radio label="否">否</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                    <Col span="8">
                    <FormItem label="是否下载文章:">
                        <RadioGroup v-model="formItem.radio">
                            <Radio label="是">是</Radio>
                            <Radio label="否">否</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                </Row>
                <Row>
                    <Col span="12">
                    <FormItem label="附件路径替换为Http://开头:" label-width="200">
                        <RadioGroup v-model="formItem.radio">
                            <Radio label="是">UTF-8</Radio>
                            <Radio label="否">GBK</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                    <Col span="12">
                    <FormItem label="保存方式:">
                        <RadioGroup v-model="formItem.radio">
                            <Radio label="XML（大汉）"></Radio>
                            <Radio label="female">POST</Radio>
                            <Radio label="female">POST</Radio>
                        </RadioGroup>
                    </FormItem>
                    </Col>
                </Row>
            </Form>
        </TabPane>
        <!-- 列表设置 -->
        <TabPane label="列表设置">列表设置</TabPane>
        <!-- 文章设置 -->
        <TabPane label="文章设置">文章设置</TabPane>
    </Tabs>
</template>

<script>
    import Utils from '../../../libs/util'
    export default{
        name:'modalForm',
        props:['formdatas'],
        data () {
            return {
                formItem: {
                    input: '',
                    select: '',
                    radio: 'male',
                    checkbox: [],
                    switch: true,
                    date: '',
                    time: '',
                    slider: [20, 50],
                    textarea: ''
                }
            }
        },
        methods:{
            submit:function () {

            }
        }
    }
</script>