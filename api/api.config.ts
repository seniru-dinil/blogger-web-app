export const API_BASE_URL = "http://localhost:4004";

export const URL = {
  ARTICLE: {
    CREATE_ARTICLE: "/api/articles",
    GET_ARTICLES: "/api/articles",
    GET_ARTICLE: "/api/articles",
    DELETE_ARTICLE: "/api/articles",
    UPDATE_ARTICLE: "/api/articles",
    LIKE_ARTICLE: "/api/articles",
    COMMENT_ARTICLE: "/api/articles",
    PUBLISH_ARTICLE: "/api/articles",
    UNPUBLISH_ARTICLE: "/api/articles",
    REPORT_ARTICLE: "/api/articles",
  },
  ARTICLE_DATA: {
    CREATE_ARTICLE_DATA: "/api/article-data",
    UPDATE_ARTICLE_DATA: "/api/article-data",
    DELETE_ARTICLE_DATA: "/api/article-data",
    GET_ARTICLE_DATA: "/api/article-data",
  },
  USERS: {
    CREATE_USER: "/api/users",
    DELETE_USER: "/api/users",
    LOGIN: "/api/users/login",
    GET_USER: "/api/users",
    BECOME_PUBLISHER: "/api/users",
  },
};
