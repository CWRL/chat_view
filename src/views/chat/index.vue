<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户名：{{ user?.user.ip }}</span>
      </div>
    </template>
    <div class="chat-box" ref="chat_box" @drop.stop="drophander($event)">
      <ul>
        <el-scrollbar ref="input_scroll" @scroll="scroll" class="show_scrollbar">
          <li v-for="value in messageinfos" :key="value.id" class="chat_li">
            <div class="message" v-if="value.fromuser != user?.user.ip">
              <div class="message_user">
                {{ value.fromuser }}:
              </div>
              <div v-if="(value.message.file.length !== 0 && !value.message.text) ? true : false">
                <div v-for="valuess in value.message.file">
                  <div v-if="(valuess.type === 'jpg' || valuess.type === 'png') ? true : false">
                    <el-image :src="valuess.showurl" fit="fill" class="img_show" />
                  </div>
                  <div v-else class="image_shuru_box1" @click="download(valuess)">
                    <div class="image_shuru_box1">
                      <span class="image_span1">{{ valuess.name }}</span>
                      <el-image :src="valuess.showurl" fit="fill" class="img_show1" />
                      <el-progress :percentage="valuess.downprogress" class="progress"
                        v-if="(valuess.downprogress && valuess.downprogress >= 0 && valuess.downprogress <= 100) ? true : false"></el-progress>
                    </div>
                  </div>
                </div>
              </div>
              <div class="message_box1" v-if="(value.message.file.length === 0 && value.message.text) ? true : false">
                {{ value.message.text }}
              </div>
              <div class="message_box3" v-if="(value.message.file.length !== 0 && value.message.text) ? true : false">
                <span class="message_box2_sapn">
                  {{ value.message.text }}
                </span>
                <br>
                <div v-for="valuess in value.message.file">
                  <div v-if="(valuess.type === 'jpg' || valuess.type === 'png') ? true : false">
                    <el-image :src="valuess.showurl" fit="fill" class="img_show" />
                  </div>
                  <div v-else @click="download(valuess)">
                    <div class="image_shuru_box1">
                      <span class="image_span1">{{ valuess.name }}</span>
                      <el-image :src="valuess.showurl" fit="fill" class="img_show1" />
                      <el-progress :percentage="valuess.downprogress" class="progress"
                        v-if="(valuess.downprogress && valuess.downprogress >= 0 && valuess.downprogress <= 100) ? true : false"></el-progress>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="message1" v-if="value.fromuser == user?.user.ip">
              <div v-if="(value.message.file.length !== 0 && !value.message.text) ? true : false">
                <div v-for="valuess in value.message.file">
                  <div v-if="(valuess.type === 'jpg' || valuess.type === 'png') ? true : false">
                    <el-image :src="valuess.showurl" fit="fill" class="img_show" />
                  </div>
                  <div v-else @click="download(valuess)" class="file_box">
                    <div class="image_shuru_box1">
                      <span class="image_span1">{{ valuess.name }}</span>
                      <el-image :src="valuess.showurl" fit="fill" class="img_show1" />
                      <el-progress :percentage="valuess.progress" class="progress"
                        v-if="(valuess.progress >= 0 && valuess.progress <= 100) ? true : false" />
                      <el-progress :percentage="valuess.downprogress" class="progress"
                        v-if="(valuess.downprogress && valuess.downprogress >= 0 && valuess.downprogress <= 100) ? true : false"></el-progress>
                    </div>
                  </div>
                </div>
              </div>
              <div class="message_box" v-if="(value.message.file.length === 0 && value.message.text) ? true : false">
                {{ value.message.text }}
              </div>
              <div class="message_box2" v-if="(value.message.file.length !== 0 && value.message.text) ? true : false">
                <span class="message_box2_sapn">
                  {{ value.message.text }}
                </span>
                <br>
                <div v-for="valuess in value.message.file">
                  <div v-if="(valuess.type === 'jpg' || valuess.type === 'png') ? true : false">
                    <el-image :src="valuess.showurl" fit="fill" class="img_show" />
                  </div>
                  <div v-else @click="download(valuess)">
                    <div class="image_shuru_box1">
                      <span class="image_span1">{{ valuess.name }}</span>
                      <el-image :src="valuess.showurl" fit="fill" class="img_show1" />
                      <el-progress :percentage="valuess.progress" class="progress"
                        v-if="(valuess.progress >= 0 && valuess.progress <= 100) ? true : false" />
                      <el-progress :percentage="valuess.downprogress" class="progress"
                        v-if="(valuess.downprogress && valuess.downprogress >= 0 && valuess.downprogress <= 100) ? true : false"></el-progress>
                    </div>
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
                <span class="image_span">{{ values.name }}</span>
                <el-image style="width: 80px; height: 80px" fit="fill" :src="values.showurl" class="image_box1">
                </el-image>
              </div>
            </div>
            <input type="text" class="input_input" v-model="input" placeholder="输入内容" @keyup.prevent="send(false, $event)"
              @paste="pasthander($event)" @compositionstart="compositionstart_hander"
              @compositionend="compositionend_hander" />
          </el-scrollbar>
        </div>
        <el-button type="primary" round class="input-button" @click.prevent="send(true, $event)"
          :disabled="(url.length === 0 && !input) ? true : false">发送</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, onBeforeUpdate } from 'vue'
import { io } from 'socket.io-client'
import { ElMessage, ElScrollbar } from 'element-plus'
import { downloadfiles } from '../../api/index'
import SparkMD5 from 'spark-md5'
type file_show_type = Record<string, string>
let file_show: file_show_type = {
  'txt': '../../../image/txt.jpg',
  'rar': '../../../image/rar.webp',
  'zip': '../../../image/rar.webp',
  'pdf': '../../../image/pdf.png',
  'doc': '../../../image/word.jpg',
  'docx': '../../../image/word.jpg',
  'tar': '../../../image/rar.webp'
}
const input_scroll = ref<InstanceType<typeof ElScrollbar>>()
const chat_box = ref<HTMLDivElement>()
onMounted(async () => {
  setTimeout(() => {
    input_scroll.value?.setScrollTop(input_scroll.value.wrapRef?.scrollHeight as number)
  }, 50)
})
interface url_type {
  showurl: string,
  name: string,
  type: string,
  data: Blob,
}
interface file_type {
  showurl: string,
  name: string,
  hash?: string,
  type: string,
  url?: string,
  progress: number,
  size: number,
  downprogress?: number
}
interface messageinfos_type {
  id?: number,
  fromuser: string,
  message: {
    text: string,
    file: file_type[]
  },
  time?: string,
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
interface sendmessage_type {
  text: string,
  hash: string,
  size: number,
  chunk: ArrayBuffer,
  curindex: number,
  name: string,
}
let doing = ref(false)
let messageinfos = ref<messageinfos_type[]>([])
let user = ref<userinfo_type>()
let updatenumber = ref(0)
let url = ref<url_type[]>([])
let socket = io('http://192.168.10.2:5566')
let sendmessage: sendmessage_type = {
  text: '',
  hash: '',
  size: 0,
  chunk: new ArrayBuffer(0),
  curindex: -1,
  name: '',
}
const input = ref('')
let islayze = ref(true)
const scroll = (value: any) => {
  if (value.scrollTop < 20 && islayze.value) {
    updatenumber.value++
    socket.emit('getmanymessage', updatenumber.value)
  }
}
socket.on('loginsuccess', (arg1) => {
  user.value = arg1
  localStorage.setItem('token',user.value?.token as string)
})
socket.on('getmessage', (arg1) => {
  if (arg1.length === 0) {
    islayze.value = false
  }
  let data = arg1.map((item: any) => {
    item.message.file.forEach((items: any, index: number) => {
      if (items.type === 'jpg' || items.type === 'png') {
        item.message.file[index].showurl = items.url
      }
      else {
        item.message.file[index].showurl = file_show[items.type]
      }
    })
    return item
  })
  messageinfos.value.unshift(...data)
})
socket.on('sendmessage', (arg1, arg2) => {
  console.log(arg1, arg2)
  arg1.file.forEach((item: any, index: number) => {
    if (item.type === 'jpg' || item.type === 'png') {
      arg1.file[index].showurl = item.url
    }
    else {
      arg1.file[index].showurl = file_show[item.type]
    }
  })
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
  messageinfos.value = []
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
const hash_hander = (file: any, SIZE: number) => {
  return new Promise((resolve, reject) => {
    const chunks_length = Math.ceil(file.size / SIZE)
    const reader = new FileReader()
    reader.readAsArrayBuffer(file)
    const spark = new SparkMD5.ArrayBuffer()
    reader.onload = (e) => {
      let result = e.target?.result
      for (let i = 0; i < chunks_length; i++) {
        let start = i * SIZE
        let end = (i + 1) * SIZE > file.size ? file.size : (i + 1) * SIZE
        let cur_blob = result?.slice(start, end)
        spark.append(cur_blob as ArrayBuffer)
      }
      const hash = spark.end()
      resolve(hash)
    }
  })
}
const socket_sync = (data: any, datas: any) => {
  return new Promise((resolve, reject) => {
    socket.emit('message', data, (istrue: any) => {
      if (istrue.status === 1) {
        resolve(istrue.data)
        let jindu = 1 / data.size * 100
        datas.value.progress += jindu
        datas.value.progress = Math.ceil(datas.value.progress) > 100 ? 100 : Math.ceil(datas.value.progress)
      }
      else {
        reject(istrue.data)
      }
    })
  })
}
const verty_sync = (hash: string, name: string) => {
  return new Promise((resolve, reject) => {
    socket.emit('verty', hash, name, (ishave: string) => {
      resolve(ishave)
    })
  })
}
const handerfile = (file: any, type: string, showurl: string, datas: any) => {
  return new Promise(async (resolve, reject) => {
    const SIZE = 1024 * 1024 * 2
    const chunks_length = Math.ceil(file.size / SIZE)
    const reader = new FileReader()
    const hash = await hash_hander(file, SIZE)
    datas.value.hash=hash
    const m: any = await verty_sync(hash as string, file.name)
    let has_file: any[] = []
    if (!m.status) {
      let data = {
        hash: hash,
        name: file.name,
        type: type,
        url: m.data.url,
        progress: 101,
        size: file.size
      }
      datas.value.progress = 100
      setTimeout(() => {
        datas.value.progress = 101
      }, 2000)
      has_file = m.data.data
      resolve(data)
      return
    }
    else {
      if (m.status === 2) {
        m.data.data.forEach((item: any, index: any) => {
          m.data.data[index] = item.replace(`${hash}`, '')
        })
        has_file = m.data.data
      }
      else {
        has_file = m.data.data
      }
    }
    reader.readAsArrayBuffer(file)
    let socket_renwu: any = []
    reader.onload = async (e) => {
      let result = e.target?.result
      for (let i = 0; i < chunks_length; i++) {
        if (has_file.includes(i)) {
          break
        }
        let start = i * SIZE
        let end = (i + 1) * SIZE > file.size ? file.size : (i + 1) * SIZE
        let cur_blob = result?.slice(start, end)
        sendmessage = {
          text: '',
          hash: hash as string,
          size: chunks_length,
          chunk: cur_blob as ArrayBuffer,
          curindex: i + 1,
          name: file.name,
        }
        socket_renwu.push(socket_sync(sendmessage, datas))
      }
      await Promise.all(socket_renwu).then(() => {
        socket.emit('merge', hash, chunks_length, file.name, (istrue: any) => {
          if (istrue.status === 1) {
            let data = {
              hash: hash,
              name: file.name,
              type: type,
              url: istrue.data,
              progress: 101,
              size: file.size
            }
            setTimeout(() => {
              datas.value.progress = 101
            },2000)
            resolve(data)
          }
          else {
            reject(istrue.data)
          }
        })
      }).catch((message) => {
        console.log(message)
      })
      sendmessage = {
        text: '',
        hash: '',
        size: 0,
        chunk: new ArrayBuffer(0),
        curindex: -1,
        name: '',
      }
    }
  })
}
const send = (isbutton: boolean, e: any) => {
  const sendinfo = async () => {
    if (url.value.length) {
      let chunkss: any = []
      let progressdata = ref<messageinfos_type>({
        fromuser: user.value?.user.ip as string,
        message: {
          text: input.value,
          file: []
        },
      })
      messageinfos.value.push(progressdata.value)
      url.value.forEach((item) => {
        let datas = ref<file_type>({
          showurl: item.showurl,
          name: item.name,
          hash:'',
          type:item.type,
          progress: 0,
          size:item.data.size
        })
        progressdata.value.message.file.push(datas.value)
        chunkss.push(handerfile(item.data, item.type, item.showurl, datas))
      })
      nextTick(() => {
        input_scroll.value?.setScrollTop(input_scroll.value.wrapRef?.scrollHeight as number)
      })
      let textvalue = input.value
      input.value = ''
      url.value = []
      await Promise.all(chunkss).then((values) => {
        progressdata.value.message.file.forEach((item, index) => {
          values.forEach((item1, index1) => {
            if (item.hash === item1.hash) {
              progressdata.value.message.file[index].url = item1.url
            }
          })
        })
        socket.emit('allsendsuccess', values, textvalue)
      })
    }
    else {
      messageinfos.value.push({
        fromuser: user.value?.user.ip as string,
        message: {
          text: input.value,
          file: []
        }
      })
      socket.emit('allsendsuccess', [], input.value)
      nextTick(() => {
        input_scroll.value?.setScrollTop(input_scroll.value.wrapRef?.scrollHeight as number)
      })
      input.value = ''
    }
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
      if (!doing.value) {
        if (!input.value && url.value.length !== 0) {
          url.value.pop()
        }
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
  for (let i = 0; i < items.length; i++) {
    let item = items[i]
    if (item.kind === 'file') {
      let m = item.getAsFile()
      let type = m.name.split('.')[m.name.split('.').length - 1]
      let type_schema = /^(txt|rar|jpg|png|zip|pdf|doc|docx|tar)$/
      let result = type_schema.test(type)
      if (result) {
        if (type == 'jpg' || type == 'png') {
          const reader = new FileReader()
          reader.readAsDataURL(m)
          reader.onload = (e) => {
            let result = e.target?.result
            const data = {
              showurl: result,
              name: m.name,
              type: type,
              data: m,
            }
            url.value.push(data as url_type)
          }
        }
        else {
          let result = file_show[type]
          const data = {
            showurl: result,
            name: m.name,
            type: type,
            data: m,
          }
          url.value.push(data as url_type)
        }
      }
    }
  }
}
const download = async (content: any) => {
  const uploadEvent = (progressEvent: any) => {
    content.downprogress = Math.ceil(progressEvent.loaded / content.size * 100) > 100 ? 100 : Math.ceil(progressEvent.loaded / content.size * 100)
    if (content.downprogress == 100) {
      setTimeout(() => {
        content.downprogress = 101
      }, 2000)
    }
  }
  const m = await downloadfiles({
    file_hash: content.hash,
    file_name: content.name,
    file_path: content.url,
    file_type: content.type
  }, uploadEvent)
  if (m.status === 200) {
    var blob = new Blob([m.data])
    var url = window.URL.createObjectURL(blob)
    var a = document.createElement('a')
    a.href = url
    a.style.display = 'none'
    a.download = content.hash + content.name
    a.click()
    window.URL.revokeObjectURL(url);
  }
}
const compositionstart_hander = () => {
  doing.value = true
}
const compositionend_hander = () => {
  doing.value = false
}
const drophander = (e: any) => {
  e.preventDefault()
}
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

.message_box2_sapn {
  white-space: pre-wrap;
  word-break: break-all;
}

@media (min-width:550px) {
  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

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
    bottom: 0;
    background-color: grey;
    z-index: 1000;
    padding-left: 120px;
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

  .message_box2 {
    max-width: 160px;
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

  .message_box3 {
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
    position: relative;
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
    -webkit-line-clamp: 2;
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
  .progress {
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
  }

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

  .message_box3 {
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
    position: relative;
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
    -webkit-line-clamp: 2;
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

  .message_box2 {
    max-width: 24vw;
    background-color: rgba(0, 0, 255, 0.55);
    border-radius: 20px;
    padding: 0.5vh 0.5vw;
  }
}
</style>