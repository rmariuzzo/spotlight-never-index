<div align=center>
<h1 style="border:0">Spotlight Never Index</h1>
🔦🙅 Exclude some folders from Spotlight.app
</div>

## Installation

```shell
npm install spotlight-never-index --global 
```

## Usage

```shell
spotlight-never-index <directory> <pattern>
```

### Examples

#### Never index a directory

```shell
spotlight-never-index ~/Projects
```

This will tell Spotlight to never index the `~/Projects` directory.

#### Never index matching directory

```shell
spotlight-never-index ~/Projects 'node_modules|bower_components'
```

This will tell Spotlight to never index any `node_modules` **or** `bower_components` directory inside `~/Projects.`

### License

MIT – See [LICENSE](LICENSE) file.
