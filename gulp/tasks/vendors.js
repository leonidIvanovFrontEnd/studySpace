// =========================================================
// Gulp Task: vendors
// =========================================================

let path = require('../settings/path.json'),
	merge = require('merge-stream');

module.exports = (gulp, plugins) => {
    return () => {
	    var fonts =
		    gulp.src(path.src.fonts)
		        .pipe(plugins.newer(path.build.fonts))
		        .pipe(gulp.dest(path.build.fonts));

	    var html =
		    gulp.src(path.src.html)
		        .pipe(plugins.newer(path.build.html))
		        .pipe(gulp.dest(path.build.html));

		return merge( fonts, html ); 
    };
};