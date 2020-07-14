# Discord Bulk Message Viewer
Just supply a JSON file within the url or supply it directly on the website.

```
https://discord-bulk-message-viewer.sardonyx.me?data=ENCODEDURICOMPONENTHERE
```

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

console.log('Results are here: https://discord-bulk-message-viewer.sardonyx.me?data=' + encodeURIComponent(JSON.stringify(arrayofmessages)))
```