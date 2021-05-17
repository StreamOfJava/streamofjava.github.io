const Ajv = require("ajv")
const fs = require("fs")

try {
	const schema = JSON.parse(fs.readFileSync("./streams/stream.definition.schema.json", "utf8"))
	const validate = new Ajv().compile(schema)

	const files = fs
		.readdirSync("./streams")
		.filter(fileName => !fileName.endsWith("schema.json"))
		.map(fileName => ({ name: fileName, path: `./streams/${fileName}` }))
		.map(file => ({ ...file, content: JSON.parse(fs.readFileSync(file.path)) }))
		.map(file => {
			validate(file.content)
			return { ...file, errors: validate.errors }
		})

	files
		.map(file =>
			file.errors
				? `🟥 ${file.name}:\n${JSON.stringify(file.errors, null, "\t")}`
				: `✅ ${file.name}`
		)
		.forEach(report => console.log(report))

	const errorCount = files
		.filter(file => file.errors)
		.map(file => file.errors.length)
		.reduce((sum, current) => sum + current, 0)
	process.exit(errorCount)
} catch (error) {
	console.error(error)
	process.exit(1)
}
