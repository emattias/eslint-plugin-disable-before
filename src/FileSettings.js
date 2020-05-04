const constants = require('./constants');

function FileSettings(eslintFileConfig) {
  const fileConfig = eslintFileConfig || {};
  const configSettings = fileConfig.settings || {};

  const pluginSettings = {};

  // Extract all plugin settings by cutting the prefix
  Object.keys(configSettings).forEach((fullName) => {
    if (fullName.indexOf(constants.PLUGIN_NAME_SHORT) === 0) {
      pluginSettings[fullName] = configSettings[fullName];
    }
  });

  this.disableBeforeSettings = pluginSettings[constants.PLUGIN_NAME_SHORT];

  // Pass-thru external processor id if any
  // Follow processor naming convention ("pluginName/processorName")
  this.externalProcessor = pluginSettings.externalProcessor || null;
}

module.exports = FileSettings;
