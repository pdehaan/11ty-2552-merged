/**
 * @typedef {import('@11ty/eleventy/src/UserConfig')} EleventyConfig
 * @typedef {ReturnType<import('@11ty/eleventy/src/defaultConfig')>} EleventyReturnValue
 * @type {(eleventyConfig: EleventyConfig) => EleventyReturnValue}
 */
module.exports = function (eleventyConfig) {
  const slugify = eleventyConfig.getFilter("slugify");

  eleventyConfig.addFilter("tagsByCollection", function (coll = []) {
    const tagSet = new Set();
    for (const post of coll) {
      post.data.tags?.forEach(tag => tagSet.add(slugify(tag)));
    }
    return [...tagSet].sort();
  });

  eleventyConfig.addCollection("notes", function (collectionApi) {
    // return collectionApi.getFilteredByGlob("src/posts/*.njk");
    return collectionApi.getFilteredByTag("notes");
  });
  eleventyConfig.addCollection("notesTags", function (collectionApi) {
    const tagsByCollection = eleventyConfig.getFilter("tagsByCollection");
    const notes = this.notes(collectionApi);
    return tagsByCollection(notes);
  });

  // WARNING: This is some weird magic used for dynamic querying of collections.
  // Dragons ahead.
  // See src/tags.njk
  eleventyConfig.addCollection("dynamic", collectionApi => collectionApi);

  eleventyConfig.setQuietMode(true);

  return {
    dir: {
      input: "src",
      output: "www",
    }
  };
};
