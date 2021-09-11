const gulp = require("gulp");
const webpack = require("webpack-stream");
const sass = require("gulp-sass")(require("sass"));
const autoprefixer = require("autoprefixer");
const cleanCSS = require("gulp-clean-css");
const postcss = require("gulp-postcss");
const browsersync = require("browser-sync");
const rename = require("gulp-rename");
const uglify = require("gulp-uglify");

const dist = "./dist";
const example = "./example";

gulp.task("copy-html", () => {
  return gulp
    .src("./src/index.html")
    .pipe(gulp.dest(example))
    .pipe(browsersync.stream());
});

gulp.task("build-js", (done) => {
  gulp
    .src("./src/js/script.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "bundle.js",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: false,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(example + "/js"))
    .pipe(browsersync.stream());

  gulp
    .src("./src/js/modules/slider.js")
    .pipe(
      webpack({
        mode: "development",
        output: {
          filename: "slider.js",
          library: "slider",
        },
        watch: false,
        devtool: "source-map",
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: false,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(example + "/js"))
    .pipe(browsersync.stream());

  done();
});

// gulp.task("copy-js", () => {
//   return gulp.src(example + "/js/bundle.js").pipe(gulp.dest(dist));
// });

gulp.task("build-sass", () => {
  return gulp
    .src("./src/scss/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(gulp.dest(example + "/css"))
    .pipe(browsersync.stream());
});

gulp.task("copy-assets", () => {
  gulp.src("./src/icons/**/*.*").pipe(gulp.dest(example + "/icons"));

  return gulp
    .src("./src/img/**/*.*")
    .pipe(gulp.dest(example + "/img"))
    .pipe(browsersync.stream());
});

gulp.task("watch", () => {
  browsersync.init({
    server: "./example/",
    port: 4000,
    notify: true,
  });

  gulp.watch("./src/index.html", gulp.parallel("copy-html"));
  gulp.watch("./src/icons/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/img/**/*.*", gulp.parallel("copy-assets"));
  gulp.watch("./src/scss/**/*.scss", gulp.parallel("build-sass"));
  gulp.watch("./src/js/**/*.js", gulp.parallel("build-js"));
});

gulp.task("prod", (done) => {
  gulp.src("./src/index.html").pipe(gulp.dest(example));
  gulp.src("./src/img/**/*.*").pipe(gulp.dest(example + "/img"));
  gulp.src("./src/icons/**/*.*").pipe(gulp.dest(example + "/icons"));

  gulp
    .src("./src/js/script.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "bundle.js",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: false,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(example + "/js"));

  gulp
    .src("./src/js/modules/slider.js")
    .pipe(
      webpack({
        mode: "production",
        output: {
          filename: "slider.js",
          library: "slider",
        },
        module: {
          rules: [
            {
              test: /\.m?js$/,
              exclude: /(node_modules|bower_components)/,
              use: {
                loader: "babel-loader",
                options: {
                  presets: [
                    [
                      "@babel/preset-env",
                      {
                        debug: false,
                        corejs: 3,
                        useBuiltIns: "usage",
                      },
                    ],
                  ],
                },
              },
            },
          ],
        },
      })
    )
    .pipe(gulp.dest(example + "/js"))
    .pipe(gulp.dest(dist));

  gulp
    .src("./src/scss/style.scss")
    .pipe(sass().on("error", sass.logError))
    .pipe(postcss([autoprefixer()]))
    .pipe(cleanCSS())
    .pipe(gulp.dest(example + "/css"))
    .pipe(rename("slider.css"))
    .pipe(gulp.dest(dist));

  done();
});

gulp.task(
  "build",
  gulp.parallel("copy-html", "copy-assets", "build-sass", "build-js")
);
gulp.task("default", gulp.parallel("watch", "build"));
