# Notification component

> A dropping down notification.

## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| show | boolean | false | - | Show or hide the notification triggered by user |
| theme | string (standard, error, success, warning, premium) | standard | - | The theme color of the notification |
| type | string (global, local, sticky) | global | - | global pushes the content while local is above it and fades after timeout. sticky fixes the content at the top of the screen |
| timeout | number | 6000 | - | time in msec for local notification to disappear (will be ignored in global notification) |
| zIndex | number | - | - | z-index property |
| onClose | func | - | - | callback when the notification is close, will pass a 'reason' var that can one of 'hide-by-close-click' or 'hide-by-timer' |  

## Notification.TextLabel (required)
> Use this component to display the notification message

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| children | string | - | - | The text to display |

## Notification.ActionButton (optional)
> Use this component to supply an action button for the notification

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| children | string | - | - | The text to display |
| type | string (button, textLink) | - | button | A Button component or TextLink component |
| onClick | function | - | e => e.preventDefault() | - |
| link | string | - | - | A url to navigate to on click |

## Notification.CloseButton (required)
> Use this component to display the close button

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| none | - | - | - | - |
