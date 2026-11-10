import { render, screen, waitFor } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import packageInfo from "../../lib-package.json";
import PublishedVersion from "./PublishedVersion";

afterEach(() => vi.unstubAllGlobals());

describe("published package version", () => {
  it("shows the registry version rather than the local manifest version", async () => {
    const fetchMock = vi.fn().mockResolvedValue({ ok: true, json: async () => ({ name: packageInfo.name, version: "1.2.3" }) });
    vi.stubGlobal("fetch", fetchMock);
    render(<PublishedVersion />);
    const link = await screen.findByRole("link", { name: `${packageInfo.name} 1.2.3 on npm` });
    expect(link).toHaveTextContent("1.2.3");
    expect(link).toHaveAttribute("href", `https://www.npmjs.com/package/${packageInfo.name}`);
    expect(fetchMock).toHaveBeenCalledWith(`https://registry.npmjs.org/${encodeURIComponent(packageInfo.name)}/latest`, expect.objectContaining({ signal: expect.any(AbortSignal) }));
  });

  it("keeps a usable npm link if the registry is unavailable", async () => {
    vi.stubGlobal("fetch", vi.fn().mockRejectedValue(new Error("offline")));
    render(<PublishedVersion />);
    await waitFor(() => expect(screen.getByRole("link", { name: `${packageInfo.name} on npm` })).toHaveTextContent("npm"));
  });

  it("does not display an invalid registry response", async () => {
    vi.stubGlobal("fetch", vi.fn().mockResolvedValue({ ok: true, json: async () => ({ name: packageInfo.name, version: "not-a-version" }) }));
    render(<PublishedVersion />);
    await waitFor(() => expect(screen.getByRole("link", { name: `${packageInfo.name} on npm` })).toHaveTextContent("npm"));
  });
});
