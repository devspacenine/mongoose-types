var mongoose = require('mongoose');

module.exports.loadType = function(mongoose) {
    var SchemaTypes = mongoose.SchemaTypes || mongoose.Schema.Types;

    /**
   * FileType constructor
   *
   * @inherits SchemaType
   * @param {String} key
   * @param {Object} [options]
*/

    function Image(path, options) {
        this.contentTypes = ['image/gif', 'image/jpeg', 'image/png'];
        this.maxSize = -1;
        SchemaTypes.Buffer.call(this, path, options, 'Image');
    };

    /*!
    * inherits
*/

    Image.prototype.__proto__ = SchemaTypes.Buffer.prototype;

    /**
     * Adds content type values and a coinciding validator.
     *
     * @param {String} [args...] contentType values
     * @api public
*/
    Image.prototype.content_types = function() {
        var len = arguments.length;
        if (!len || undefined === arguments[0] || false === arguments[0]) {
            if (this.contentTypeValidator){
                this.contentTypeValidator = false;
                this.validators = this.validators.filter(function(v){
                    return v[1] != 'contentTypes';
                });
            }
            return;
        }

        for (var i = 0; i < len; i++) {
            if (typeof arguments[i] === 'string' && undefined !== arguments[i] && this.contentTypes.indexOf(arguments[i]) > 0) {
                this.contentTypes.push(arguments[i]);
            }
        }

        if (!this.contentTypeValidator) {
            var values = this.contentTypes;
            this.contentTypeValidator = function(v){
                return undefined === v || ~values.indexOf(v);
            };
            this.validators.push([this.contentTypeValidator, 'Invalid image file']);
        }
    };

    /**
   * Expose
*/

    SchemaTypes.Image = Image;
    mongoose.Types.Image = Buffer;
};
