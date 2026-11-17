// chore: Punto de entrada de la aplicación para Expo Go y builds nativos
import { registerRootComponent } from 'expo';
import App from './App';

// registerRootComponent llama a AppRegistry.registerComponent('main', () => App);
// Asegura que el entorno esté configurado correctamente tanto en Expo Go como nativo
registerRootComponent(App);
