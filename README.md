# Sensory

A lightweight frontend experiment centered on dynamic UI theming with modern CSS. It showcases how a single color input can propagate through an interface by generating multiple shades programmatically.

> ⚠️ This project is mainly intended for experimenting with AWS services (such as S3 static hosting and CloudFront) and understanding deployment workflows.

[Sensory on AWS](http://rhman-sensory-site-001.s3-website-us-east-1.amazonaws.com/)
---

## HTML

- A **9-card grid layout** organized in a 4:1:4 structure:
  - The first 4 cards represent darker variations of the base color, created by mixing it with black at 100%, 75%, 50%, and 25%.
  - The center card displays the **pure base color**.
  - The last 4 cards represent lighter variations, created by mixing the base color with white using the same ratios.

- A simple **form with a single input field** allows the user to enter any valid CSS color value.

---

## CSS

The styling relies on the native CSS function `color-mix()` to derive multiple shades from a single base color.

This function blends two colors within a defined color space (here, `srgb`), eliminating the need for preprocessors like Sass or additional JavaScript logic.

```css
:root {
    --th: red;

    /* Light variations: lightest → darker */
    --l1: color-mix(in srgb, var(--th), white 100%);
    --l2: color-mix(in srgb, var(--th), white 75%);
    --l3: color-mix(in srgb, var(--th), white 50%);
    --l4: color-mix(in srgb, var(--th), white 25%);

    /* Dark variations: darkest → lighter */
    --d1: color-mix(in srgb, var(--th), black 100%);
    --d2: color-mix(in srgb, var(--th), black 75%);
    --d3: color-mix(in srgb, var(--th), black 50%);
    --d4: color-mix(in srgb, var(--th), black 25%);
}
```

## JS

A minimal event-driven function updates the root CSS variable `--th` based on user input.

1. The input value is validated using CSS.supports()
2. If valid, it updates the theme dynamically
3. If invalid, basic visual feedback is applied

*This approach keeps the logic simple while enabling real-time UI updates without dependencies.*
