##Chrome extension to show checklist on top of tickets

This simple extension uses Trello API to get data about checklists in each ticket and display first unchecked item from each checklist for each ticket on top of the ticket. It will also display ALL items from the checklist named "Pending"

This sources require 'key.js' file to be put in the root folder with the next contents:
var APP_KEY = '<your trello developer API key>';

Thanks to [ChromeSkel_a](https://github.com/sitepoint/ChromeSkel_a) for providing a Chrome Skeleton.
