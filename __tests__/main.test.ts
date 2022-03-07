import { expect, test } from "@jest/globals"
import { ExecFileSyncOptions, execFileSync } from "child_process"
import { join } from "path"
import { cwd, env, execPath } from "process"

import { wait } from "../src/wait"

test("throws invalid number", async () => {
  const input = parseInt("foo", 10)
  await expect(wait(input)).rejects.toThrow("milliseconds not a number")
})

test("wait 500 ms", async () => {
  const start = new Date()
  await wait(500)
  const end = new Date()
  const delta = Math.abs(end.getTime() - start.getTime())
  expect(delta).toBeGreaterThan(450)
})

// shows how the runner will run a javascript action with env / stdout protocol
test("test runs", () => {
  const ip = join(cwd(), "dist", "index.js")
  env["NODE_ENV"] = "test"
  env["INPUT_MILLISECONDS"] = "500"

  const options: ExecFileSyncOptions = {
    env: process.env
  }

  console.log(execFileSync(execPath, [ip], options).toString())
})
