module.exports = {
    type: "h5-redux",
    api: {
    "swaggerUrl": "http://172.19.8.133:8088/v2/api-docs",
    "dir": "./src/web-api",
    "wrapper":"context",
    "mock": {
      "mockApi": {
      },
      "ignoreApi": {
      }
    },
    "exclude": [
    ]
  },page:{
        schemaPlugins:["moon-ui-schemas"],
    }
}