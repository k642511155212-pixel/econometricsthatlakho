# Build Notes — Econometrics Mastery v4.0

This is a static, dependency-free website. There is no compile or bundling step.

## Design decisions

- The Econometrics curriculum, source hierarchy, question bank and original study tools remain authoritative.
- ESP3 contributes the connected Module/Review spaces, focused recall modes, mixed assessment, warmer visual system, mascot reactions and Donate surface.
- Formula reliability takes priority over decorative layout. The v4 renderer maps all 28 formula names to semantic native MathML and keeps raw notation only inside an optional copy panel.
- All required raster/vector artwork is directly embedded in JavaScript as `data:` URLs.
- Written work is never assigned a misleading automatic semantic score. Model guidance and explicit rubrics support honest partial marking.

## Release command

```bash
node --check app.js
node --check embedded-assets.js
node qa.js
node qa-v4.js
```

All four commands must pass before packaging.
