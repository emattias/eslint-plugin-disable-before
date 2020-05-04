# eslint-plugin-disable-before

> Disable ESLint rules based on when when the line was changed (according to git)

## Install

```bash
npm install eslint-plugin-disable-before --save-dev
```

### or
```bash
yarn add eslint-plugin-disable-before --dev
```

## Use

Add plugin to a config file (.eslintrc) and make it default processor:

```json
{
  "plugins": ["disable-before"],
  "processor": "disable-before",
  "settings": {
    "disable-before": {
      "import/no-anonymous-default-export": {
        "disableOnChangesBefore": "2020-05-01",
      },
    },
  },
}
```
Then the rule `import/no-anonymous-default-export` will be disabled for all lines where that lines commits date is before `2020-05-01`.

## Origin

This is forked from and heavily based on [eslint-plugin-disable](https://github.com/mradionov/eslint-plugin-disable)
