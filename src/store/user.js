import $ from 'jquery'
import {jwtDecode} from "jwt-decode";


export const ModuleUser = {
    state: {
        id: "",
        username: "",
        photo: "",
        followerCnt: 0,
        access: "",
        refresh: "",
        isLogin: false,
    },

    getters: {

    },

    mutations: {
        updateUser(state, user) {
            state.id = user.id;
            state.username = user.username;
            state.photo = user.photo;
            state.followerCnt = user.followerCount;
            state.access = user.access;
            state.refresh = user.refresh;
            state.isLogin = user.isLogin;
        },

        updateAccess(state, access) {
            state.access = access;
        },

        logout(state) {
            state.id = "";
            state.username = "";
            state.photo = "";
            state.followerCnt = 0;
            state.access = "";
            state.refresh = "";
            state.isLogin = false;
        }
    },

    actions: {
        login: (context, data)=>{  // data是从 LoginView.vue 组件中传过来的 (login() 中的 dispatch)
            $.ajax({  // jwt 登录验证, 如果用户名密码正确, 则返回一个 jwt token
                url: "https://app165.acapp.acwing.com.cn/api/token/",
                type: "post",
                data: {
                    username: data.username,
                    password: data.password,
                },
                success: (resp)=>{
                    const {access, refresh} = resp;  // 将token中的access refresh 存下来

                    setInterval(()=>{  // 每隔五分钟 (用refresh) 向后端申请一次access
                        $.ajax({
                            url: "https://app165.acapp.acwing.com.cn/api/token/refresh/",
                            type: "post",
                            data: {
                                refresh: refresh,
                            },
                            success: (resp)=>{
                                // console.log(resp);
                                context.commit("updateAccess", resp.access)
                            }
                        })
                    }, 1000 * 60 * 5);


                    const accessObj = jwtDecode(access);
                    // console.log(accessObj);
                    $.ajax({  // 使用 jwt token 向后端获取信息; 将数据写入 store
                        url: "https://app165.acapp.acwing.com.cn/myspace/getinfo/",
                        type: "get",
                        data: {
                            user_id: accessObj.user_id,
                        },
                        headers: {
                            Authorization: "Bearer " + access,
                        },

                        success: (resp)=>{
                            // console.log(resp);
                            context.commit("updateUser", {
                                ...resp,
                                access: access,
                                refresh: refresh,
                                isLogin: true,
                            });
                            data.success();
                        },
                    });
                },
                error: ()=> {data.error();},
            })
        },

        // logout: () => {
        //
        // },
    },

    modules: {

    },
}