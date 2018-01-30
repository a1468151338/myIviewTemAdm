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
                <!--左侧-->
                <div class="navicon-con">
                    <Button :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}" type="text" @click="toggleClick">
                        <Icon type="navicon" size="32"></Icon>
                    </Button>
                </div>
                <!--面包屑导航-->
                <!--<div class="header-middle-con">
                    <div class="main-breadcrumb">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                </div>-->
                <!--右侧-->
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
    </div>
</template>
<script>
//import Cookies from 'js-cookie';
import shrinkableMenu from './main-components/shrinkable-menu/shrinkable-menu.vue';
import tagsPageOpened from './main-components/tags-page-opened.vue';
import breadcrumbNav from './main-components/breadcrumb-nav.vue';
import Util from '../libs/util';

export default {
    components: {
        shrinkableMenu,
        tagsPageOpened,
        breadcrumbNav
    },
    data () {
        return {
            shrink: false,
            userName: '',
            userInfo:{
                userName:""
            },
            userInfoModal:{
                show:false
            }
        };
    },
    computed: {
        menuList () {
            return this.$store.state.app.menuList;
        },
        currentPath () {
            return this.$store.state.app.currentPath; // 当前面包屑数组
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
