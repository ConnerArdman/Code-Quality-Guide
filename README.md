# CSE 154 Code Quality Guide

## Customizing and Deploying This Guide

  1. Clone the Repo.
  1. Install Ruby and Jekyll if you haven't already.
    * `gem install bundler jekyll` after installing Ruby.
  1. Run `jekyll build`. This will create a new directory `_site` with a deployable site. Never directly edit this directory.
    * An example of this is available on the `gh-pages` branch and live [here](https://connerardman.github.io/Code-Quality-Guide/).
    * It might be best to add this directory to a gitignore or to use a "deployment" branch such as `gh-pages`.
  1. Update the baseurl in `_config.yml` and `_config_dev.yml`.
  1. Make any desired changes to the files.
    * Templates for the site (the `header`, `footer` and `head`) are in the `_includes` directory.
    * Pages are laid out according to `_layouts/default`.
    * Add markdown or HTML pages to `_pages`. Each page will become a new tab in the navbar (although they could be excluded by editing the logic in `_includes/header`).
    * `assets` contains images for the site.
    * `scripts` contains scripts for the site, currently only holding the navbar toggle scripts.
    * `style` contains stylesheets for the site. Add any new stylesheets to `_layouts/head`.
  1. Rerun `jekyll build` to update the `_site` directory.
