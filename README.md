## Build a small react app to display the sample data

![the design specification](https://cdn.glitch.com/0aa455c6-4c4c-4eb3-b0d5-c5d109598f8f%2FScreen%20Shot%202019-08-28%20at%203.11.02%20PM.png?v=1567019486745)

![an example with some items selected](https://cdn.glitch.com/0aa455c6-4c4c-4eb3-b0d5-c5d109598f8f%2FScreen%20Shot%202019-08-28%20at%204.24.48%20PM.png?v=1567023961410)

Above is a screenshot of a search page in our CMS. We're asking you to implement this results list in React.
The file `app/data/results.js` exports an array of 100 objects representing the simplified result data for you to render.

In the screenshot above you'll see a header row that includes:

- a checkbox which can select/deselect all of the search results
- a button which should mark selected search results as 'hidden' when clicked and which should be visible only when there's at least one selection
- two icons to switch between a list vs grid layout
- the total number of results
- pagination buttons

In the screenshot, the results are shown in the list layout where each result is shown in a row that includes:

- a checkbox to select the search result
- a thumbnail image
- display data, including a title, published status, content type, channel information, and last modified date

In the grid layout, the results would be shown as a grid of cards.

Note that in the data there are objects of different content types, denoted by their `collection` property. We will want to display data differently depending on the content type.
For example, for the title we should use the `hed` property for articles and galleries, but use the `name` property for contributors. The exported data doesn't include a path
to the thumbnail image, so you can use a placeholder image for now. Additionally, you can assume that all objects in the exported data have the published status of `Published`.

For pagination, you can use a page size of 10 results. When items are marked as 'hidden', those items should still be visible but be given some different visual treatment
indicating that they are hidden.

We're looking for first-and-foremost a functioning rendition of the provided mock. Some style classes are available for you to use in `app.css`,
but don't worry too much about getting the styles perfect.
