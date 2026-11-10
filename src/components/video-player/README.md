# VideoPlayer

```tsx
import "useintkit/styles.css";
import { VideoPlayer } from "useintkit";

<VideoPlayer src="/videos/example.mp4" title="A quiet scene" poster="/images/poster.jpg" />
<VideoPlayer provider="youtube" src="https://www.youtube.com/watch?v=dQw4w9WgXcQ" title="Example video" />
<VideoPlayer provider="vimeo" src="https://vimeo.com/123456" title="Example video" />
```

Direct video uses custom play, mute, seek, and fullscreen controls. Provide `captions={{ src, srcLang, label }}` for a default caption track. YouTube and Vimeo use their native embedded controls by default. Set `youtubeControls="custom"` or `vimeoControls="custom"` for an experimental InteractionKit bar below the provider embed. Vimeo's `controls=0` requires the video owner to have an eligible plan; otherwise its controls may remain visible alongside ours. API initialization failures fall back to the native player. Embedding must be allowed by the video owner. For Vimeo unlisted videos requiring a privacy hash, use the provider's own embed instead; this initial implementation supports public numeric URLs only.

The `title` prop is required for accessibility. When no poster is provided for a direct video, the player asks the browser to preload the video so its first frame can be displayed; browser and network policies may prevent preloading. `className` customizes the wrapper, and `--ik-video-radius` controls its corner radius. Direct videos require a browser-supported media format; captions need an appropriate WebVTT file and cross-origin headers when hosted elsewhere.
