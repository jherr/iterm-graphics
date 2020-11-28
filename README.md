Sixel Experiments
=================

Some fun experiments using the [Sixel graphics](https://en.wikipedia.org/wiki/Sixel) standards.

# Installation

First install the `imgcat` command in `/usr/local/bin`.

```sh
% sudo cp imgcat /usr/local/bin
```

# Examples

All of the examples follow the same pattern, to install and run them follow these steps:

```sh
% yarn
% yarn build
% yarn --silent start
```

The `--silent` option simply removes the start and ending yarn logs about running the command and telling you how long it took to run.

The examples are listed below:

| Name | Description |
|------|-------------|
| react-to-iterm | A very simple example using React |
| react-to-iterm-reactvis | A graphing example using React and react-vis |
| react-to-iterm-recharts | A graphing example using React and recharts |
| slack-status | An example of getting content from a web page and displaying it |
| thought-bubbles | Is a simple static HTML display |
