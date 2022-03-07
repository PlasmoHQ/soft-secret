import { expect, test } from "@jest/globals"
import { ExecFileSyncOptions, execFileSync } from "child_process"
import { existsSync } from "fs"
import { readFile } from "fs/promises"
import { join, resolve } from "path"
import { cwd, env, execPath } from "process"

const REMOTE_TEST_HASH = "c9eRkBxua9VbAcMJ4piRc69gpRjYjJbvsd56JPvj2J"
const indexScript = join(cwd(), "dist", "index.js")

test("fail if no secret input specified", async () => {
  const options: ExecFileSyncOptions = {
    env: {
      ...env,
      INPUT_TARGET: "__tests__/runner/deep-end/core/key.mjs"
    }
  }

  const t = () => execFileSync(execPath, [indexScript], options)

  expect(t).toThrowError()
})

test("fail if no target specified", async () => {
  const options: ExecFileSyncOptions = {
    env: {
      ...env,
      INPUT_SECRET: `export const secret = "secret"`
    }
  }

  const t = () => execFileSync(execPath, [indexScript], options)

  expect(t).toThrowError()
})

test("can write plain input", async () => {
  const secret = `export const secret = "secret"`
  const target = "__tests__/runner/deep-end/core/key.mjs"
  const options: ExecFileSyncOptions = {
    env: {
      ...env,
      INPUT_SECRET: secret,
      INPUT_TARGET: target
    }
  }

  expect(
    execFileSync(execPath, [indexScript], options).toString()
  ).toMatchSnapshot()

  const targetPath = resolve(cwd(), target)

  expect(existsSync(targetPath)).toBeTruthy()

  const fileContent = await readFile(targetPath, "utf8")

  expect(fileContent).toMatch(secret)
})

test("can fetch input", async () => {
  const secret = `https://github.com/plasmo-corp/soft-secret/releases/download/test/key.json`
  const target = "__tests__/runner/second-test/deep/path/key.json"
  const options: ExecFileSyncOptions = {
    env: {
      ...env,
      INPUT_INPUT: secret,
      INPUT_OUTPUT: target,
      INPUT_FETCH: "true"
    }
  }

  expect(
    execFileSync(execPath, [indexScript], options).toString()
  ).toMatchSnapshot()

  const targetPath = resolve(cwd(), target)

  expect(existsSync(targetPath)).toBeTruthy()

  const fileJson = JSON.parse(await readFile(targetPath, "utf8"))

  expect(fileJson.hash).toMatch(REMOTE_TEST_HASH)
})
