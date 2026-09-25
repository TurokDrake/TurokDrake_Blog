let posts = [];
const postsPerPage = 5;
const searchInput = document.querySelector("#post-search");
const postList = document.querySelector("#post-list");
const postSummary = document.querySelector("#post-summary");
const pageNumbers = document.querySelector("#page-numbers");
const previousPage = document.querySelector("#previous-page");
const nextPage = document.querySelector("#next-page");

let currentPage = 1;

function getFilteredPosts() {
  const keyword = searchInput.value.trim().toLowerCase();

  if (!keyword) {
    return posts;
  }

  return posts.filter((post) => {
    const searchableText = [post.title, post.date, ...post.tags]
      .join(" ")
      .toLowerCase();
    return searchableText.includes(keyword);
  });
}

function renderPosts() {
  const filteredPosts = getFilteredPosts();
  const totalPages = Math.max(1, Math.ceil(filteredPosts.length / postsPerPage));
  currentPage = Math.min(currentPage, totalPages);
  const firstPost = (currentPage - 1) * postsPerPage;
  const visiblePosts = filteredPosts.slice(firstPost, firstPost + postsPerPage);

  postList.replaceChildren();
  if (visiblePosts.length === 0) {
    const emptyState = document.createElement("p");
    emptyState.className = "empty-state";
    emptyState.textContent = "没有找到相关文章";
    postList.append(emptyState);
  } else {
    visiblePosts.forEach((post) => {
      const link = document.createElement("a");
      link.className = "post-item";
      link.href = post.url;
      link.target = "_blank";
      link.rel = "noopener";

      const title = document.createElement("span");
      title.className = "post-title";
      title.textContent = post.title;

      const meta = document.createElement("span");
      meta.className = "post-meta";
      meta.textContent = `${post.date} · ${post.tags.join(" / ")}`;

      link.append(title, meta);
      postList.append(link);
    });
  }

  postSummary.textContent = `共 ${filteredPosts.length} 篇文章${searchInput.value.trim() ? "（已筛选）" : ""}`;
  renderPagination(totalPages);
}

function renderPagination(totalPages) {
  pageNumbers.replaceChildren();
  for (let page = 1; page <= totalPages; page += 1) {
    const button = document.createElement("button");
    button.className = "page-number";
    button.type = "button";
    button.textContent = page;
    button.setAttribute("aria-label", `第 ${page} 页`);
    if (page === currentPage) {
      button.classList.add("active");
      button.setAttribute("aria-current", "page");
    }
    button.addEventListener("click", () => {
      currentPage = page;
      renderPosts();
    });
    pageNumbers.append(button);
  }

  previousPage.disabled = currentPage === 1;
  nextPage.disabled = currentPage === totalPages;
}

function renderLoadError() {
  postSummary.textContent = "";
  postList.replaceChildren();
  const errorState = document.createElement("p");
  errorState.className = "empty-state";
  errorState.textContent = "文章数据加载失败，请稍后重试";
  postList.append(errorState);
  pageNumbers.replaceChildren();
  previousPage.disabled = true;
  nextPage.disabled = true;
}

searchInput.addEventListener("input", () => {
  currentPage = 1;
  renderPosts();
});

previousPage.addEventListener("click", () => {
  if (currentPage > 1) {
    currentPage -= 1;
    renderPosts();
  }
});

nextPage.addEventListener("click", () => {
  const totalPages = Math.ceil(getFilteredPosts().length / postsPerPage);
  if (currentPage < totalPages) {
    currentPage += 1;
    renderPosts();
  }
});

fetch("data/posts.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`文章数据请求失败：${response.status}`);
    }
    return response.json();
  })
  .then((postData) => {
    posts = postData;
    renderPosts();
  })
  .catch((error) => {
    console.error(error);
    renderLoadError();
  });
