<template>
    <Form :model="formItem" :label-width="80">
        <FormItem label="栏目名称:">
            <Input v-model="formItem.input" placeholder=""></Input>
        </FormItem>
        <FormItem label="栏目路径:">
            <Input v-model="formItem.input" placeholder=""></Input>
        </FormItem>
        <FormItem label="栏目类型:">
            <Select v-model="formItem.slider">
                <Option value="beijing">New York</Option>
                <Option value="shanghai">London</Option>
                <Option value="shenzhen">Sydney</Option>
            </Select>
        </FormItem>
    </Form>
</template>

<script>
    import Utils from '../../../libs/util'
    export default{
        name:'modalFormList',
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