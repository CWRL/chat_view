<template>
    <div class="common-layout" id="buju">
        <el-container>
            <el-header>Header</el-header>
            <el-container id="content">
                <el-aside>
                    <el-menu active-text-color="#ffd04b" background-color="#545c64" class="el-menu-vertical-demo"
                        default-active="/layout/chat" text-color="#fff"
                        :router="true">
                        <el-menu-item index="/layout/chat" id="changeitem">
                            <el-icon>
                                <ChatLineSquare />
                            </el-icon>
                            <span class="chat_box">聊天室</span>
                        </el-menu-item>
                    </el-menu>
                </el-aside>
                <el-main>
                    <router-view></router-view>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted } from 'vue'
import {
    ChatLineSquare
} from '@element-plus/icons-vue'
</script>
<style>
#buju>.el-container {
    height: 100vh
}
@media(min-width:550px) {
    .el-header {
        height: 50px;
        background-color: #2e353b;
    }

    .el-aside {
        width: 120px;
    }

    .el-main {
        height: 790px;
        padding: 0;
        background-color: rgba(128, 128, 128, 0.089);
    }

    .el-menu-item {
        width: 100%;
    }

    .el-menu {
        height: 100%;
    }
}
@media (max-width:550px) {
    .el-header {
        height:7vh;
        background-color: #2e353b;
    }
    .el-aside {
        width:10vw;
    }
    .el-main {
        background-color: rgba(128, 128, 128, 0.089);
        padding:0;
        height: calc(100vh - 7vh);
    }
    #changeitem{
        width:10vw;
        padding:0px;
        justify-content: center;
    }
    .el-menu {
        width: 10vw;
        height: 100%;
    }
    .chat_box{
        display:none;
    }
    #content{
        height: calc(100vh - 7vh);
    }
}
</style>
<style scoped>
@media (min-width:550px) {}

#buju {
    width: 100%;
}

.content {
    flex: 1;
}
</style>