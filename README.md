# InteractionKit

InteractionKit is an experimental collection of polished, copy-ready React interactions. It explores the small details that make an interface feel considered: motion feedback, spatial transitions, focused overlays, and deliberate actions.

The repository is both a living gallery of interaction studies and the source for reusable components. Each demo presents the interaction in context and exposes its implementation for adaptation in other projects.

## Stack

- React 19 and Next.js 15
- Tailwind CSS for styling
- Framer Motion for interaction and animation
- Lucide and Hugeicons for icons
- Static export for deployment to Vercel, GitHub Pages, or another static host

## Project Structure

```text
app/                 Gallery homepage and individual demo routes
src/components/      Reusable interaction components, grouped by category
src/index.ts         Library entry point
```

## Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to explore the live demos and copy component source code.

## Scripts

```bash
npm run dev          # Start the local Next.js development server
npm run build        # Create a production static export
npm run build:lib    # Build the distributable component library
```

## Contributing

Keep additions focused on one clear interaction. Components should be self-contained, responsive, keyboard-accessible where applicable, and respect reduced-motion preferences. Run `npm run build` before opening a pull request.

## License

MIT
