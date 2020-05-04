const { execSync } = require("child_process");

function Processor(cache, settingsGetter, externalProcessorGetter) {
  externalProcessorGetter =
    externalProcessorGetter ||
    function() {
      return null;
    };

  function postprocess(messages, filePath) {
    const settings = settingsGetter(filePath);
    const externalProcessor = externalProcessorGetter(settings);

    const out = messages[0].filter(({line, endLine, ruleId}) => {
      if(settings.disableBeforeSettings && (ruleId in settings.disableBeforeSettings)) {
        const date = settings.disableBeforeSettings[ruleId].disableOnChangesBefore

        if(date) {
          let fileIsTracked = true
          try {
            execSync(`git ls-files --error-unmatch "${filePath}"`, {stdio: 'pipe'}).toString('utf8')
          }
          catch(e) {
            fileIsTracked = false
          }

          if(fileIsTracked) {
            const gitBlameForRange = execSync(`git blame -L "${line},${endLine}" --since="${date}" "${filePath}"`).toString('utf8')
            const linesHaveChangesAfterDate = (gitBlameForRange
              .split('\n')
              .map((line) => line.split(' ')[0])
              .filter((val) => val && val.substring(0,1) !== '^') || []
            ).length > 0

            return !!linesHaveChangesAfterDate
          }
        }
      }

      return true
    })

    if (externalProcessor === null) {
      return out;
    }

    return externalProcessor.postprocess([out]);
  }

  return {
    postprocess,
  };
}

module.exports = Processor;
