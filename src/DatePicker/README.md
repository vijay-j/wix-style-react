# DatePicker component

> A DatePicker component

## Testkit
When testing DatePicker you might see some errors with unknown functions, to fix it - 
```javascript
import datePickerPolyfills from 'wix-style-react/dist/src/DatePicker/Polyfills';
```

Before the tests and after each jsdom cleanup -
```javascript
datePickerPolyfills(window, global);
```
 
## Properties

| propName | propType | defaultValue | isRequired | description |
|----------|----------|--------------|------------|-------------|
| value | moment object | - | - | The selected date |
| onChange | func | - | + | Called upon every value change |
| dateFormat | string | MM/DD/YYYY | - | Custom date format |
| filterDate | func | () => true | - | Only the truthy dates are selectable |
| excludePastDates | bool | false | - | Past dates are unselectable |
| readOnly | bool | false | - | Is the input field readOnly |
| disabled | bool | false | - | Is the DatePicker disabled |
| showYearDropdown | bool | false | - | Display a selectable yearDropdown |
| rtl | bool | false | - | RTL mode |
| theme | string | normal | - | Theme of the Input |
| placeholderText | string | '' | - | placeholder of the Input |
| prefix | node | default DatePicker icon | - | Icon for the DatePicker's Input |
| inputDataHook | string | '' | - | dataHook for the DatePicker's Input |
| customInput | node | Input | - | Can provide Input with your custom props |
| shouldCloseOnSelect | bool | true | - | should the calendar close on day selection |

## Keyboard support

Left: Move to the previous day.
Right: Move to the next day.
Up: Move to the previous week.
Down: Move to the next week.
PgUp: Move to the previous month.
PgDn: Move to the next month.
Home: Move to the previous year.
End: Move to the next year.
Enter/Esc/Tab: close the calendar. (Enter & Esc calls preventDefault)
