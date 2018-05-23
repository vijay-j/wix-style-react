# Label Migration Guide

## <Label>
The API for the `Label` typography has changed.
We no longer have an `appearance` prop. Instead, we have a `size` prop.

`size`: font size (`small` or `medium`). Defaults to `medium`.

### Appearances updates
`<Label appearance="T1.1">` --> `<Label>` (size defaults to `"medium"`)
`<Label appearance="T3.1">` --> `<Label size="small">`

### Testkit Deprecated methods:
- `getClassList` is deprecated.
- `getTagName` is deprecated.
- `click` is deprecated.
- `getAssociatedInput` is deprecated.
- `getAttr` is deprecated.
- `setProps` is deprecated.

We no longer support the Label puppeteer testkit
