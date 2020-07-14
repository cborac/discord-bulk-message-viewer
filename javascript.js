/**
 * Copyright 2020 Sardonyx
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 * 
 * http://www.apache.org/licenses/LICENSE-2.0
 * 
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
function createMessage({ author_id, avatar_hash, hexcolor, timestamp, author_nickname, content }) {

     const msg = document.createElement('div')
     msg.className = "message"

     const right = document.createElement('div')
     right.className = "right"

     const spans = [ document.createElement('span'), document.createElement('span') ]
     spans[0].className = "nick"
     spans[1].className = "timestamp"
     spans[0].innerHTML = author_nickname
     spans[0].style.color = `#${hexcolor}`
     spans[1].innerHTML = moment(new Date(timestamp)).calendar()

     const msgContent = document.createElement('div')
     msgContent.innerHTML = content
     msgContent.className = 'messageContent'

     right.append(spans[0])
     right.append(spans[1])
     right.append(msgContent)

     const avatar = document.createElement('img')
     avatar.className = "avatar"
     avatar.src = `https://cdn.discordapp.com/avatars/${author_id}/${avatar_hash}.${avatar_hash.startsWith('a_') ? 'gif' : 'png'}`

     msg.append(avatar)
     msg.append(right)

     return msg
}

function load(data){
     if (document.getElementsByClassName('message').length !== 0) for (let i = document.getElementsByClassName('message').length; i === 0; i--) {
          document.getElementsByClassName('message')[i].remove()
     }
     data.sort((a, b) => a - b).forEach(element => {
          document.body.append(createMessage(element))
     });
}

const query = new URLSearchParams(location.search)

const data = query.get('data')

/**
 * 
 * @param {HTMLInputElement} input
 */
async function fileUpload(input){
   location.search = '?data=' + encodeURIComponent(await input.files[0].text())
}

if (data === null) {
     const input = document.createElement('input')
     input.type = 'file'
     input.accept = '.json'
     input.setAttribute('onchange', 'fileUpload(this)')
     document.body.append(input)
}
else if (data.startsWith('http')) {
     throw new ReferenceError('Mehod not implemented.')
}else {
     load(JSON.parse(data))
}