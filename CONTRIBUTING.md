# Contributing

Hi! I'm happy in see you here. Let's go?

## How Can I Contribute?

### Reporting Bugs or Errors

If you find an error in [instantgram] or Github launchs new versions of Instagram Web that crashes [instantgram], please report [opening an issue][1].

### Pull Request

Bugs and errors in section above could fixed by a pull request. PR are welcome! If you have a enhacement or can fix a bug, please make a PR. [Open an issue][1] before PR for a discuss.

Steps
- fork [instantgram] repo
- clone in your PC
- make a new branch for your feature `git checkout -b feature_branch` 
- `npm install` for install all dependencies (you must have node instaled)
- all source files are in `src/` folder and [instantgram] has 2 commands. `gulp` for compile and watch files and `gulp build` for build before commit
- bump version in `package.json` following [SemVer](http://semver.org) guidelines
- commit
- make a PR

### Translation

After v2.3.0, [instantgram] has a localization system. For translating the app you must:

- open `src/localization.js`, add new lang and translate the strings
- follow [pull request](#pull-request) steps

for translate website:

- copy `src/_langs/src/index_en.html` to new lang eg. `index_de.html` and translate strings at head of file.
- after that, edit `src/_langs/langs.json` with informations about the idiom, following the present models.
- follow [pull request](#pull-request) steps

That's all! Thanks =)

[1]:https://github.com/thinkbig-company/instantgram/issues/new
