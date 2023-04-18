<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>聊天室名称</span>
        <el-button class="button" text>Operation button</el-button>
      </div>
    </template>
    <div class="chat-box" ref="chat_box" @drop.stop="drophander($event)">
      <ul>
        <el-scrollbar ref="input_scroll" @scroll="scroll" always class="show_scrollbar">
          <li v-for="value in messageinfos" :key="value.id" class="chat_li">
            <div class="message" v-if="value.fromuser != user?.user.ip">
              <div class="message_user">
                {{ value.fromuser }}:
              </div>
              <div v-if="(value.message.file.length !== 0 && !value.message.text) ? true : false">
                <div v-for="valuess in value.message.file">
                  <div
                    v-if="(valuess.split('@type:')[1] === 'jpg' || valuess.split('@type:')[1] === 'png') ? true : false">
                    <el-image :src="valuess.split('@name:')[0]" fit="fill" class="img_show" />
                  </div>
                  <div v-else class="image_shuru_box1" @click="download(valuess)">
                    <span class="image_span1">{{ valuess.split('@name:')[1].split('@data:')[0].split('@type:')[0]
                    }}</span>
                    <el-image :src="valuess.split('@name:')[0]" fit="fill" class="img_show1" />
                  </div>
                </div>
              </div>
              <div class="message_box1" v-if="(value.message.file.length === 0 && value.message.text) ? true : false">
                {{ value.message.text }}
              </div>
              <div class="message_box3" v-if="(value.message.file.length !== 0 && value.message.text) ? true : false">
                <span class="message_box2_sapn">
                  {{ value.message.text}}
                </span>
                <br>
                <div v-for="valuess in value.message.file">
                  <div
                    v-if="(valuess.split('@type:')[1] === 'jpg' || valuess.split('@type:')[1] === 'png') ? true : false">
                    <el-image :src="valuess.split('@name:')[0]" fit="fill" class="img_show" />
                  </div>
                  <div v-else class="image_shuru_box1" @click="download(valuess)">
                    <span class="image_span1">{{ valuess.split('@name:')[1].split('@data:')[0].split('@type:')[0]
                    }}</span>
                    <el-image :src="valuess.split('@name:')[0]" fit="fill" class="img_show1" />
                  </div>
                </div>
              </div>
            </div>
            <div class="message1" v-if="value.fromuser == user?.user.ip">
              <div v-if="(value.message.file.length !== 0 && !value.message.text) ? true : false">
                <div v-for="valuess in value.message.file">
                  <div
                    v-if="(valuess.split('@type:')[1] === 'jpg' || valuess.split('@type:')[1] === 'png') ? true : false">
                    <el-image :src="valuess.split('@name:')[0]" fit="fill" class="img_show" />
                  </div>
                  <div v-else class="image_shuru_box1" @click="download(valuess)">
                    <span class="image_span1">{{ valuess.split('@name:')[1].split('@data:')[0].split('@type:')[0]
                    }}</span>
                    <el-image :src="valuess.split('@name:')[0]" fit="fill" class="img_show1" />
                  </div>
                </div>
              </div>
              <div class="message_box" v-if="(value.message.file.length === 0 && value.message.text) ? true : false">
                {{ value.message.text }}
              </div>
              <div class="message_box2" v-if="(value.message.file.length !== 0 && value.message.text) ? true : false">
                <span class="message_box2_sapn">
                  {{ value.message.text}}
                </span>
                <br>
                <div v-for="valuess in value.message.file">
                  <div
                    v-if="(valuess.split('@type:')[1] === 'jpg' || valuess.split('@type:')[1] === 'png') ? true : false">
                    <el-image :src="valuess.split('@name:')[0]" fit="fill" class="img_show" />
                  </div>
                  <div v-else class="image_shuru_box1" @click="download(valuess)">
                    <span class="image_span1">{{ valuess.split('@name:')[1].split('@data:')[0].split('@type:')[0]
                    }}</span>
                    <el-image :src="valuess.split('@name:')[0]" fit="fill" class="img_show1" />
                  </div>
                </div>
              </div>
              <div class="message_user">
                :{{ value.fromuser }}
              </div>
            </div>
          </li>
        </el-scrollbar>
      </ul>
      <div class="input-box">
        <div class="input_div">
          <el-scrollbar :always="false">
            <div v-if="url.length !== 0 ? true : false">
              <div v-for="values in url" class="image_shuru_box">
                <span class="image_span">{{ values.split('@name:')[1].split('@data:')[0].split('@type:')[0] }}</span>
                <el-image style="width: 80px; height: 80px" fit="fill" :src="values.split('@name:')[0]"
                  class="image_box1">
                </el-image>
              </div>
            </div>
            <input type="text" class="input_input" v-model="input" placeholder="输入内容" @keyup.prevent="send(false, $event)"
              @paste="pasthander($event)" />
          </el-scrollbar>
        </div>
        <el-button type="primary" round class="input-button" @click.prevent="send(true, $event)"
          :disabled="(url.length === 0 && !input) ? true : false">发送</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, reactive, toRefs, onMounted, nextTick } from 'vue'
import { io } from 'socket.io-client'
import { ElMessage, ElScrollbar } from 'element-plus'
import { downloadfiles } from '../../api/index'
const input_scroll = ref<InstanceType<typeof ElScrollbar>>()
const chat_box = ref<HTMLDivElement>()
onMounted(async () => {
  setTimeout(() => {
    input_scroll.value?.setScrollTop(input_scroll.value.wrapRef?.scrollHeight as number)
  }, 30)
})
interface messageinfos_type {
  id?: number,
  fromuser: string,
  message: {
    text: string,
    file: string[]
  },
  time?: string
}
interface userinfo_type {
  token: string,
  user: user_type
}
interface user_type {
  deverseType: string,
  id: string,
  ip: string,
  time: number,
  type: string
}
interface data_type {
  text: string,
  file: string[]
}
let messageinfos = ref<messageinfos_type[]>([])
let user = ref<userinfo_type>()
let updatenumber = ref(0)
let url = ref<string[]>([])
let socket = io('http://192.168.10.2:5566')
const input = ref('')
let isshow = ref(false)
let islayze = ref(true)
let vhs = ref()
const scroll = (value: any) => {
  if (value.scrollTop < 20 && islayze.value) {
    updatenumber.value++
    socket.emit('getmanymessage', updatenumber.value)
  }
}
socket.on('loginsuccess', (arg1) => {
  user.value = arg1
  localStorage.setItem('token', user.value?.token as string)
})
socket.on('getmessage', (arg1) => {
  if (arg1.length === 0) {
    islayze.value = false
  }
  messageinfos.value.unshift(...arg1)
  console.log(messageinfos.value)
})
socket.on('sendmessage', (arg1, arg2) => {
  messageinfos.value.push({
    fromuser: arg2.ip,
    message: arg1
  })
})
socket.io.on('error', (error) => {
  ElMessage({
    showClose: false,
    message: error.message,
    type: 'error'
  })
})
socket.io.on('reconnect_attempt', (attempt) => {
  ElMessage({
    showClose: false,
    message: '尝试重新连接',
    type: 'info'
  })
  socket.io.opts.extraHeaders = {
    token: localStorage.getItem('token') as string
  }
})
socket.io.on('reconnect_failed', () => {
  ElMessage({
    showClose: false,
    message: '重新连接失败',
    type: 'error'
  })
})
socket.io.on('reconnect', (attempt) => {
  ElMessage({
    showClose: false,
    message: '重新连接成功',
    type: 'success'
  })

})
socket.on('system', (arg1, arg2) => {
  ElMessage({
    showClose: false,
    message: `${arg1.ip}加入群聊`,
    type: 'info'
  })
})
socket.on('loginoutchengon', (arg1) => {
  ElMessage({
    showClose: false,
    message: arg1,
    type: 'info'
  })
})
socket.on('loginoutsibai', (arg1) => {
  ElMessage({
    showClose: false,
    message: arg1,
    type: 'error'
  })
})
socket.on('disconnect', (reason) => {
  console.log('socket.io断开的原因', ':', reason,)
})
const send = (isbutton: boolean, e: any) => {
  const sendinfo = () => {
    messageinfos.value.push({
      fromuser: user.value?.user.ip as string,
      message: {
        text: input.value,
        file: url.value
      }
    })
    let data: data_type = {
      text: input.value,
      file: []
    }
    if (isshow.value) {
      data.file = url.value
    }
    socket.emit('message', data)
    nextTick(() => {
      input_scroll.value?.setScrollTop(input_scroll.value.wrapRef?.scrollHeight as number)
    })
    input.value = ''
    url.value = []
    isshow.value = false
  }
  if (isbutton) {
    sendinfo()
  }
  else {
    if (e.keyCode === 13) {
      if (url.value.length === 0 && !input.value) {
        return
      }
      sendinfo()
    }
    if (e.keyCode === 8) {
      if (!input.value && url.value.length !== 0) {
        url.value.pop()
      }
    }
  }
}
const pasthander = (e: any) => {
  var data = e.clipboardData
  if (!data.items) {
    return
  }
  var items = data.items
  if (items == null || items.length <= 0) {
    return
  }
  let item = items[0]
  if (item.kind === 'file') {
    let m = item.getAsFile()
    let type = m.name.split('.')[m.name.split('.').length - 1]
    let type_schema = /^(txt|rar|jpg|png|zip|pdf|doc|docx)$/
    let result = type_schema.test(type)
    if (result) {
      const reader = new FileReader()
      reader.readAsArrayBuffer(m)
      reader.onload = ((e) => {
        let imgData = e.target?.result
        let binary = ''
        let bytes = new Uint8Array(imgData as any)
        console.log('@', bytes)
        let len = bytes.byteLength
        for (var i = 0; i < len; i++) {
          binary += String.fromCharCode(bytes[i])
        }
        let base64String
        if (type === 'png') {
          base64String = `data:image/png;base64,${window.btoa(binary)}@name:${m.name}@type:${type}`
        }
        if (type === 'jpg') {
          base64String = `data:image/jpeg;base64,${window.btoa(binary)}@name:${m.name}@type:${type}`
        }
        if (type === 'txt') {
          base64String = `../../../image/txt.jpg@name:${m.name}@data:${window.btoa(binary)}@type:${type}`
        }
        if (type === 'doc' || type === 'docx') {
          base64String = `../../../image/word.jpg@name:${m.name}@data:${window.btoa(binary)}@type:${type}`
        }
        if (type === 'rar') {
          base64String = `../../../image/rar.webp@name:${m.name}@data:${window.btoa(binary)}@type:${type}`
        }
        if (type === 'pdf') {
          base64String = `../../../image/pdf.png@name:${m.name}@data:${window.btoa(binary)}@type:${type}`
        }
        if (type === 'zip') {
          base64String = `../../../image/rar.webp@name:${m.name}@data:${window.btoa(binary)}@type:${type}`
        }
        url.value.push(base64String as string)
        isshow.value = true
      })
    }
  }
}
const download = async (content: any) => {
  const m = await downloadfiles({
    file_name: content.split('@data:')[1].split('@type:')[0],
    file_type: content.split('@type:')[1]
  })
  type content_type_type = Record<string, string>
  const content_type: content_type_type = {
    'doc': 'application/msword',
    'docx': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'txt': 'text/plain',
    'rar': 'application/x-rar-compressed',
    'zip': 'application/zip',
    'pdf': 'application/pdf'
  }
  if (m.status === 200) {
    var blob = new Blob([m.data], { type: content_type[content.split('@type:')[1]] })
    var url = window.URL.createObjectURL(blob)
    var a = document.createElement('a')
    a.href = url
    a.style.display = 'none'
    a.download = content.split('@data:')[1].split('@type:')[0].replace('http://192.168.10.2:5566/imageSave/', '')
    a.click()
    window.URL.revokeObjectURL(url);
    console.log(blob)
  }
}
const drophander = (e: any) => {
  e.preventDefault()
  console.log(e)
}
vhs.value = window.innerHeight * 0.01
</script>
<style>
@media (min-width:550px) {
  .el-card__body {
    flex: 1;
    padding: 1vh 1vw;
    background-color: rgba(128, 128, 128, 0.089);
  }

  .el-card__header {
    height: 20px;
    line-height: 20px;
  }

  .el-input__wrapper {
    height: 40px;
    overflow: auto;
  }
}

@media (max-width:550px) {
  .el-card__body {
    height: calc(100vh - 11vh);
    padding: 1vh 1vw;
    background-color: rgba(128, 128, 128, 0.089);
  }

  .el-card__header {
    height: 4vw;
    line-height: 4vw;
  }

  .el-input__wrapper {
    height: 8vw;
    overflow: auto;
  }
}
</style>
<style scoped>
.box-card {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.chat-box {
  height: 580px;
  width: 100%;
}

.chat_li {
  list-style: none;
  position: relative;
  clear: both;
}

.image_shuru_box {
  background-color: rgba(255, 255, 255, 0.911);
  display: flex;
  vertical-align: center;
}
.message_box2_sapn{
    white-space: pre-wrap;
    word-break: break-all;
}
@media (min-width:550px) {
  .card-header {
    display: flex;
    height: 10px;
    justify-content: space-between;
    align-items: center;
  }
  .input-box {
    width: 1300px;
    height: 70px;
    position: fixed;
    display: flex;
    left: 50%;
    transform: translateX(-50%);
    bottom:0;
    background-color: grey;
    z-index: 1000;
    padding-left:120px ;
  }

  .input_div {
    height: 35px;
    flex: 20;
    background-color: white;
    margin: 10px 10px;
    border-radius: 10px;
    padding: 0 10px;
  }

  .message {
    float: left;
    display: flex;
    margin-top: 10px;
  }

  .message1 {
    float: right;
    margin-top: 10px;
    display: flex;
  }

  .message_box {
    min-height: 20px;
    min-width: 20px;
    max-width: 550px;
    background-color: rgba(0, 0, 255, 0.55);
    border-radius: 20px;
    padding: 10px;
  }
  .message_box2{
    max-width:160px;
    background-color: rgba(0, 0, 255, 0.55);
    border-radius: 20px;
    padding: 10px;
  }

  .message_box1 {
    min-height: 20px;
    min-width: 20px;
    max-width: 550px;
    background-color: white;
    border-radius: 20px;
    padding: 10px;
  }
  .message_box3{
    max-width: 160px;
    background-color: rgba(128, 128, 128, 0.287);
    border-radius: 20px;
    padding: 10px;
  }

  .img_show {
    width: 60px;
    height: 100px;
    border-radius: 20px;
  }

  .img_show1 {
    width: 60px;
    height: 40px;
    margin-top: 5px;
    border-radius: 20px;
  }

  .image_shuru_box1 {
    background-color: rgba(255, 255, 255, 0.911);
    display: flex;
    max-width: 140px;
    justify-content: space-around;
    vertical-align: center;
    height: 60px;
    border-radius: 10px;
    margin: 5px auto;
  }

  .image_span1 {
    max-width: 80px;
    max-height: 40px;
    margin: 5px;
    flex: 1;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
  }

  .image_span {
    line-height: 80px;
    margin-right: 20px;
  }

  .image_box1 {
    border-radius: 10px;
  }

  .input_input {
    width: 100%;
    height: 35px;
    border: none;
    border-radius: 10px;
    outline: none;
    overflow: hidden;
  }

  .input-button {
    flex: 1;
    margin: 10px 0 0 10px;
  }
  .show_scrollbar {
    height: 650px;
  }
}

@media (max-width:550px) {
  .card-header {
    display: flex;
    height: 2vh;
    justify-content: space-between;
    align-items: center;
  }

  .chat-box>ul {
    padding: 1vh 1vw;
  }

  .input-box {
    width: 100vw;
    height: 8vh;
    position: fixed;
    display: flex;
    left: 0;
    bottom: 0vh;
    background-color: grey;
    z-index: 1000;
    padding-left: 10vw;
  }

  .input_div {
    height: 5.5vh;
    flex: 20;
    background-color: white;
    margin: 1vh 3vw;
    border-radius: 10px;
    padding: 0 2vw;
  }

  .message {
    float: left;
    display: flex;
    margin-top: 4vh;
  }

  .message1 {
    float: right;
    margin-top: 4vh;
    display: flex;
  }

  .message_box {
    min-height: 4vh;
    min-width: 4vw;
    max-width: 40vw;
    background-color: rgba(0, 0, 255, 0.55);
    border-radius: 20px;
    padding: 1vh 1vw;
  }

  .message_box1 {
    min-height: 4vh;
    min-width: 4vw;
    max-width: 40vw;
    background-color: white;
    border-radius: 20px;
    padding: 1vh 1vw;
  }
  .message_box3{
    max-width: 24vw;
    background-color: rgba(128, 128, 128, 0.206);
    border-radius: 20px;
    padding: 0.5vh 0.5vw;
  }

  .img_show {
    width: 8vw;
    height: 8vh;
    border-radius: 20px;
  }

  .img_show1 {
    width: 14vw;
    height: 6vh;
    border-radius: 20px;
  }
  .image_shuru_box1 {
    background-color: rgba(255, 255, 255, 0.911);
    display: flex;
    max-width: 24vw;
    justify-content: space-around;
    vertical-align: center;
    height: 8vh;
    border-radius: 10px;
    margin: 1vh 0px;
  }
  .image_span1 {
    max-height: 5.2vh;
    max-width: 10vw;
    margin: 0.5vh 0.5vw;
    flex: 1;
    text-align: center;
    font-size: 12px;
    font-weight: 700;
    word-break: break-all;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp:2;
    -webkit-box-orient: vertical;
  }
  .image_span {
    line-height: 10vh;
    margin-right: 3vw;
  }

  .image_box1 {
    border-radius: 10px;
  }

  .input_input {
    width: 100%;
    height: 5.5vh;
    border: none;
    border-radius: 10px;
    outline: none;
    overflow: hidden;
    line-height: 5.5vh;
  }

  .input-button {
    flex: 1;
    margin: 1.5vh 0 0 0;
  }

  .chat-box {
    height: calc(100vh - 11vh);
    width: 100%;
  }

  .show_scrollbar {
    height: calc(100vh - 23vh);
  }
  .message_box2{
    max-width: 24vw;
    background-color: rgba(0, 0, 255, 0.55);
    border-radius: 20px;
    padding: 0.5vh 0.5vw;
  }
}</style>