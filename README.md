# Interactive-CV

A personal page, where you can show off your resume...in *style*.

#### How to get started

**Quick start**

``` bash
git clone https://github.com/Anarcroth/interactive-cv.git

cd interactive-cv

npm server.js
```

This will create a local server on port `3000`, where you will see a basic setup of your *interactive-cv* ready to be customized. There you can take advantage of the interface from the terminal and can move things around, create files, make notes, etc. When you are happy with what you've got, you can present yourself, by sharing your CV. You can either host your CV, or you can export a presentation variant of it, and upload it as a simple page! All you have to do is type in the emulated terminal:

``` bash
export presentable
```

This will generate some `.html`, `.css`, `.js` files, which will create a static web page for people to enjoy your CV.

*Hint* -  you can make this your `github.io` page!

**How to configure it to your needs**

With this repository you will also get a `.conf` file, which holds a lot of small an interesting features you can use with your project. From simple color and picture calibrations, to how you file structure will look like. You can go through it and check each variable out and customize it however you like.

- Username
- Password
- Prompt
- Background color
- Terminal background color
- Terminal prompt color
- Terminal width
- Terminal height
- Output color
- Output bold color
- Sub-directories

### Structure

The structure of this project tries to emulate some parts of a kernel, which will be then wrapped up by the terminal emulator, and then shown in the browser.

Since a full kernel implementation is not needed currently, only a few components will be implemented as a part of the exercises. In particular, the terminal emulator will have a reach towards a *virtual file system* written in JS.

#### VJS Emulator

The virtual JavaScript Emulator aims at interacting with an underlying implementation of a kernel (or at least part of a kernel), where it can interpret and parse commands and arguments. The interaction between the user and the kernel is done through the standard command line interpreter.

#### JayVFS

The JS Virtual File System is an implementation of a file system, that holds all files in memory and allows only for currently loaded FS to work with files.

When the terminal loads, it creates a `UNIX`-like file-system hierarchy, with a base root - `/`. Then it does two things. First it reads from the `.conf` file, goes to the `sub_directories` variable, and constructs the given strings into the virtual file system as *directories*. Then it goes to the `contents` folder (found in your project) and links all files that are there to their corresponding place in the specified sub-directories from the configurations file. If there are files that have not been specified in the `sub_directories` variable, then they are automatically mapped into the root.
