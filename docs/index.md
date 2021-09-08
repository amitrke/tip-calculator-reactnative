# Tip Calculator

This app has been developed using Expo and ReactNative

<a href='https://play.google.com/store/apps/details?id=com.subnext.tipcalcbillsplit&pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1'><img width=200 alt='Get it on Google Play' src='https://play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png'/></a>
<a href="https://apps.apple.com/us/app/easy-tip-and-split-calculator/id1576452022"><img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-preferred.png"></a>

## Lessons Learned

### Expo cloud editor
Expo makes developing, building and deploying React Native Apps easy.

Expo also has this [online editor](https://snack.expo.dev/) using which I was able to learn the basics without having to setup the local environment.

### Expo build system
Expo has build [pipeline service](https://expo.dev/) that can be used to build Android and IOS builds.

### Version update for Expo in Github Actions pipeline
Once I started using Github Actions with Expo build pipelines, updating versions quickly became a problem.
I would often forget to update the version number for either Android or IOS and after waiting for builds to be ready and deploying them to respective app stores, I would find that the version is same as the one that I deployed last time.
[Standard Version](https://github.com/conventional-changelog/standard-version) solves this issue

```
- run: npm install
- run: ./node_modules/.bin/standard-version --release-as minor
- run: expo build:android --no-wait
- run: expo build:ios --no-wait
```
### Deploy to Android and IOS App Store
TODO

### VSCode Remote Deploy
TODO

### Native Base

### Dark Mode compatibility