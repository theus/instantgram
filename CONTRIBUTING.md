# Contributing

Hi! I'm happy in see you here. Let's go?

## How Can I Contribute?

### Reporting Bugs or Errors

If you find an error in [instantgram] or Github launchs new versions of Instagram Web that crashes [instantgram], please report [opening an issue][1].

### Testing Changes

The bookmarklet has no runtime dependencies. Before opening a pull request, run:

```sh
npm run build
npm test
```

`npm run build` synchronizes `bookmarklet.js` with every published install page and the Safari copy-and-paste version. Commit the generated changes with the source change.

[1]:https://github.com/theus/instantgram/issues/new
