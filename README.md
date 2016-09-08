##Chrome extension to show checklists data on top of tickets in Trello

This simple extension uses Trello API to get checklists data from each ticket and display first unchecked item from each checklist for each ticket on top of the it. It will also display ALL items from the checklist named "Pending"

These sources require 'key.js' file to be placed in the root folder with the next contents:
```javascript
var APP_KEY = '<your trello developer API key>';
```

Thanks to [ChromeSkel_a](https://github.com/sitepoint/ChromeSkel_a) for providing a Chrome Skeleton.
