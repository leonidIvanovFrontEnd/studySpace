// init
var gulp = require("gulp"),
	plugins = require("gulp-load-plugins")(),
	path = require("./gulp/settings/path.json"),
	browserSync = require("browser-sync").create();

// function to get tasks from gulp/tasks
let getTask = (task) => {
	return require("./gulp/tasks/" + task)(gulp, plugins, browserSync);
};

// task list
gulp.task("clean", getTask("clean"));
gulp.task("sass", getTask("sass"));
gulp.task("svgSpriteBuild", getTask("svgSpriteBuild"));
gulp.task("imageCompress", getTask("imageCompress"));
gulp.task("js", getTask("js"));
gulp.task("vendors", getTask("vendors"));

gulp.task("browserSync", (cb) => {
	browserSync.init(
		{
			server: "dist",
			notify: false,
		},
		cb
	);

	gulp.watch(path.watch.css, gulp.series("sass"));
	gulp.watch(path.watch.js, gulp.series("js"));
	gulp.watch(path.watch.img, gulp.series("imageCompress"));
	gulp.watch(path.watch.svg, gulp.series("svgSpriteBuild"));
	gulp.watch(path.watch.html, gulp.series("vendors"));
	gulp.watch(path.watch.fonts, gulp.series("vendors"));
});

gulp.task(
	"watch",
	gulp.series(
		"clean",
		gulp.parallel(
			"sass",
			"js",
			"svgSpriteBuild",
			"imageCompress",
			"vendors"
		),
		"browserSync"
	)
);

gulp.task(
	"build",
	gulp.series(
		"clean",
		gulp.parallel(
			"sass",
			"js",
			"svgSpriteBuild",
			"imageCompress",
			"vendors"
		),
	)
);



gulp.task("default", gulp.series("watch"));
