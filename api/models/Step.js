/**
 * Step.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */
var Promise = require('q');

module.exports = {

    attributes: {

        url: {
            type: 'string',
            required: true
        },

        order: {
            type: 'integer',
            required: true
        },

        path: {
            model: 'Path'
        }
    },

    parseEmbedCode: function(code) {
        console.log('parsing', code);
        var cheerio = require('cheerio');
        var $ = null;
        try {
            $ = cheerio.load(code);
        } catch (e) {
            console.log("error", e);
        }
        var url = $('iframe').attr('src');

        if (url.indexOf('youtube') !== -1) {
            return Step.parseYouTube(url);
        }

        if (url.indexOf('vimeo') !== -1) {
            return Step.parseVimeo(url);
        }

        return null;
    },

    parseYouTube: function(url) {
        // thumbnail structure : http://img.youtube.com/vi/bQVoAWSP7k4/0.jpg
        var urlParts = url.split("/");
        var youTubeId = urlParts[urlParts.length - 1];
        return 'http://img.youtube.com/vi/' + youTubeId + '/0.jpg';
    },

    parseVimeo: function(url) {
        // Notes : http://stackoverflow.com/questions/1361149/get-img-thumbnails-from-vimeo

        // get video id

        // GET http://vimeo.com/api/v2/video/video_id.json


        return "";
    },

    afterUpdate: function(step, cb) {
        console.log("afterUpdate", step);
        Step.generateThunbnail(step, cb);
    },

    afterCreate: function(step, cb) {
        Step.generateThunbnail(step, cb);
    },

    generateThunbnail: function(step, cb) {
        console.log("generating thumbnail");
        // Let's generate a thumbnail for this path
        // if this is step 1
        if (step.order == 1) {
            var thumbnail = null;
            console.log("this is step one");
            // If this step has a thumbnail, lets use that
            if (step.iurl) {
                thumbnail = step.iurl;
            } else {

                // So there's not lower hanging fruit.
                // Let's get smart
                if (step.type == 'Embed code') {
                    thumbnail = Step.parseEmbedCode(step.url);

                } else {

                    // If this is not an embed code and we have a url
                    // we can generate a screenshot.
                    var request = require("request");
                    var fullUrl =
                        "https://enliten-resizer.herokuapp.com/query?&url=" +
                        step.url;
                    var datauri = "";

                    request({
                        uri: fullUrl,
                        encoding: null
                    }, function(error, response, body) {
                        if (!error && response.statusCode ==
                            200) {

                            var data_uri_prefix = "data:" +
                                response.headers["content-type"] +
                                ";base64,";
                            //data:image/png;base64,
                            //console.log('body', body);
                            var buf = new Buffer(body, 'binary');
                            var image = buf.toString('base64');

                            image = data_uri_prefix + image;

                            Path.update({
                                id: step.path
                            }, {
                                thumbnail: image
                            }).exec(function(err, path) {
                                if (err) console.log(
                                    "Failed to generate thumbnail for path " +
                                    step.path);

                                cb();
                            });

                        }
                    });

                }
            }

            // we have to have a thumbnail by now, so lets update the Path
            Path.update({
                id: step.path
            }, {
                thumbnail: thumbnail
            }).exec(function(err, path) {
                if (err) console.log(
                    "Failed to generate thumbnail for path " +
                    step.path);

                cb();
            });

        } else {
            cb();
        }


    },

    deleteS3Image: function(step){

        var AWS = require('aws-sdk'); 
        var s3 = new AWS.S3({endpoint:"https://s3-us-west-2.amazonaws.com"});
        

        if(step.iurl) {

            var urlParts = step.iurl.split('/');
            var key = urlParts[urlParts.length-1];
            console.log("delete", key);
            if(urlParts.length > 0 ) {

                var options = {
                    Bucket: process.env.S3_BUCKET_NAME,
                    Key: urlParts[urlParts.length-1] 
                };
                console.log('s3 options', options);

                // stream the file to amazon
                s3.deleteObject(options, function(err, data) {
                    if (err) console.log("err", err);

                    return Promise(undefined);
                });

            } else {
                return Promise(undefined);
            }

        } else {
            return Promise(undefined);
        }

    },

    afterDestroy: function(destroyedRecords, cb) {

        if(destroyedRecords) {
            console.log("destroyedRecords", destroyedRecords);
            // fix holes in the order after deletion
            Promise.spread(destroyedRecords, function(step) {
                console.log("fix this", step.path);
                return [destroyedRecords, Path.cleanUpOrder(step.path)];   
            })
            // clean up s3 images
            .spread(function(destroyedRecords) {
                return Promise.spread(destroyedRecords, function(step) {
                    return [destroyedRecords, Step.deleteS3Image(step)];   
                })
            })
            .catch(function(err){
                console.log(err);
            })
            .done(function(){
                cb();
            }); 
            
        } else {
            cb();
        }

    }
};
