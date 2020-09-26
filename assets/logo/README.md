# Stream\<Java\> Logo

The _Stream\<Java\>_ logo features the beloved Java mascot "Duke". Duke is excitedly pointing out a Stream of Java about to start!

![Stream of Java Logo](streamofjava.svg)

## Technology
`streamofjava.svg` is the SVG source file created with [Inkscape](https://inkscape.org/), an open source vector graphics editor. [Inkscape has CLI support](https://inkscape.org/doc/inkscape-man.html), albeit rudimentary. This allows for basic automated exports of rasterized assets in **CI pipelines**.

Inkscape also works in a Docker container. For reference or testing purposes, a current `latest` build is provided, for example, by Jess Frazelle: https://hub.docker.com/r/jess/inkscape/tags

## SVG Structure
For ease of editing, the SVG is structured into 5 layers:
* White Sticker Border
* Background
* Duke
* TV
* Duke Right Arm

The `Duke Right Arm` layer is separated so it can go in front of the `TV` layer.

Layer visiblity can be toggled in Inkscape's `Layer Dock`, which can be opened with `Ctrl`+`Shift`+`L`. Like this, custom exports - i.e. without the `White Sticker Border` or `Background` - can be made.

## Exporting 
For more information and further examples regarding the CLI usage of Inkscape, refer to https://inkscape.org/doc/inkscape-man.html.

### SVG for web
`streamofjava.svg` contains Inkscape-specific data like labels, effect definitions or document metadata. These are helpful for editing the SVG, but are inappropriate in SVG assets for web. Released SVG assets therefore **should** be exported as plain SVG, even if only to decrease the file size.
#### CLI
To export as a plain SVG, the `--export-plain-svg` flag can be used.

Example:
```bash
# Export the logo as plain SVG
inkscape streamofjava.svg --export-plain-svg --export-filename plain.svg
```

#### GUI
`Plain SVG (*.svg)` is also available as a filetype variant in all save dialogs in Inkscape's GUI.

### Rasterized assets
#### CLI
The filetype is inferred from the filename provided in the `export-filename` flag.

Example:
```bash
# Export the logo as PNG with 256px width (keeps the aspect ratio)
inkscape streamofjava.svg -w 256 --export-filename streamofjava.png
```

#### GUI
`Ctrl`+`Shift`+`E` brings up the `Export PNG Image Dock` which allows configuration of the export, such as exporting only the selected paths.