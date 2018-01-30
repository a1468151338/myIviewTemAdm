<style lang="less">
    @import "../styles/common.less";
    @import "./main.less";
</style>
<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div class="sidebar-menu-con" :style="{width: shrink?'60px':'200px', overflow: shrink ? 'visible' : 'auto'}">
            <shrinkable-menu 
                :shrink="shrink"
                :menu-list="menuList">
                <div slot="top" class="logo-con">
                    <img v-show="!shrink"  src="../images/logo.jpg" key="max-logo" />
                    <img v-show="shrink" src="../images/logo-min.jpg" key="min-logo" />
                </div>
            </shrinkable-menu>
        </div>
        <div class="main-header-con" :style="{paddingLeft: shrink?'60px':'200px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                    <!--位置导航-->
                    <Breadcrumb style="display:inline-block;margin-left:20px;">
                        <BreadcrumbItem to="/">首页</BreadcrumbItem>
                        <BreadcrumbItem to="/components/breadcrumb">Components</BreadcrumbItem>
                        <BreadcrumbItem>Breadcrumb</BreadcrumbItem>
                    </Breadcrumb>
                </div>
                <div class="header-avator-con">
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="click">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ userName }}</span>
                                    <Icon type="arrow-down-b"></Icon>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem @click="userInfoModal.show=true" divided>个人资料</DropdownItem>
                                    <DropdownItem name="loginout" @click="handleClickUserDropdown" divided>退出登录</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                            <Avatar icon="person" style="background: #619fe7;margin-left:10px;"></Avatar>
                        </Row>
                    </div>
                </div>
            </div>
        </div>
        <div class="single-page-con" :style="{left: shrink?'60px':'200px'}">
            <div class="single-page">
                <router-view></router-view>
            </div>
        </div>

        <!-- 自定义Modal -->
        <Modal v-model="userInfoModal.show" width="700" @keyup.esc="userInfoModal.show = false">
            <p slot="header" style="text-align:center">
                <span>用户信息</span>
            </p>
            <!--表单-->
            <div>
                <Form :model="formItem" :label-width="80">
                    <FormItem label="姓名">
                        <Input v-model="formItem.name" placeholder="请输入姓名"></Input>
                    </FormItem>
                    <FormItem label="账号">
                        <Input v-model="formItem.account" placeholder="请输入账号"></Input>
                    </FormItem>
                    <FormItem label="密码">
                        <Input v-if="modal.isadd" type="password" v-model="formItem.password" placeholder="请输入密码"></Input>
                        <Input v-else type="password" v-model="formItem.password" placeholder="密码为空表示不修改"></Input>
                    </FormItem>
                    <FormItem label="重复密码">
                        <Input type="password" v-model="formItem.passwordCheck" placeholder="请再次输入密码"></Input>
                    </FormItem>
                    <FormItem label="性别">
                        <RadioGroup v-model="formItem.sex">
                            <Radio label="1">男</Radio>
                            <Radio label="2">女</Radio>
                        </RadioGroup>
                    </FormItem>
                    <FormItem label="手机">
                        <Input v-model="formItem.phone" placeholder="请输入手机"></Input>
                    </FormItem>
                    <FormItem label="邮箱">
                        <Input v-model="formItem.email" placeholder="请输入邮箱"></Input>
                    </FormItem>
                    <FormItem label="用户角色">
                        <CheckboxGroup v-model="formItem.sysRoleList">
                            <template v-for="(item,index) in roleList">
                                <span v-if="index>0">，</span><Checkbox :label="item.id">{{item.name}}</Checkbox>
                            </template>
                        </CheckboxGroup>
                    </FormItem>
                </Form>
            </div>
            <Row slot="footer">
                <Button type="info" size="large" @click="updateUserInfo()">确定</Button>
                <Button type="ghost" size="large" @click="userInfoModal.show = false">取消</Button>
            </Row>
        </Modal>
    </div>
</template>
<script>
import Cookies from 'js-cookie';
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import Util from '../libs/util';

export default {
    components: {
        shrinkableMenu
    },
    data () {
        return {
            shrink: false,
            userName: '',
            userInfo:{
                userName:"",

            },
            userInfoModal:{
                show:false
            }
        };
    },
    computed: {
        menuList () {
            return this.$store.state.app.menuList;
        }
    },
    methods: {
        init () {
            //初始化获取用户信息
            const self = this;
            Util.ajax.post("/api/sys/main/userInfo").then(function (response) {
                console.log(response.data);
                if(response.data.code==100){
                    self.userName = response.data.account;
                }
            });
            //用户拥有资源
            //self.$store.dispatch("updateMenulist");
        },
        toggleClick () {
            this.shrink = !this.shrink;
        },
        editInfo(){

        },
        handleClickUserDropdown () {
            //退出登录
            this.$store.commit("logout");
            this.$router.push({name: 'login'});
        }
    },
    mounted () {
        this.init();
    }
};
</script>
