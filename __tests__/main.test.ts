import { expect, test } from "@jest/globals"
import { ExecFileSyncOptions, execFileSync } from "child_process"
import { existsSync } from "fs"
import { readFile } from "fs/promises"
import { join, resolve } from "path"
import { cwd, env, execPath } from "process"

const REMOTE_TEST_HASH = "c9eRkBxua9VbAcMJ4piRc69gpRjYjJbvsd56JPvj2J"
const indexScript = join(cwd(), "dist", "index.js")

test("can write plain input", async () => {
  const content = (env["INPUT_SECRET"] = `export const secret = "secret"`)
  const target = (env["INPUT_TARGET"] =
    "__tests__/runner/deep-end/core/key.test.ts")

  const options: ExecFileSyncOptions = {
    env: process.env
  }

  expect(
    execFileSync(execPath, [indexScript], options).toString()
  ).toMatchSnapshot()

  const targetPath = resolve(cwd(), target)

  expect(existsSync(targetPath)).toBeTruthy()

  const fileContent = await readFile(targetPath, "utf8")

  expect(fileContent).toMatch(content)
})

test("can fetch input", async () => {
  env[
    "INPUT_INPUT"
  ] = `https://github.com/plasmo-corp/soft-secret/releases/download/test/key.json`
  const target = (env["INPUT_OUTPUT"] =
    "__tests__/runner/second-test/deep/path/key.json")

  env["INPUT_FETCH"] = "true"

  const options: ExecFileSyncOptions = {
    env: process.env
  }

  expect(
    execFileSync(execPath, [indexScript], options).toString()
  ).toMatchSnapshot()

  const targetPath = resolve(cwd(), target)

  expect(existsSync(targetPath)).toBeTruthy()

  const fileJson = JSON.parse(await readFile(targetPath, "utf8"))

  expect(fileJson.hash).toMatch(REMOTE_TEST_HASH)
})
