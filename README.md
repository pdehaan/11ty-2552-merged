# 11ty Merged Collections

This repo merges some mock "dynamically" fetched content via [src/_data/posts.json](src/_data/posts.json), and merges it with some posts in the src/posts/*.njk directory and puts them all into a single `collections.notes` collection.

See the objectively boring src/posts/pagination.njk script, as well as it's front matter in the src/posts/pagination.11tydata.js template data file (since it uses some JavaScript for `eleventyComputed` values, and I prefer it to JavaScript front matter to shim the properties from the JSON data file into computed Eleventy properties).

Also note the src/posts/posts.11tydata.json directory data file, which sets a default `layout` and `tags` for each post in the ./src/posts/* directory.

Finally, there is a src/posts/tags.njk file which paginates over the `collections.notesTags` collection (see .eleventy.js) and creates tag archive pages for the posts that are in the "notes" collection.

Most interesting is the questionable use of collection hacking in .eleventy.js:

```js
eleventyConfig.addCollection("dynamic", collectionApi => collectionApi);
```

When using Nunjucks syntax, this lets us do scary things like this gem in src/posts/tags.njk:

```njk
{# This weird live querying of collections only seems to work w/ Nunjucks syntax. #}
{%- set posts = collections.dynamic.getFilteredByTags("notes", tag) -%}
```

Is it a good idea? Probably not.  
Did it work during my 3 minutes of testing? Sure.  
Was it easier than re-building collections for every dynamically set tag? Ab-so-lutely.  
Was it a good idea? Probably not.  
