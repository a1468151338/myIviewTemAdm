<style lang="less">
    @import './login.less';
</style>

<template>
    <div class="login" @keydown.enter="handleSubmit">
        <div class="login-con">
            <Card :bordered="false">
                <p slot="title">
                    <Icon type="log-in"></Icon>
                    欢迎登录
                </p>
                <div class="form-con">
                    <Form ref="loginForm" :model="form" :rules="rules">
                        <FormItem prop="userName">
                            <Input v-model="form.account" placeholder="请输入用户名">
                                <span slot="prepend">
                                    <Icon :size="16" type="person"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem prop="password">
                            <Input type="password" v-model="form.password" placeholder="请输入密码">
                                <span slot="prepend">
                                    <Icon :size="14" type="locked"></Icon>
                                </span>
                            </Input>
                        </FormItem>
                        <FormItem>
                            <Button @click="handleSubmit" type="primary" long>登录</Button>
                        </FormItem>
                    </Form>
                </div>
            </Card>
        </div>
    </div>
</template>

<script>
import Cookies from 'js-cookie';
import Util from '../libs/util';
export default {
    data () {
        return {
            form: {
                account: 'zkl',
                password: '123456'
            },
            rules: {
                account: [
                    { required: true, message: '账号不能为空', trigger: 'blur' }
                ],
                password: [
                    { required: true, message: '密码不能为空', trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        handleSubmit () {
            this.$refs.loginForm.validate((valid) => {
                if (valid) {
                    const self = this;
                    Util.ajax.post("/api/sys/main/doLogin",this.form)
                            .then(function (response) {
                                console.log(response);
                                console.log(response.data);
                                if(response.data.code=='100'){
                                    //登录成功返回token
                                    //Cookies.set('token',response.data.msg+'');
                                    //localStorage.setItem('token',response.data.msg+'');
                                    self.$store.commit('saveToken',response.data.msg);
                                    //跳转首页
                                    self.$router.push({name: 'home_index'});
                                }else{
                                    alert(response.data.msg);
                                }
                            })
                            .catch(function (error) {
                                console.log(error);
                            });
                    /*Cookies.set('user', this.form.userName);
                    this.$router.push({
                        name: 'home_index'
                    });*/
                }
            });
        }
    }
};
</script>

<style>

</style>
