# mirador-annotations-extend-plugin

[![Travis][build-badge]][build]
[![npm package][npm-badge]][npm]
[![Coveralls][coveralls-badge]][coveralls]

`mirador-annotations-extend-plugin` is a [Mirador 3](https://github.com/projectmirador/mirador) plugin that adds annotation creation tools to the user interface. Users can create rectangle, oval, and freehand annotations, add text descriptors or tags and add an author to the annotation. The `mirador-annotations-extend-plugin` is based on the plugin [`mirador-annotations`](https://github.com/ProjectMirador/mirador-annotations/) and provides an improved annotation panel to the user. It blocks editing multiple annotations for better usablity.

A [live demo](https://mirador-annotations.netlify.app/) that stores annotations in local storage is available for testing. See the [issue queue](https://github.com/ProjectMirador/mirador-annotations/issues) for design proposals for additional functionality.

![annotation creation panel](https://user-images.githubusercontent.com/5402927/86628717-23c3ae80-bf7f-11ea-8f0b-389c39eb4398.png)

## Persisting Annotations
Persisting annotations requires implementing an a IIIF annotation server. Several [examples of annotation servers](https://github.com/IIIF/awesome-iiif#annotation-servers) are available on iiif-awesome.

`mirador-annotations-extend-plugin` currently supports adapters for [Heidelberger annotation server](https://github.com/ProjectMirador/mirador-annotations/blob/master/src/AnnototAdapter.js) and [local storage](https://github.com/ProjectMirador/mirador-annotations/blob/master/src/LocalStorageAdapter.js).

## Installing `mirador-annotations-extend-plugin`
`mirador-annotations-extend-plugin` requires an instance of Mirador 3. See the [Mirador wiki](https://github.com/ProjectMirador/mirador/wiki) for examples of embedding Mirador within an application. See the [demo's index.js](https://github.com/ProjectMirador/mirador-annotations/blob/master/demo/src/index.js) for an example of importing the `mirador-annotations-extend-plugin` plugin and configuring the adapter.

## Contribute
`mirador-annotations-extend-plugin` is developed in .... add more text here

[build-badge]: https://img.shields.io/travis/user/repo/master.png?style=flat-square
[build]: https://travis-ci.org/user/repo

[npm-badge]: https://img.shields.io/npm/v/npm-package.png?style=flat-square
[npm]: https://www.npmjs.org/package/npm-package

[coveralls-badge]: https://img.shields.io/coveralls/user/repo/master.png?style=flat-square
[coveralls]: https://coveralls.io/github/user/repo
