# Discord Bulk Message Viewer
Just supply a JSON file within the url or supply it directly on the website.

```
https://discord-bulk-message-viewer.sardonyx.me?data=ENCODEDURICOMPONENTHERE
``` [Example](https://sardonyx.me/discord-bulk-message-viewer/?data=%5B%0D%0A%20%20%20%20%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%22author_id%22%3A%20%22295222772546928641%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22avatar_hash%22%3A%20%222ba235580297f757f3cd4bf188a94385%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22hexcolor%22%3A%20%22B99CBA%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22timestamp%22%3A%201594744316220%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22author_nickname%22%3A%20%22Sardonyx%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22content%22%3A%20%22Hello%20World!%22%0D%0A%20%20%20%20%20%7D%2C%0D%0A%20%20%20%20%20%7B%0D%0A%20%20%20%20%20%20%20%20%20%20%22author_id%22%3A%20%22295222772546928641%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22avatar_hash%22%3A%20%222ba235580297f757f3cd4bf188a94385%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22hexcolor%22%3A%20%22B99CBA%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22timestamp%22%3A%201594744316220%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22author_nickname%22%3A%20%22Sardonyx%22%2C%0D%0A%20%20%20%20%20%20%20%20%20%20%22content%22%3A%20%22I%20said%20hello%3F%22%0D%0A%20%20%20%20%20%7D%0D%0A%5D)<br>
or you can use discord attachments
```
https://sardonyx.me/discord-bulk-message-viewer?channel=Channel_ID&attachment=Attachment_ID&name=ATTACHMENT.name
``` Example


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
const arrayofmessages = collectionofmessages.map(m => ({ author_id: m.author.id,avatar_hash: m.author.avatar, hexcolor: m.member.displayHexColor, timestamp: m.createdTimestamp, author_nickame: m.member.nickname || m.author.username, content: m.content }))

channel.send('Bulk messages:', new MessageAttachment(Buffer.from(JSON.stringify(arrayofmessages)), 'bulkmsg.json')).then(msg => {
     msg.channel.send(`Preview: https://sardonyx.me/discord-bulk-message-viewer?channel=${msg.channel.id}&attachment=${msg.attachments.first().id}&name=${encodeURIComponent(msg.attachments.first().name)}`)
})
```
