https://sardonyx.me/discord-bulk-message-viewer

# Discord Bulk Message Viewer
Just supply a JSON file within the url or supply it directly on the website.

```
https://discord-bulk-message-viewer.sardonyx.me?data=ENCODEDURICOMPONENTHERE
```
[Example](https://sardonyx.me/discord-bulk-message-viewer/?data=%5B%0A%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22author_id%22%3A%20%22295222772546928641%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avatar_hash%22%3A%20%222ba235580297f757f3cd4bf188a94385%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22hexcolor%22%3A%20%22B99CBA%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22timestamp%22%3A%201594744316220%2C%0A%20%20%20%20%20%20%20%20%20%20%22author_nickname%22%3A%20%22Sardonyx%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22content%22%3A%20%22%F0%9F%98%83%20**Hello%20World!**%20%3Ca%3ApeepoDance%3A679412806063489054%3E%22%0A%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22author_id%22%3A%20%22295222772546928641%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avatar_hash%22%3A%20%222ba235580297f757f3cd4bf188a94385%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22hexcolor%22%3A%20%22B99CBA%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22timestamp%22%3A%201594744316220%2C%0A%20%20%20%20%20%20%20%20%20%20%22author_nickname%22%3A%20%22Sardonyx%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22content%22%3A%20%22%3Cscript%3Ealert('XSS%20no%20more')%20also%20%3C%40!130973321683533824%3E%20can%20I%20use%20you%20in%20my%20example%20%3C%3Auwu%3A586299815017578506%3E%3F%3C%2Fscript%3E%22%0A%20%20%20%20%20%7D%2C%0A%20%20%20%20%20%7B%0A%20%20%20%20%20%20%20%20%20%20%22author_id%22%3A%20%22130973321683533824%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22avatar_hash%22%3A%20%22a_930134c64191da4713c22eb120c939e7%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22hexcolor%22%3A%20%22F47FFF%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22timestamp%22%3A%201594744316220%2C%0A%20%20%20%20%20%20%20%20%20%20%22author_nickname%22%3A%20%22Moomin%20Lachee%20%23AdaptiveCards%22%2C%0A%20%20%20%20%20%20%20%20%20%20%22content%22%3A%20%22Yeah%20that's%20fine%20%F0%9F%98%80%20where's%20%3C%40!515615356052570132%3E%22%0A%20%20%20%20%20%7D%0A%5D%0A)<br>
or you can use discord attachments
```
https://sardonyx.me/discord-bulk-message-viewer?channel=(channel id)&attachment=(attachment id)&name=(url encoded attachment name)
```
[Example](https://sardonyx.me/discord-bulk-message-viewer/?attachment=734092877600391238&channel=723679104875888753&name=example.json)


#### Example JSON Structure
```json
[
     {
          "author_id": "295222772546928641",
          "avatar_hash": "2ba235580297f757f3cd4bf188a94385",
          "hexcolor": "B99CBA",
          "timestamp": 1594744316220,
          "author_nickname": "Sardonyx",
          "content": "Hello World!"
     },
     {
          "author_id": "295222772546928641",
          "avatar_hash": "2ba235580297f757f3cd4bf188a94385",
          "hexcolor": "B99CBA",
          "timestamp": 1594744316220,
          "author_nickname": "Sardonyx",
          "content": "I said hello?"
     }
]
```

#### Discord.js example with collection of messages
```javascript
const arrayofmessages = collectionofmessages.map(m => ({ author_id: m.author.id,avatar_hash: m.author.avatar, hexcolor: m.member.displayHexColor.substr(1), timestamp: m.createdTimestamp, author_nickname: m.member.nickname || m.author.username, content: m.content }))

channel.send('Bulk messages:', new MessageAttachment(Buffer.from(JSON.stringify(arrayofmessages)), 'bulkmsg.json')).then(msg => {
     msg.channel.send(`Preview: https://sardonyx.me/discord-bulk-message-viewer?channel=${msg.channel.id}&attachment=${msg.attachments.first().id}&name=${encodeURIComponent(msg.attachments.first().name)}`)
})
```


#### Credits ig
- Emojis: [Twemoji](https://github.com/twitter/twemoji)
- Time: [Moment.js](https://momentjs.com/)
- Markdown: [Simple-Markdown](https://github.com/Khan/simple-markdown)
