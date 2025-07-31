import * as fs from "fs"

class Documentation {
  private jsonDocument: any
  private textDocument: string

  constructor(jsonDocument: any) {
    this.jsonDocument = jsonDocument
    this.textDocument = ""
  }

  saveToFile(fileName: string, content: string) {
    fs.writeFileSync(fileName, content)
  }

  createTable(columns: string[], rows: string[], data: any[]) {
    let table = `| ${columns.join(" | ")} |\n`
    table += `| ${columns.map(() => "---").join(" | ")} |\n`

    data.forEach((item) => {
      const row = rows.map((row) => {
        const keys = row.split(".")
        let value = item

        keys.forEach((key) => {
          value = value[key]
        })

        return value
      })
      table += `| ${row.join(" | ")} |\n`
    })

    return `${table}\n`
  }

  generateTextDocumentation() {
    const swagger = this.jsonDocument
    let documentation = `## ${swagger.info.title} Documentation\n`
    documentation += `*Automatically Generated at: ${new Date()}*\n\n`

    const paths = Object.keys(swagger?.paths)

    paths
      .filter((item) => item !== "/health")
      .forEach((path) => {
        const methods = swagger.paths[path]
        const keysMethod = Object.keys(methods)

        keysMethod.forEach((method) => {
          const details = methods[method]
          documentation += `### [${method.toUpperCase()}] ${path}\n`

          // Parameters
          if (details.parameters) {
            documentation += `**Parameters:**\n\n`

            documentation += this.createTable(
              ["where", "name", "description", "type", "required"],
              ["in", "name", "description", "schema.type", "required"],
              details.parameters,
            )
          }

          // Responses
          documentation += `**Responses:**\n\n`
          Object.keys(details.responses).forEach((status) => {
            documentation += `${status}: ${details.responses[status].description}\n\n`

            if (details.responses[status].content) {
              const ref =
                details.responses[status].content["application/json"].schema[
                  "$ref"
                ]

              if (ref) {
                // Schema
                const schema = swagger.components.schemas[ref.split("/")[3]]

                Object.keys(schema.properties).forEach((prop) => {
                  documentation += `${prop}: ${schema.properties[prop].description}\n\n`

                  console.log(schema.properties[prop])

                  const properties = schema.properties[prop].properties

                  if (properties) {
                    const data = Object.keys(properties).map((property) => {
                      return {
                        name: property,
                        type: properties[property].type,
                      }
                    })

                    documentation += this.createTable(
                      ["name", "type"],
                      ["name", "type"],
                      data,
                    )
                  }

                  const items = schema?.properties[prop]?.items
                  if (items) {
                    if (items.properties) {
                      const data = Object.keys(items.properties).map((item) => {
                        return {
                          name: item,
                          type: items.properties[item].type,
                        }
                      })

                      documentation += this.createTable(
                        ["name", "type"],
                        ["name", "type"],
                        data,
                      )
                    }
                  }
                })
              }
            }
          })

          documentation += "\n"
        })
      })

    this.textDocument = documentation
  }

  buildTextDocumentation() {
    this.generateTextDocumentation()
    this.saveToFile("./src/core/docs/documentation.md", this.textDocument)
  }
}

export default Documentation
