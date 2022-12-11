import style from './style';
import compose from './compose';
function transform(value, userValue) {
  if (userValue === 'grey') {
    return userValue;
  }
  return value;
}
export var color = style({
  prop: 'color',
  themeKey: 'palette',
  transform: transform
});
export var bgcolor = style({
  prop: 'bgcolor',
  cssProperty: 'backgroundColor',
  themeKey: 'palette',
  transform: transform
});
export var backgroundColor = style({
  prop: 'backgroundColor',
  themeKey: 'palette',
  transform: transform
});
var palette = compose(color, bgcolor, backgroundColor);
export default palette;