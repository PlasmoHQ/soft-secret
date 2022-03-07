import { getInput, setFailed, setOutput } from "@actions/core"
import { createWriteStream } from "fs"
import { ensureDir } from "fs-extra"
import got from "got"
import { dirname, resolve } from "path"
import { cwd, env } from "process"

async function run(): Promise<void> {
  try {
    const secretData =
      getInput("input") ||
      getInput("content") ||
      getInput("secret", {
        required: true
      })

    const target = getInput("output") || getInput("target", { required: true })

    const needToFetch = !!(getInput("is-url") || getInput("fetch"))

    const targetPath = resolve(cwd(), target)

    const targetDir = dirname(targetPath)

    if (env.NODE_PROCESS === "test") {
      console.log({
        secretData,
        target,
        needToFetch
      })
    }

    const [content] = await Promise.all([
      needToFetch ? await got(secretData).text() : secretData,
      await ensureDir(targetDir)
    ])

    const fileStream = createWriteStream(targetPath)

    fileStream.write(content)

    fileStream.end()

    setOutput("🍦 Secret served in:", targetPath)
  } catch (error) {
    if (error instanceof Error) setFailed(error.message)
  }
}

run()
