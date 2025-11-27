// index.web.js
import { AppRegistry } from 'react-native';
import App from './App';
import { name as appName } from './app.json';

// Generate style font icon untuk web (Opsional, jika pakai react-native-vector-icons)
import iconFont from 'react-native-vector-icons/Fonts/Feather.ttf';

const iconFontStyles = `@font-face {
  src: url(${iconFont});
  font-family: Feather;
}`;

// Inject style ke head
const style = document.createElement('style');
style.type = 'text/css';
if (style.styleSheet) {
  style.styleSheet.cssText = iconFontStyles;
} else {
  style.appendChild(document.createTextNode(iconFontStyles));
}
document.head.appendChild(style);

AppRegistry.registerComponent(appName, () => App);

AppRegistry.runApplication(appName, {
  initialProps: {},
  rootTag: document.getElementById('root'),
});