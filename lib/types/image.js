var mongoose = require('mongoose');

module.exports.loadType = function(mongoose) {
    var SchemaTypes = mongoose.SchemaTypes || mongoose.Schema.Types,
    BaseSchemaType = mongoose.SchemaType;

    /**
   * FileType constructor
   *
   * @inherits SchemaType
   * @param {String} key
   * @param {Object} [options]
*/

    function Image(path, options) {
        this.contentTypeValues = ['image/gif', 'image/jpeg', 'image/png'];
        this.maxSize = -1;
        BaseSchemaType.call(this, path, options, 'Image');
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
    Image.prototype.contentTypes = function() {
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
            if (typeof arguments[i] === 'string' && undefined !== arguments[i] && this.contentTypeValues.indexOf(arguments[i]) > 0) {
                this.contentTypeValues.push(arguments[i]);
            }
        }

        if (!this.contentTypeValidator) {
            var values = this.contentTypeValues;
            this.contentTypeValidator = function(v){
                return undefined === v || ~values.indexOf(v);
            };
            this.validators.push([this.contentTypeValidator, 'contentTypes']);
        }
    };

    /**
   * Expose
*/

    SchemaTypes.Image = Image;
    mongoose.Types.Image = Buffer;
};
