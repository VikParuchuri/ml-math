# Math for ML

This shows a skill tree visualization to help you learn the math you need for ML.

## Contributing Content

The content is in 3 json files in `src/lib/assets`:

- `topics.json` contains the individual nodes in the graph
- `relations.json` contains the edges
- `resources.json` is a list of resources pertaining to the topics

Feel free to add new topics.  If you add a new topic, also ensure you add the relevant relations and resources.  Make sure you preserve all of the fields from other topics/relations/resources.

Once you commit your changes, the main site will be rebuilt with the new content.  Open a pull request to get a preview site to test your changes (or test locally following the instructions below).

## Developing

Clone the project, and run  `npm install`.  Then start a dev server:

```bash
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

## Building

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
