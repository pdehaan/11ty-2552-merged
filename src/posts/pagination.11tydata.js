module.exports = (d) => {
  return {
    pagination: {
      data: "posts",
      size: 1,
      alias: "post",
      addAllPagesToCollections: true,
    },
    permalink: "posts/{{ post.title | slugify }}/",
    eleventyComputed: {
      tags(data) {
        // This merges tags via front matter and dynamically set.
        return []
          .concat(...(data.tags || []), ...(data.post.tags || []))
          .map((tag) => this.slugify(tag));
      },
      title(data) {
        return data.post.title;
      },
      date(data) {
        if (data.post?.date) {
          data.page.date = new Date(data.post.date);
          return data.post.date;
        }
      },
    },
  };
};
