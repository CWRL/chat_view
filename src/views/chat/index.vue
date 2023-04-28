<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>用户名：{{ user?.user.ip }}</span>
        <div class="dropdown_box" @mouseenter="dropdown_enter" @mouseleave="dropdown_leave">
          <span>在线人数：{{ curent_user.length }}</span>
        </div>
      </div>
    </template>
    <div class="dropdown_list" v-if="dropdown_show">
      <div class="dropdown_list_item" v-for="(item) in curent_user" :key="item.ip">
        <span class="dropdown_list_status"></span>
        {{ item.ip }}
      </div>
    </div>
    <div class="chat-box" ref="chat_box" @drop.stop="drophander($event)">
      <ul class="chat_ul">
        <el-scrollbar ref="input_scroll" @scroll="scroll" class="show_scrollbar">
          <li v-for="(value, index) in messageinfos" :key="value.id" class="chat_li">
            <div class="message" v-if="value.fromuser != user?.user.ip">
              <div class="message_user">
                <el-avatar :src="value.avator"></el-avatar>
              </div>
              <div class="message_content1">
                <div class="message_fromuser1">{{ value.fromuser }}</div>
                <div v-if="(value.message.file.length !== 0 && !value.message.text) ? true : false">
                  <div v-for="(valuess, indexss) in value.message.file">
                    <div v-if="(valuess.type === 'jpg' || valuess.type === 'png') ? true : false">
                      <el-image :src="valuess.showurl" fit="fill" class="img_show" :preview-src-list="srcList"
                        :initial-index="preview_hander(index, indexss)" :zoom-rate="0.7" :hide-on-click-modal="true"
                        :close-on-press-escape="false" :preview-teleported="true" />
                    </div>
                    <div v-else class="image_shuru_box1" @click="download(valuess)">
                      <div class="image_shuru_box1">
                        <span class="image_span1">{{ valuess.name }}</span>
                        <el-image :src="valuess.showurl" fit="fill" class="img_show1" />
                        <div class="cancel_box"
                          v-if="(valuess.downprogress && valuess.downprogress >= 0 && valuess.downprogress <= 100) ? true : false">
                          <el-progress :percentage="valuess.downprogress" class="progress" />
                          <el-button type="danger" :icon="Close" circle class="cancel_download"
                            @click="cancel_download(valuess, $event)" />
                        </div>
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
                  <div v-for="(valuess, indexss) in value.message.file">
                    <div v-if="(valuess.type === 'jpg' || valuess.type === 'png') ? true : false">
                      <el-image :src="valuess.showurl" fit="fill" class="img_show" :preview-src-list="srcList"
                        :initial-index="preview_hander(index, indexss)" :zoom-rate="0.7" :hide-on-click-modal="true"
                        :close-on-press-escape="false" :preview-teleported="true" />
                    </div>
                    <div v-else @click="download(valuess)">
                      <div class="image_shuru_box1">
                        <span class="image_span1">{{ valuess.name }}</span>
                        <el-image :src="valuess.showurl" fit="fill" class="img_show1" />
                        <div class="cancel_box"
                          v-if="(valuess.downprogress && valuess.downprogress >= 0 && valuess.downprogress <= 100) ? true : false">
                          <el-progress :percentage="valuess.downprogress" class="progress" />
                          <el-button type="danger" :icon="Close" circle class="cancel_download"
                            @click="cancel_download(valuess, $event)" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="message1" v-if="value.fromuser == user?.user.ip">
              <div class="message_content">
                <div class="message_fromuser">{{ value.fromuser }}</div>
                <div v-if="(value.message.file.length !== 0 && !value.message.text) ? true : false">
                  <div v-for="(valuess, indexss) in value.message.file">
                    <div v-if="(valuess.type === 'jpg' || valuess.type === 'png') ? true : false">
                      <el-image :src="valuess.showurl" fit="fill" class="img_show" :preview-src-list="srcList"
                        :initial-index="preview_hander(index, indexss)" :zoom-rate="0.7" :hide-on-click-modal="true"
                        :close-on-press-escape="false" :preview-teleported="true" />
                    </div>
                    <div v-else @click="download(valuess)" class="file_box">
                      <div class="image_shuru_box1">
                        <span class="image_span1">{{ valuess.name }}</span>
                        <el-image :src="valuess.showurl" fit="fill" class="img_show1" />
                        <el-progress :percentage="valuess.progress" class="progress1"
                          v-if="(valuess.progress >= 0 && valuess.progress <= 100) ? true : false" />
                        <div
                          v-if="(valuess.downprogress && valuess.downprogress >= 0 && valuess.downprogress <= 100) ? true : false"
                          class="cancel_box">
                          <el-progress :percentage="valuess.downprogress" class="progress" />
                          <el-button type="danger" :icon="Close" circle class="cancel_download"
                            @click="cancel_download(valuess, $event)" />
                        </div>
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
                  <div v-for="(valuess, indexss) in value.message.file">
                    <div v-if="(valuess.type === 'jpg' || valuess.type === 'png') ? true : false">
                      <el-image :src="valuess.showurl" fit="fill" class="img_show" :preview-src-list="srcList"
                        :initial-index="preview_hander(index, indexss)" :zoom-rate="0.7" :hide-on-click-modal="true"
                        :close-on-press-escape="false" :preview-teleported="true" />
                    </div>
                    <div v-else @click="download(valuess)">
                      <div class="image_shuru_box1">
                        <span class="image_span1">{{ valuess.name }}</span>
                        <el-image :src="valuess.showurl" fit="fill" class="img_show1" />
                        <el-progress :percentage="valuess.progress" class="progress1"
                          v-if="(valuess.progress >= 0 && valuess.progress <= 100) ? true : false" />
                        <div
                          v-if="(valuess.downprogress && valuess.downprogress >= 0 && valuess.downprogress <= 100) ? true : false"
                          class="cancel_box">
                          <el-progress :percentage="valuess.downprogress" class="progress"></el-progress>
                          <el-button type="danger" :icon="Close" circle class="cancel_download"
                            @click="cancel_download(valuess, $event)" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="message_user">
                <el-avatar :src="value.avator"></el-avatar>
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
          <div>
            <div>
              <label for="file_select" class="file_label">
                <el-button :icon="FolderOpened" class="file_button"></el-button>
                <input type="file" id="file_select" @change="file_change($event)">
              </label>
            </div>
          </div>
        </div>
        <el-button type="primary" round class="input-button" @click.prevent="send(true, $event)"
          :disabled="(url.length === 0 && !input) ? true : false">发送</el-button>
      </div>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue'
import { io } from 'socket.io-client'
import { ElMessage, ElScrollbar, messageConfig } from 'element-plus'
import { downloadfiles } from '../../api/index'
import SparkMD5 from 'spark-md5'
import {
  Close,
  FolderOpened
} from '@element-plus/icons-vue'
import { controllers } from '../../request'
import {time_hander} from '../../unit/time'
type file_show_type = Record<string, string>
let file_show: file_show_type = {
  'txt': '../../../image/txt.jpg',
  'rar': '../../../image/rar.jpg',
  'zip': '../../../image/rar.jpg',
  'pdf': '../../../image/pdf.png',
  'doc': '../../../image/word.jpg',
  'docx': '../../../image/word.jpg',
  'tar': '../../../image/rar.jpg'
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
  avator: string
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
  type: string,
  avator: string
}
interface sendmessage_type {
  text: string,
  hash: string,
  size: number,
  chunk: ArrayBuffer,
  curindex: number,
  name: string,
}
interface curent_user_type {
  id: string,
  ip: string,
  time: number,
  type: string,
  deverseType: string,
  avator: string
}
let dropdown_show = ref(false)
let curent_user = ref<curent_user_type[]>([])
let doing = ref(false)
let messageinfos = ref<messageinfos_type[]>([])
let user = ref<userinfo_type>()
let updatenumber = ref(0)
let url = ref<url_type[]>([])
let srcList = ref<string[]>([])
let srcList_biao = ref<string[]>([])
localStorage.removeItem('token')
let socket = io('http://192.168.10.2:5566', {
  extraHeaders: {
    "token": localStorage.getItem('token') ? localStorage.getItem('token') as string : ''
  }
})
const input = ref('')
let islayze = ref(true)
let sendmessage: sendmessage_type = {
  text: '',
  hash: '',
  size: 0,
  chunk: new ArrayBuffer(0),
  curindex: -1,
  name: '',
}
const scroll = (value: any) => {
  if (value.scrollTop < 20 && islayze.value) {
    updatenumber.value++
    socket.emit('getmanymessage', updatenumber.value)
  }
}
socket.on('curent_user', (arg1) => {
  curent_user.value = arg1.filter((item: any) => {
    if (item.type === 'user') {
      return true
    }
  })
})
socket.on('loginsuccess', (arg1) => {
  user.value = arg1
  if (localStorage.getItem('token')) {
    localStorage.removeItem('token')
  }
  localStorage.setItem('token', user.value?.token as string)
})
socket.on('getmessage', (arg1) => {
  if (arg1.length === 0) {
    islayze.value = false
  }
  let data = arg1.map((item: any, index1: number) => {
    item.message.file.forEach((items: any, index: number) => {
      if (items.type === 'jpg' || items.type === 'png') {
        item.message.file[index].showurl = items.url
        srcList.value.push(items.url)
        let num = `${index1 + 1}${index}-${srcList.value.length - 1}`
        srcList_biao.value.push(num)
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
  let messageinfos_length = messageinfos.value.length
  arg1.file.forEach((item: any, index: number) => {
    if (item.type === 'jpg' || item.type === 'png') {
      arg1.file[index].showurl = item.url
      srcList.value.push(item.url)
      let m = `${messageinfos_length+1}${index}-${srcList.value.length - 1}`
      srcList_biao.value.push(m)
    }
    else {
      arg1.file[index].showurl = file_show[item.type]
    }
  })
  messageinfos.value.push({
    fromuser: arg2.ip,
    message: arg1,
    avator: arg2.avator
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
const verty_sync = (hash: string) => {
  return new Promise((resolve) => {
    socket.emit('verty', hash, (ishave: string) => {
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
    datas.value.hash = hash
    const m: any = await verty_sync(hash as string)
    let has_file: any[] = []
    if (!m.status) {
      let data = {
        hash: hash,
        name: datas.value.name,
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
          name: datas.value.name,
        }
        socket_renwu.push(socket_sync(sendmessage, datas))
      }
      await Promise.all(socket_renwu).then(() => {
        socket.emit('merge', hash, chunks_length, file.name, (istrue: any) => {
          if (istrue.status === 1) {
            let data = {
              hash: hash,
              name: datas.value.name,
              type: type,
              url: istrue.data,
              progress: 101,
              size: file.size
            }
            if (data.type === 'jpg' || data.type === 'png') {
              srcList.value.push(data.url)
            }
            setTimeout(() => {
              datas.value.progress = 101
            }, 2000)
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
        avator: user.value?.user.avator as string
      })
      messageinfos.value.push(progressdata.value)
      let messageinfos_length = messageinfos.value.length
      url.value.forEach((item, index) => {
        let hasname: string[] = []
        messageinfos.value.forEach((item1, index1) => {
          item1.message.file.forEach((item2, index2) => {
            hasname.push(item2.name)
          })
        })
        while (hasname.includes(item.name)) {
          if (item.name.search(/\(\d\)\.\S+$/) === -1) {
            item.name = item.name.replace(/\.\S+$/, `(${1}).${item.type}`)
          }
          else {
            let num = +item.name.slice(item.name.search(/\(\d\)\.\S+$/) + 1, item.name.search(/\(\d\)\.\S+$/) + 2)
            let new_num = num + 1
            item.name = item.name.replace(/\(\d\)\.\S+$/, `(${new_num}).${item.type}`)
          }
        }
        let datas = ref<file_type>({
          showurl: item.showurl,
          name: item.name,
          hash: '',
          type: item.type,
          progress: 0,
          size: item.data.size
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
        progressdata.value.message.file.forEach((item, index) => {
          if (item.type === 'jpg' || item.type === 'png') {
            srcList.value.push(item.url as string)
            let m = `${messageinfos_length}${index}-${srcList.value.length - 1}`
            srcList_biao.value.push(m)
          }
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
        },
        avator: user.value?.user.avator as string
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
const file_hander = (m:any) => {
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
      file_hander(m)
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
  if (content.downprogress >= 0 && content.downprogress <= 100) {
    return
  }
  try {
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
      a.download = content.name
      a.click()
      window.URL.revokeObjectURL(url);
    }
  } catch (error: any) {
    console.log(error.message)
  }
}
const dropdown_enter = () => {
  dropdown_show.value = true
}
const dropdown_leave = () => {
  dropdown_show.value = false
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
const cancel_download = (value: file_type, e: any) => {
  e.stopPropagation()
  controllers.abort()
  setTimeout(() => {
    value.downprogress = -1
  }, 1000)
}
const preview_hander = (index: number, indexss: number) => {
  for (let i = 0; i < srcList_biao.value.length; i++) {
    if (srcList_biao.value[i].split('-')[0] === `${index + 1}${indexss}`) {
      return +srcList_biao.value[i].split('-')[1]
    }
  }
}
const file_change = (e: any) => {
  file_hander(e.target?.files[0])
}
</script>
<style>
.el-image-viewer__actions {
  display: none;
}
@media (min-width:550px) {
  .el-card__body {
    flex: 1;
    padding: 1vh 1vw;
    position: relative;
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
    position: relative;
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
.chat_ul {
  padding: 0;
}

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

.dropdown_list {
  position: absolute;
  width: 100%;
  background-color: white;
  left: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  flex-wrap: wrap;
}

.progress1 {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
}

@media (min-width:550px) {
  .file_button {
    width: 50px;
    height: 40px;
  }

  .file_label {
    position: relative;
  }

  #file_select {
    position: absolute;
    left: 0;
    top: 0;
    width: 50px;
    height: 40px;
    opacity: 0;
  }

  .cancel_box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .cancel_download {
    width: 5px;
    height: 5px;
  }

  .message_content {
    margin-right: 10px;
  }

  .message_content1 {
    margin-left: 10px;
  }

  .message_fromuser {
    text-align: right;
    line-height: 10px;
    margin-bottom: 5px;
  }

  .message_fromuser1 {
    text-align: left;
    line-height: 10px;
    margin-bottom: 5px;
  }

  .dropdown_box {
    color: green;
    margin-left: 20px;
    cursor: pointer;
  }

  .dropdown_list_item {
    margin-right: 15px;
    padding: 0 5px;
    margin-bottom: 5px;
  }

  .dropdown_list_status {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    display: inline-block;
    background-color: green;
  }

  .progress {
    flex: 1;
  }

  .card-header {
    display: flex;
    height: 10px;
    align-items: center;
  }

  .input-box {
    width: 1300px;
    height: 90px;
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
    margin-top: 20px;
  }

  .message1 {
    float: right;
    margin-top: 20px;
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
    min-width: 40px;
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
    height: 630px;
  }
}

@media (max-width:550px) {
  .file_button {
    width: 10vw;
    height: 5vh;
  }

  .file_label {
    position: relative;
  }

  #file_select {
    position: absolute;
    left: 0;
    top: 0;
    width: 10vw;
    height: 5vh;
    opacity: 0;
  }
  .cancel_box {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    display: flex;
    justify-content: space-around;
  }

  .cancel_download {
    width: 1vw;
    height: 1vh;
  }

  .message_content {
    margin-right: 2vw;
  }

  .message_content1 {
    margin-left: 2vw;
  }

  .message_fromuser {
    text-align: right;
    line-height: 1.2vh;
    margin-bottom: 0.5vh;
  }

  .message_fromuser1 {
    text-align: left;
    line-height: 1.2vh;
    margin-bottom: 0.5vh;
  }

  .dropdown_box {
    color: green;
    margin-left: 3vw;
    cursor: pointer;
  }

  .dropdown_list_item {
    margin-right: 2vw;
    padding: 0 0.5vw;
    margin-bottom: 0.5vw;
  }

  .dropdown_list_status {
    width: 2vw;
    height: 2vw;
    border-radius: 50%;
    display: inline-block;
    background-color: green;
  }

  .progress {
    flex: 1;
  }

  .card-header {
    display: flex;
    height: 2vh;
    /* justify-content: space-between; */
    align-items: center;
  }

  .chat-box>ul {
    padding: 1vh 1vw;
  }

  .input-box {
    width: 100vw;
    height: 12vh;
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
    max-width: 70vw;
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
    min-width: 6vw;
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
    max-width: 40vw;
    background-color: rgba(128, 128, 128, 0.206);
    border-radius: 20px;
    padding: 0.5vh 0.5vw;
  }

  .img_show {
    width: 15vw;
    height: 15vh;
    border-radius: 20px;
  }

  .img_show1 {
    width: 14vw;
    height: 8vh;
    border-radius: 20px;
  }

  .image_shuru_box1 {
    background-color: rgba(255, 255, 255, 0.911);
    display: flex;
    position: relative;
    max-width: 40vw;
    justify-content: space-around;
    vertical-align: center;
    height: 10vh;
    border-radius: 10px;
    margin: 1vh 0px;
  }

  .image_span1 {
    max-height: 5.2vh;
    max-width: 26vw;
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
    height: calc(100vh - 27vh);
  }

  .message_box2 {
    max-width: 40vw;
    background-color: rgba(0, 0, 255, 0.55);
    border-radius: 20px;
    padding: 0.5vh 0.5vw;
  }
}</style>