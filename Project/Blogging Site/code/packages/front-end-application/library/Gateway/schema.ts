// AUTO-GENERATED from GatewayJSON. Do not edit.
export const schema = {
  /**
   * @url /test
   */
  "test": {
    "_URL": "/test",
    "_METHOD": {
      "POST": {},
    },
  },
  "admin": {
    /**
     * @url /admin/blog
     */
    "blog": {
      "_URL": "/admin/blog",
      "_METHOD": {
        "POST": {
          "HEADER": {
            /**
             * FE to pass Bearer token
             */
            "authorization": {
              "_PRIMITIVE": "string",
              "description": "FE to pass Bearer token",
            },
          },
        },
      },
      /**
       * @url /admin/blog/:id
       */
      ":id": {
        "_URL": "/admin/blog/:id",
        "_METHOD": {
          "POST": {
            "PAYLOAD": {
              "message": {
                "_PRIMITIVE": "string",
              },
            },
            "RESPONSE": {
              "message": {
                "_PRIMITIVE": "string",
              },
            },
            "PARAM": {
              "id": {
                "_PRIMITIVE": "string",
              },
            },
            "QUERY": {
              "offset": {
                "_PRIMITIVE": "number",
              },
              "limit": {
                "_PRIMITIVE": "number",
              },
              "sort": {
                "_PRIMITIVE": "string",
              },
            },
            "HEADER": {
              /**
               * FE to pass Bearer token
               */
              "authorization": {
                "_PRIMITIVE": "string",
                "description": "FE to pass Bearer token",
              },
            },
          },
        },
      },
    },
    /**
     * @url /admin/user
     */
    "user": {
      "_URL": "/admin/user",
      "_METHOD": {
        "GET": {
          "HEADER": {
            /**
             * FE to pass Bearer token
             */
            "authorization": {
              "_PRIMITIVE": "string",
              "description": "FE to pass Bearer token",
            },
          },
        },
        "POST": {
          "HEADER": {
            /**
             * FE to pass Bearer token
             */
            "authorization": {
              "_PRIMITIVE": "string",
              "description": "FE to pass Bearer token",
            },
          },
        },
      },
    },
  },
  /**
   * @url /blog
   */
  "blog": {
    "_URL": "/blog",
    "_METHOD": {
      /**
       * Create a new blog without any permission
       */
      "POST": {
        "PAYLOAD": {
          /**
           * Content for blog
           */
          "content": {
            "_PRIMITIVE": "string",
            "description": "Content for blog",
          },
          /**
           * Title of the blog
           */
          "title": {
            "_PRIMITIVE": "string",
            "description": "Title of the blog",
          },
        },
        "description": "Create a new blog without any permission",
      },
    },
  },
} as const;
