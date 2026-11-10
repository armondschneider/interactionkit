import { notFound } from "next/navigation";
import DocumentationCodeBlock from "../../../../src/site/code/DocumentationCodeBlock";
import { components, type ComponentSlug } from "../../../../src/site/docs/components";
import ButtonExample from "../../../../src/examples/button/ButtonExample";
import ImageGridModal from "../../../../src/examples/image/ImageGridModal";
import { imageGridImages } from "../../../../src/examples/image/exampleImages";
import SheetExample from "../../../../src/examples/sheet/SheetExample";
import VideoPlayer from "../../../../src/components/video-player/VideoPlayer";
import ImageGalleryExample from "../../../../src/examples/image/ImageGalleryExample";
import ViewTransitionExample from "../../../../src/examples/view-transition/ViewTransitionExample";

export function generateStaticParams() {
  return components.map(({ slug }) => ({ slug }));
}

function Preview({ slug }: { slug: ComponentSlug }) {
  if (slug === "video-player") return <VideoPlayer src="https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4" title="A bee on a flower" />;
  return <div className="flex min-h-[260px] items-center justify-center rounded-xl border border-neutral-200/80 bg-neutral-50/70 p-6 dark:border-neutral-800 dark:bg-neutral-900/40">
    {slug === "button" && <ButtonExample />}
    {slug === "image-viewer" && <ImageGridModal images={imageGridImages} className="!max-w-[250px]" />}
    {slug === "sheet" && <SheetExample />}
    {slug === "view-transition" && <ViewTransitionExample />}
  </div>;
}

export default async function ComponentPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const component = components.find((item) => item.slug === slug);
  if (!component) notFound();
  return <>
    <h1 className="font-medium">{component.name}</h1>
    <p className="mt-2">{component.description}</p>
    {(component.slug === "view-transition" || component.slug === "video-player") && <p className="mt-4 rounded-lg border border-neutral-200 bg-neutral-50 px-4 py-3 text-xs text-neutral-600 dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-400">Available in <code>useintkit@0.0.1</code> and later.</p>}
    <h2 className="mb-4 mt-10 font-medium">{component.slug === "video-player" ? "Direct video" : "Preview"}</h2>
    <Preview slug={component.slug} />
    <h2 className="mb-4 mt-10 font-medium">Usage</h2>
    <DocumentationCodeBlock code={component.code} title={`${component.slug}.tsx`} />
    {component.slug === "image-viewer" && <>
      <h2 className="mb-2 mt-10 font-medium">Image gallery</h2>
      <p className="mb-4 text-neutral-500 dark:text-neutral-400">Show one to four images in a responsive grid. Each image opens in the viewer. ImageGallery is available in <code>useintkit@0.0.1</code> and later.</p>
      <ImageGalleryExample />
      <div className="mt-4"><DocumentationCodeBlock title="image-gallery.tsx" code={'import { ImageGallery } from "useintkit";\n\n<ImageGallery\n  images={[\n    { src: "/images/coast.jpg", alt: "A quiet coastline" },\n    { src: "/images/mountain.jpg", alt: "A mountain view" },\n  ]}\n  style={{ maxWidth: 480, maxHeight: 400 }}\n/>'} /></div>
      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">Set the gallery’s width, height, and maximum dimensions with its style or className. Use <code>--ik-image-max-width</code> and <code>--ik-image-max-height</code> to limit expanded images.</p>
    </>}
    {component.slug === "view-transition" && <>
      <h2 className="mb-2 mt-10 font-medium">Controlled state</h2>
      <p className="mb-4 text-neutral-500 dark:text-neutral-400">Pass <code>open</code> and update it in <code>onOpenChange</code>. The render-prop <code>close</code> requests a state change; the parent remains responsible for applying it.</p>
      <DocumentationCodeBlock title="controlled.tsx" code={'import { useState } from "react";\nimport { ViewTransition } from "useintkit";\n\nfunction Details() {\n  const [open, setOpen] = useState(false);\n  return (\n    <ViewTransition trigger="Details" open={open} onOpenChange={setOpen}>\n      {({ close }) => <button type="button" onClick={close}>Close</button>}\n    </ViewTransition>\n  );\n}'} />
      <h2 className="mb-2 mt-10 font-medium">Appearance</h2>
      <p className="mb-4 text-neutral-500 dark:text-neutral-400">The trigger fits its content by default; choose <code>sm</code>, <code>md</code>, or <code>lg</code> for the open width, or set a custom <code>openWidth</code>. Content scrolls above <code>min(320px, 50vh)</code>. Use the class hooks or CSS variables to customize the surface, including that height limit.</p>
      <DocumentationCodeBlock title="styles.css" code={'.my-transition {\n  --ik-view-transition-radius: 16px;\n  --ik-view-transition-padding: 12px;\n  --ik-view-transition-max-height: 400px;\n  --ik-view-transition-background: #fff;\n  --ik-view-transition-color: #262626;\n  --ik-view-transition-border: rgb(0 0 0 / 10%);\n  --ik-view-transition-divider: rgb(0 0 0 / 6%);\n  --ik-view-transition-shadow: 0 4px 12px rgb(0 0 0 / 8%);\n}\n\n.dark .my-transition {\n  --ik-view-transition-background: #262626;\n  --ik-view-transition-color: #f5f5f5;\n  --ik-view-transition-border: rgb(255 255 255 / 10%);\n  --ik-view-transition-divider: rgb(255 255 255 / 10%);\n  --ik-view-transition-shadow: 0 4px 12px rgb(0 0 0 / 20%);\n}'} />
      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">Apply the class with <code>className="my-transition"</code>. The component stays in document flow, clips overflow, and does not position a popover or handle viewport collisions.</p>
    </>}
    {component.slug === "video-player" && <>
      <h2 className="mb-2 mt-10 font-medium">YouTube</h2>
      <p className="mb-4 text-neutral-500 dark:text-neutral-400">YouTube videos use the embedded player and its native controls.</p>
      <VideoPlayer provider="youtube" src="https://www.youtube.com/watch?v=RRFDgDeboqE" title="YouTube player demonstration" />
      <div className="mt-4"><DocumentationCodeBlock title="youtube.tsx" code={'import { VideoPlayer } from "useintkit";\n\n<VideoPlayer\n  provider="youtube"\n  src="https://www.youtube.com/watch?v=RRFDgDeboqE"\n  title="YouTube player demonstration"\n/>'} /></div>
      <h2 className="mb-2 mt-10 font-medium">YouTube with custom controls</h2>
      <p className="mb-4 text-neutral-500 dark:text-neutral-400">An experimental InteractionKit control bar below the unobscured YouTube player. YouTube branding and player behavior remain visible.</p>
      <VideoPlayer provider="youtube" youtubeControls="custom" src="https://www.youtube.com/watch?v=RRFDgDeboqE" title="YouTube with InteractionKit controls" />
      <div className="mt-4"><DocumentationCodeBlock title="youtube-custom.tsx" code={'import { VideoPlayer } from "useintkit";\n\n<VideoPlayer\n  provider="youtube"\n  youtubeControls="custom"\n  src="https://www.youtube.com/watch?v=RRFDgDeboqE"\n  title="YouTube with InteractionKit controls"\n/>'} /></div>
      <h2 className="mb-2 mt-10 font-medium">Vimeo</h2>
      <p className="mb-4 text-neutral-500 dark:text-neutral-400">Vimeo videos also use their native embedded player.</p>
      <VideoPlayer provider="vimeo" src="https://vimeo.com/863362136" title="Inside Vimeo Staff Picks" />
      <div className="mt-4"><DocumentationCodeBlock title="vimeo.tsx" code={'import { VideoPlayer } from "useintkit";\n\n<VideoPlayer\n  provider="vimeo"\n  src="https://vimeo.com/863362136"\n  title="Inside Vimeo Staff Picks"\n/>'} /></div>
      <h2 className="mb-2 mt-10 font-medium">Vimeo with custom controls</h2>
      <p className="mb-4 text-neutral-500 dark:text-neutral-400">An experimental control bar below Vimeo. Hiding Vimeo controls requires the video owner to have an eligible plan; otherwise both sets of controls may appear.</p>
      <VideoPlayer provider="vimeo" vimeoControls="custom" src="https://vimeo.com/863362136" title="Inside Vimeo Staff Picks with InteractionKit controls" />
      <div className="mt-4"><DocumentationCodeBlock title="vimeo-custom.tsx" code={'import { VideoPlayer } from "useintkit";\n\n<VideoPlayer\n  provider="vimeo"\n  vimeoControls="custom"\n  src="https://vimeo.com/863362136"\n  title="Inside Vimeo Staff Picks with InteractionKit controls"\n/>'} /></div>
      <p className="mt-4 text-xs text-neutral-500 dark:text-neutral-400">Playback depends on the video's embedding permissions and availability.</p>
    </>}
    <h2 className="mb-4 mt-10 font-medium">Props</h2>
    <div className="overflow-x-auto rounded-lg border border-neutral-200/80 dark:border-neutral-800"><table className="w-full min-w-[520px] text-left text-[13px]"><thead className="bg-neutral-50 text-xs text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400"><tr><th className="px-4 py-3 font-medium">Prop</th><th className="px-4 py-3 font-medium">Type</th><th className="px-4 py-3 font-medium">Description</th></tr></thead><tbody>{component.props.map(([name, type, description]) => <tr key={name} className="border-t border-neutral-200/80 align-top dark:border-neutral-800"><td className="px-4 py-3 font-mono text-xs">{name}</td><td className="px-4 py-3 font-mono text-xs text-neutral-500 dark:text-neutral-400">{type}</td><td className="px-4 py-3 text-neutral-600 dark:text-neutral-400">{description}</td></tr>)}</tbody></table></div>
    <p className="mt-6 text-neutral-500 dark:text-neutral-400">{component.note}</p>
  </>;
}
