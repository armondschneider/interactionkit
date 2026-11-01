"use client";

import PasswordInput from "./PasswordInput";

export default function PasswordInputDemo() {
  return <PasswordInput verifyPassword={(password) => password === "oliver"} />;
}
