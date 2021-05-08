"use strict";
/**
 * Copyright 2021 Sardonyx
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
function createElementFromHTML(htmlString) {
    const div = document.createElement('div');
    div.innerHTML = htmlString.trim();
    return div.firstChild;
}
function defaultAvatar(image) {
    let disc = parseInt(image.src.split('/')[4]) % 5;
    if (isNaN(disc))
        disc = 0;
    image.src = `https://cdn.discordapp.com/embed/avatars/${disc}.png`;
}
const parser = SimpleMarkdown.parserFor({
    ...SimpleMarkdown.defaultRules,
    url: {
        html: (node) => node.content
    }
});
async function createMessage({ author_id = '0', avatar_hash = '0', hexcolor = 'fff', timestamp = 0, author_nickname = 'none', content = 'none' }, original, i) {
    let trueContent = content;
    author_nickname = author_nickname.split('<').join('&lt;').split('>').join('&gt;');
    content = content.split('<').join('&lt;').split('>').join('&gt;');
    const mentions = trueContent.match(/<@![0-9]+>/g);
    if (mentions)
        for (const mention of mentions) {
            const id = mention.substring(3, mention.length - 1);
            const cached = original.find(x => x.author_id === id);
            if (cached) {
                trueContent = trueContent.replace(/<@![0-9]+>/g, `<span class="mention">@${cached.author_nickname}</span>`);
            }
            else {
                trueContent = trueContent.replace(/<@![0-9]+>/g, `<span class="mention">@${id}</span>`);
            }
        }
    const customEmotes = trueContent.match(/<a?:(\w+):\d+>|:(\w+):/gi);
    if (customEmotes)
        for (let i2 = 0; i2 < customEmotes.length; i2++) {
            const parsedEmoji = customEmotes[i2].match(/^<a?:(\w+):(\d+)>$/);
            trueContent = trueContent.replace(/<a?:(\w+):\d+>|:(\w+):/i, `<img draggable="false" class="emoji" alt="${parsedEmoji[1]}" src="https://cdn.discordapp.com/emojis/${parsedEmoji[2]}.${parsedEmoji[0].startsWith('<a:') ? 'gif' : 'png'}">`);
        }
    const out = SimpleMarkdown.defaultHtmlOutput(parser(trueContent), { inline: true });
    trueContent = out.startsWith("<") ? createElementFromHTML(out).innerHTML.split('&lt;img').join('<img').split('&gt;').join('>').split('&lt;span').join('<span').split('&lt;/span').join('</span').split('\n').join('<br>') : out;
    const msg = document.createElement('div');
    msg.className = "message";
    const right = document.createElement('div');
    right.className = "right";
    const msgContent = document.createElement('div');
    msgContent.innerHTML = trueContent;
    msgContent.className = 'messageContent';
    const spans = [document.createElement('span'), document.createElement('span')];
    spans[0].className = "nick";
    spans[1].className = "timestamp";
    spans[0].innerHTML = author_nickname;
    spans[0].style.color = `#${hexcolor}`;
    spans[1].innerHTML = moment(new Date(timestamp)).calendar();
    right.append(spans[0]);
    right.append(spans[1]);
    right.append(msgContent);
    const avatar = document.createElement('img');
    avatar.className = "avatar";
    avatar.src = `https://cdn.discordapp.com/avatars/${author_id}/${avatar_hash}.${avatar_hash.startsWith('a_') ? 'gif' : 'png'}`;
    avatar.draggable = false;
    avatar.setAttribute('onerror', 'defaultAvatar(this)');
    msg.append(avatar);
    msg.append(right);
    if (i === 0)
        msg.style.marginTop = "0px";
    return msg;
}
async function load(data) {
    if (document.getElementsByClassName('message').length !== 0)
        for (let i = document.getElementsByClassName('message').length; i === 0; i--) {
            document.getElementsByClassName('message')[i].remove();
        }
    data = data.sort((a, b) => a.timestamp - b.timestamp);
    for (let i = 0; i < data.length; i++)
        document.body.append(await createMessage(data[i], data, i));
    twemoji.parse(document.body);
    document.getElementById('loader').style.visibility = 'hidden';
}
const query = new URLSearchParams(location.search);
const data = query.get('data');
const channel = query.get('channel');
const attachment = query.get('attachment');
const fileName = query.get('name');
async function fileUpload(input) {
    console.log(await input.files[0].text());
    document.getElementById('loader').style.visibility = 'visible';
    document.getElementById('input').remove();
    load(JSON.parse(await input.files[0].text()));
}
;
(async function () {
    if (channel) {
        document.getElementById('loader').style.visibility = 'visible';
        const res = await fetch(`https://php.sardonyx.me/cors.php?path=${channel}/${attachment}/${fileName}`);
        load(await res.json());
    }
    else if (data === null) {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.id = 'input';
        input.setAttribute('onchange', 'fileUpload(this)');
        document.body.append(input);
    }
    else if (data.startsWith('http')) {
        throw new ReferenceError('Mehod not implemented.');
    }
    else {
        load(JSON.parse(data));
    }
})();
//# sourceMappingURL=javascript.js.map