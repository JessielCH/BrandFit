// chore: Configuración de babel para compilación y compatibilidad con Expo
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
  };
};
