MMweb
=====


Installation
------------

To build MMweb on your local machine, you need to install rvm, ruby-2.2.3,
nodejs, npm and bower. Below are the steps to install these dependencies in
different systems.

### MacOSX

```bash
curl -sSL https://get.rvm.io | bash -s stable
rvm install ruby-2.2.3
brew install node npm
npm install bower

cd MMweb
bundle
bower install
npm install
```

Development
-----------

Once you installed all dependencies, you are good to develop and build this
repository. Use command middleman to control the development server and your
build.

To start a development server on http://127.0.0.1:4567:

```bash
middleman server
```

To build a release:

```bash
middleman build
```