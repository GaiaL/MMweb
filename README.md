MMweb
=====

[![Travis CI](https://travis-ci.org/CSUEBMMG/MMweb.svg)](https://travis-ci.org/CSUEBMMG/MMweb)

GH page: http://csuebmmg.github.io/MMweb/

Installation
------------

To build MMweb on your local machine, you need to install rvm, ruby-2.2.3,
bundle, nodejs, npm and bower. Below are the steps to install these
dependencies in different systems.

### MacOSX

```bash
curl -sSL https://get.rvm.io | bash -s stable
rvm install ruby-2.2.3
brew install node npm
npm install bower -g

cd MMweb
gem install bundle
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

To add a new article:
```bash
middleman article TITLE
```

The result will show the path to the page source so you can edit it.


Automatically Build with Travis CI
----------------------------------

This repository contains a `.travis.yml` to run `middleman build` and push the
generated results (HTML, image, CSS and JavaScript files) to `gh-pages` branch.

You may want to [fork][fork-a-repo] this repository for further developing and
testing. You can also run the build for your forked repository with few
modification.

Assume you have already set up your Travis CI account and have your forked
project enabled (See [instruction][travis-get-started]. What we need
to do now, is adding a new "[deploy key][deploy-key]" to your forked
repository. Assume the main page URL of your forked repository is
https://github.com/example/MMweb, in which the name of your repository is
"example/MMweb". Change all "example" below to whatever is shown in your URL.

Open a console, clone the forked repository and `cd` into the `.travis`
folder:

```bash
git clone git@github.com:example/MMweb.git
cd MMweb/.travis
```

Run `ssh-keygen` to generate a new authentication key pair:

```bash
ssh-keygen -f example.pem -N ''
```

Now follow the [instruction][deploy-key] to add the deploy key. Please check
the "Allow write access" option:

```bash
cat example.pem.pub
# copy the public key and paste it to the repository settings
```

You may need to follow the [instruction][travis-encrypt-file] to install the
Travis CI Command Line Client before you doing this. Now use client to encrypt
`example.pem` file:

```bash
travis login  # follow the instruction to log in with Github account
travis encrypt-file -r example/MMweb example.pem
```

You'll see a line from the output looks like this:

```bash
...
openssl aes-256-cbc -K $encrypted_1234567890ab_key -iv $encrypted_1234567890ab_iv -in example.pem.enc -out example.pem -d
...
```

What you need to do now is to copy the hex part from this line. For example, in
the above demo the hex part is "1234567890ab".

Now open to edit the `.travis.yml` file:

```bash
cd ..
vim .travis.yml  # vim, nano, or any text editor. suit yourself
```

There's an `env` section in the file. Add this line after the "REPO_ID_xxxx"
defines:

```yaml
...
env:
  - |-
    ...
    REPO_ID_CSUEBMMG="22eeb8333793"
    REPO_ID_philiptzou="3a03254beac3"
    REPO_ID_example="1234567890ab"
    ...
...
```

Save `.travis.yml` file. Then commit and push the changes you just did:

```bash
git add -- .travis.yml .travis/
git commit
git push
```

Now you have finished configuration of automatically building. You can see
the result at [https://travis-ci.org/example/MMweb](#).

[fork-a-repo]: https://help.github.com/articles/fork-a-repo/
[travis-get-started]: https://docs.travis-ci.com/user/getting-started/
[deploy-key]: https://developer.github.com/guides/managing-deploy-keys/
[travis-encrypt-file]: https://docs.travis-ci.com/user/encrypting-files/
